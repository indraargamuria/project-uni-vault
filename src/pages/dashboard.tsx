
import { html } from 'hono/html'

export const Dashboard = (props: {
    user: any,
    files: any[],
    pendingUsers?: any[]
}) => {
    const isAdmin = props.user.role === 'admin';

    return html`
    <div class="space-y-8">
      <!-- Header -->
      <div class="flex items-center justify-between space-y-2">
        <div>
          <h2 class="text-3xl font-bold tracking-tight">The Vault</h2>
          <p class="text-muted-foreground">Manage your university documents.</p>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-sm font-medium mr-4">Logged in as ${props.user.name} (${props.user.role})</span>
          <button onclick="fetch('/api/auth/sign-out', { method: 'POST' }).then(() => window.location.href = '/login')" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
             Sign Out
          </button>
        </div>
      </div>

      <!-- Admin Section -->
      ${isAdmin ? html`
        <div class="rounded-xl border bg-card text-card-foreground shadow">
          <div class="flex flex-col space-y-1.5 p-6">
            <h3 class="font-semibold leading-none tracking-tight">Admin Approval Queue</h3>
            <p class="text-sm text-muted-foreground">Pending student registrations.</p>
          </div>
          <div class="p-6 pt-0">
            ${props.pendingUsers && props.pendingUsers.length > 0 ? html`
              <div class="relative w-full overflow-auto">
                <table class="w-full caption-bottom text-sm">
                  <thead class="[&_tr]:border-b">
                    <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-[100px]">ID</th>
                      <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Email</th>
                      <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Name</th>
                      <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody class="[&_tr:last-child]:border-0">
                    ${props.pendingUsers.map(u => html`
                      <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td class="p-2 align-middle font-medium">${u.id.substring(0, 8)}...</td>
                        <td class="p-2 align-middle">${u.email}</td>
                        <td class="p-2 align-middle">${u.name}</td>
                        <td class="p-2 align-middle text-right">
                          <button onclick="approveUser('${u.email}')" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 px-3">
                            Approve
                          </button>
                        </td>
                      </tr>
                    `)}
                  </tbody>
                </table>
              </div>
            ` : html`<div class="text-sm text-muted-foreground py-4">No pending users found.</div>`}
          </div>
        </div>
      ` : ''}

      <!-- File List -->
      <div class="rounded-xl border bg-card text-card-foreground shadow">
        <div class="flex flex-col space-y-1.5 p-6">
          <h3 class="font-semibold leading-none tracking-tight">Files</h3>
          <p class="text-sm text-muted-foreground">Access your learning materials.</p>
        </div>
        <div class="p-6 pt-0">
          ${props.files && props.files.length > 0 ? html`
            <div class="relative w-full overflow-auto">
              <table class="w-full caption-bottom text-sm">
                <thead class="[&_tr]:border-b">
                  <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Name</th>
                    <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Category</th>
                    <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Type</th>
                    <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Size</th>
                    <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 text-right">Download</th>
                  </tr>
                </thead>
                <tbody class="[&_tr:last-child]:border-0">
                  ${props.files.map(f => html`
                    <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td class="p-2 align-middle font-medium">${f.name}</td>
                      <td class="p-2 align-middle"><span class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">${f.category || 'General'}</span></td>
                      <td class="p-2 align-middle text-muted-foreground">${f.type}</td>
                      <td class="p-2 align-middle text-muted-foreground">${(f.size / 1024).toFixed(1)} KB</td>
                      <td class="p-2 align-middle text-right">
                        <a href="/api/files/download/${f.id}" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                        </a>
                      </td>
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>
          ` : html`
            <div class="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-10 w-10 mb-4 opacity-50"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" x2="12" y1="18" y2="12"/><line x1="9" x2="15" y1="15" y2="15"/></svg>
               <p>No files in the vault.</p>
            </div>
          `}
        </div>
      </div>
    </div>

    <script>
      async function approveUser(email) {
        if (!confirm('Approve ' + email + '?')) return;
        
        try {
            // Note: In a real app we wouldn't expose the ADMIN_SECRET here or rely on it client-side.
            // However, the current backend implementation requires X-Admin-Secret header.
            // As this is an MVP using client-side fetch in current architecture:
            // Ideally backend session should authorize this, not a header secret for a "logged in admin".
            // **Correction**: Milestone 7 refactored backend to check header. 
            // BUT a logged in admin (session) should just be able to post.
            // Since we can't easily inject the secret here without leaking it,
            // we should likely update the backend to allow session-based approval OR prompt for secret.
            // For this UI MVP, I will prompt for it or assume session authorization is enough (if backend supports it).
            // Let's prompt for the secret as a fallback to ensure it works with existing backend logic.
            
            const secret = prompt('Please enter the Admin Secret to confirm:');
            if (!secret) return;

            const res = await fetch('/admin/approve', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'X-Admin-Secret': secret
                },
                body: JSON.stringify({ email })
            });
            
            if (res.ok) {
                alert('User approved!');
                window.location.reload();
            } else {
                alert('Failed to approve');
            }
        } catch (e) {
            console.error(e);
            alert('Error approving user');
        }
      }
    </script>
  `
}
