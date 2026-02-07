
# Milestone 3: Admin Seed Implementation Log

## 1. Idempotent Admin Promotion
Added the route `/dev/promote-admin` in `src/index.ts`. This route:
- Checks if the host is localhost (dev safety).
- Updates the user with email `indraargaaa@gmail.com` to `role: 'admin'` and `status: 'approved'`.
- This ensures that running this request always enforces the admin state for this user.

## 2. Admin Verification Route
Added `/api/admin/check` which:
- Verifies the session.
- Checks `session.user.role === 'admin'`.
- Returns "Hello Admin Arga" on success.

## 3. Manual Override Command (D1 SQL)
If the API promotion fails, use this Wrangler command to manually force the update on the local D1 instance:

```bash
npx wrangler d1 execute uni-vault-db --local --command "UPDATE user SET role = 'admin', status = 'approved' WHERE email = 'indraargaaa@gmail.com';"
```

## 4. Testing Instructions

### Step 1: Ensure User Exists
Register `indraargaaa@gmail.com` if not already done.
```bash
curl -X POST http://localhost:8787/api/auth/sign-up-email \
  -H "Content-Type: application/json" \
  -d '{"email": "indraargaaa@gmail.com", "password": "password123", "name": "Indra Arga"}'
```

### Step 2: Promote to Admin
Call the dev promotion route.
```bash
curl -X POST http://localhost:8787/dev/promote-admin
```
**Expected Response:** `{"message": "Admin promoted successfully", "user": { ... "role": "admin", "status": "approved" ... }}`

### Step 3: Verify Admin Access
Check the admin route.
```bash
# Remember to include the session cookie from login/signup
curl -X GET http://localhost:8787/api/admin/check \
  -H "Cookie: ...session_token..."
```
**Expected Response:** `{"message": "Hello Admin Arga"}`
