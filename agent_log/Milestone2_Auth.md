
# Milestone 2: Auth Implementation Log

## 1. Drizzle Schema
The following schema was defined in `src/db/schema.ts`, adding `status` and `role` to the user table:

```typescript
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable("user", {
	id: text("id").primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: integer('email_verified', { mode: 'boolean' }).notNull(),
	image: text('image'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
	status: text('status').default('pending').notNull(),
	role: text('role').default('student').notNull()
});
// ... (standard session, account, verification tables)
```

## 2. Local Migration Command
The migration was generated and applied locally using:
1.  `npx drizzle-kit generate` (Created `drizzle/0000_watery_sentinels.sql`)
2.  `npx wrangler d1 migrations apply uni-vault-db --local`

## 3. Testing Instructions (Local)

### Step 1: Register User
Use `curl` or Postman to creaet a new account.
```bash
curl -X POST http://localhost:8787/api/auth/sign-up-email \
  -H "Content-Type: application/json" \
  -d '{"email": "student@uni.edu", "password": "password123", "name": "Student A"}'
```

### Step 2: Verify Protected Route Block (Pending Status)
Attempt to access a protected route without approval.
```bash
# Note: You need to manage cookies manually with curl using -c and -b
curl -X GET http://localhost:8787/api/protected \
  -H "Cookie: ...session_token..."
```
**Expected Result:** `403 Forbidden: Account not approved`

### Step 3: Admin Approval
Approve the user using the admin secret header.
```bash
curl -X POST http://localhost:8787/admin/approve \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: supersecretKey123" \
  -d '{"email": "student@uni.edu"}'
```
**Expected Result:** `{ "message": "User approved", "user": { ... "status": "approved" ... } }`

### Step 4: Verify Access (Approved Status)
Retry the protected route.
```bash
curl -X GET http://localhost:8787/api/protected \
  -H "Cookie: ...session_token..."
```
**Expected Result:** `200 OK`
