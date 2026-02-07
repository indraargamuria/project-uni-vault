
import { Hono } from 'hono'
import { getAuth } from './lib/auth'
import { drizzle } from 'drizzle-orm/d1'
import { user, files, activityLogs } from './db/schema'
import { html } from 'hono/html'
import { eq, sql, gte, and, desc } from 'drizzle-orm'
import { renderer } from './renderer'
import { Login } from './pages/login'
import { Register } from './pages/register'
import { Dashboard } from './pages/dashboard'

type Bindings = {
  uni_vault_db: D1Database
  BUCKET: R2Bucket
  ADMIN_SECRET: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', renderer)

app.on(['POST', 'GET'], '/api/auth/*', (c) => {
  return getAuth(c.env).handler(c.req.raw)
})

app.use('/api/*', async (c, next) => {
  const auth = getAuth(c.env)
  const session = await auth.api.getSession({
    headers: c.req.raw.headers
  })

  if (!session) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  // Allow 'pending' users for dashboard to show locked state, but block specific API actions if needed.
  // The logic below originally blocked everything. We want dashboard access for pending users.
  // We will keep API routes protected but relax this global middleware or handle specific routes.
  // For now, let's allow GET requests to proceed so dashboard renders, but block sensitive mutations.

  if (session.user.status !== 'approved' && c.req.method !== 'GET' && !c.req.path.startsWith('/api/auth')) {
    return c.json({ message: 'Forbidden: Account not approved' }, 403)
  }

  await next()
})

app.post('/admin/approve', async (c) => {
  const adminSecret = c.env.ADMIN_SECRET

  if (!adminSecret) {
    return c.json({ message: 'Server Configuration Error: ADMIN_SECRET not set' }, 500)
  }

  const secret = c.req.header('x-admin-secret')
  if (secret !== adminSecret) {
    return c.json({ message: 'Unauthorized Admin' }, 401)
  }

  const { email } = await c.req.json()
  if (!email) {
    return c.json({ message: 'Email required' }, 400)
  }

  const db = drizzle(c.env.uni_vault_db)
  const result = await db.update(user)
    .set({ status: 'approved' })
    .where(eq(user.email, email))
    .returning()
    .get()

  if (!result) return c.json({ message: 'User not found' }, 404)

  return c.json({ message: 'User approved', user: result })
})

app.get('/', (c) => {
  return c.render(html`
    <div class="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <h1 class="text-4xl font-bold tracking-tighter sm:text-5xl">Uni-Vault</h1>
      <p class="text-muted-foreground text-xl">Secure University Document Storage</p>
      <div class="flex gap-4">
        <a href="/login" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">Login</a>
      </div>
    </div>
  `)
})

app.get('/login', async (c) => {
  const auth = getAuth(c.env)
  const session = await auth.api.getSession({
    headers: c.req.raw.headers
  })

  const isLoggedOut = c.req.query('loggedOut') === 'true'

  if (session && !isLoggedOut) {
    return c.redirect('/dashboard')
  }
  return c.render(Login(), { title: 'Login' })
})

app.get('/register', async (c) => {
  const auth = getAuth(c.env)
  const session = await auth.api.getSession({
    headers: c.req.raw.headers
  })

  const isLoggedOut = c.req.query('loggedOut') === 'true'

  if (session && !isLoggedOut) {
    return c.redirect('/dashboard')
  }
  return c.render(Register(), { title: 'Register' })
})

app.get('/dashboard', async (c) => {
  const auth = getAuth(c.env)
  const session = await auth.api.getSession({
    headers: c.req.raw.headers
  })

  if (!session) {
    return c.redirect('/login')
  }

  const db = drizzle(c.env.uni_vault_db)

  const isApproved = session.user.status === 'approved'

  // Dashboard Stats
  const totalFilesRes = await db.select({ count: sql<number>`count(*)` }).from(files).get()
  const totalFiles = totalFilesRes?.count || 0

  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const vaultGrowthRes = await db.select({ count: sql<number>`count(*)` }).from(activityLogs)
    .where(and(eq(activityLogs.action, 'upload'), gte(activityLogs.createdAt, sevenDaysAgo))).get()
  const vaultGrowth = vaultGrowthRes?.count || 0

  const userActivityRes = await db.select({ count: sql<number>`count(*)` }).from(activityLogs)
    .where(eq(activityLogs.userId, session.user.id)).get()
  const userActivity = userActivityRes?.count || 0

  // Sidebar Data (Categories & Subjects)
  // D1 might not support distinct on multiple columns easily, so we fetch standard list and process in JS for MVP
  // Ideally: SELECT DISTINCT category, subject FROM files
  const allFilesMetadata = await db.select({ category: files.category, subject: files.subject }).from(files).all()

  const navigation = allFilesMetadata.reduce((acc: any, curr) => {
    const cat = curr.category || 'General'
    const sub = curr.subject || 'Misc'
    if (!acc[cat]) acc[cat] = new Set()
    acc[cat].add(sub)
    return acc
  }, {})

  // Convert Sets to Arrays for passing to view
  for (const key in navigation) {
    navigation[key] = Array.from(navigation[key])
  }

  // Fetch files (Only if approved)
  let allFiles: any[] = []
  if (isApproved) {
    allFiles = await db.select().from(files).orderBy(desc(files.createdAt)).all()
  }

  // Fetch pending users if admin
  let pendingUsers: any[] = []
  if (session.user.role === 'admin') {
    pendingUsers = await db.select().from(user).where(eq(user.status, 'pending')).all()
  }

  // Activity Feed
  const activityFeed = await db.select({
    id: activityLogs.id,
    action: activityLogs.action,
    fileName: activityLogs.fileName,
    createdAt: activityLogs.createdAt,
    userName: user.name
  })
    .from(activityLogs)
    .leftJoin(user, eq(activityLogs.userId, user.id))
    .orderBy(desc(activityLogs.createdAt))
    .limit(10)
    .all()

  return c.render(Dashboard({
    user: session.user,
    files: allFiles,
    pendingUsers: pendingUsers,
    stats: {
      totalFiles,
      vaultGrowth,
      userActivity
    },
    navigation,
    isApproved,
    activityFeed
  }), { title: 'Dashboard' })
})

app.get('/api/protected', (c) => {
  return c.json({ message: 'You are approved!' })
})

app.post('/api/files/upload', async (c) => {
  const auth = getAuth(c.env)
  const session = await auth.api.getSession({
    headers: c.req.raw.headers
  })

  if (!session) return c.json({ message: 'Unauthorized' }, 401) // Middleware covers this but for types

  const formData = await c.req.parseBody()
  const file = formData['file']
  const category = formData['category'] as string || 'General'
  const subject = formData['subject'] as string || null

  if (!file || !(file instanceof File)) {
    return c.json({ message: 'No file uploaded or invalid file' }, 400)
  }

  const fileId = crypto.randomUUID()
  const key = `${session.user.id}/${fileId}-${file.name}`;

  // Upload to R2
  await c.env.BUCKET.put(key, file)

  // Save metadata to D1
  const db = drizzle(c.env.uni_vault_db)
  const newFile = await db.insert(files).values({
    id: fileId,
    name: file.name,
    key: key,
    size: file.size,
    type: file.type,
    category: category,
    subject: subject,
    uploadedBy: session.user.name,
    userId: session.user.id,
    createdAt: new Date()
  }).returning().get()

  // Log activity
  await db.insert(activityLogs).values({
    id: crypto.randomUUID(),
    userId: session.user.id,
    action: 'upload',
    fileName: file.name,
    createdAt: new Date()
  })

  return c.json({ message: 'File uploaded successfully', file: newFile })
})

app.get('/api/files', async (c) => {
  const auth = getAuth(c.env)
  const session = await auth.api.getSession({
    headers: c.req.raw.headers
  })
  if (!session) return c.json({ message: 'Unauthorized' }, 401)

  const db = drizzle(c.env.uni_vault_db)
  const category = c.req.query('category')

  let query = db.select().from(files)

  // Apply filtering if category is provided
  // Note: standard drizzle-orm with SQLite might need specific handling, 
  // but straight .where() with condition works.
  let result;
  if (category) {
    result = await db.select().from(files).where(eq(files.category, category)).all()
  } else {
    result = await db.select().from(files).all()
  }

  return c.json({ files: result })
})

app.get('/api/files/download/:fileId', async (c) => {
  const auth = getAuth(c.env)
  const session = await auth.api.getSession({
    headers: c.req.raw.headers
  })
  if (!session) return c.json({ message: 'Unauthorized' }, 401)

  const fileId = c.req.param('fileId')
  const db = drizzle(c.env.uni_vault_db)

  const fileRecord = await db.select().from(files).where(eq(files.id, fileId)).get()

  if (!fileRecord) {
    return c.json({ message: 'File record not found' }, 404)
  }

  // Log activity
  await db.insert(activityLogs).values({
    id: crypto.randomUUID(),
    userId: session.user.id,
    action: 'download',
    fileName: fileRecord.name,
    createdAt: new Date()
  })

  const object = await c.env.BUCKET.get(fileRecord.key)

  if (!object) {
    return c.json({ message: 'File content not found in storage' }, 404)
  }

  const headers = new Headers()
  headers.set('etag', object.httpEtag)
  if (object.httpMetadata?.contentType) headers.set('content-type', object.httpMetadata.contentType)
  headers.set('content-disposition', `attachment; filename="${fileRecord.name}"`)

  return new Response(object.body, {
    headers
  })
})

app.get('/api/admin/check', async (c) => {
  const auth = getAuth(c.env)
  const session = await auth.api.getSession({
    headers: c.req.raw.headers
  })

  if (session?.user.role !== 'admin') {
    return c.json({ message: 'Unauthorized: Admins only' }, 403)
  }

  return c.json({ message: 'Hello Admin Arga' })
})

app.post('/dev/promote-admin', async (c) => {
  // Simple safety check: only allow on localhost or if a specific header is present
  // In a real app, use c.env.ENVIRONMENT check
  const host = c.req.header('host')
  if (!host?.includes('localhost') && !host?.includes('127.0.0.1')) {
    return c.json({ message: 'Dev only' }, 403)
  }

  const db = drizzle(c.env.uni_vault_db)
  const targetEmail = 'indraargaaa@gmail.com'

  const result = await db.update(user)
    .set({ role: 'admin', status: 'approved' })
    .where(eq(user.email, targetEmail))
    .returning()
    .get()

  if (!result) {
    return c.json({ message: `User ${targetEmail} not found.Register first!` }, 404)
  }

  return c.json({ message: 'Admin promoted successfully', user: result })
})

export default app
