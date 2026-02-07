
# Milestone 6: E2E Testing Log

This log documents the full end-to-end verification of the user lifecycle.

## Workflow Execution

### Step 1: Register New Student "Nilam"
We create a new student account. By default, the status is `pending` and role is `student`.

```bash
# Register Nilam
curl -X POST http://localhost:8787/api/auth/sign-up-email \
  -H "Content-Type: application/json" \
  -c nilam_cookies.txt \
  -d '{"email": "nilam@uni.edu", "password": "password123", "name": "Nilam Student"}'
```
**Expected Output:** `{"user": {"email": "nilam@uni.edu", "status": "pending", ...}}`

---

### Step 2: Login as Admin "Arga"
We log in as the superadmin to get an active session for approval.

```bash
# Login Arga (Admin)
curl -X POST http://localhost:8787/api/auth/sign-in-email \
  -H "Content-Type: application/json" \
  -c admin_cookies.txt \
  -d '{"email": "indraargaaa@gmail.com", "password": "password123"}'
```
**Expected Output:** `{"user": {"role": "admin", "status": "approved", ...}}`

---

### Step 3: Approve Nilam (Admin Action)
We use the admin session and the secret header to approve Nilam.
**NOTE:** The secret header is `supersecretKey123` based on `src/index.ts`.

```bash
# Approve Nilam
curl -X POST http://localhost:8787/admin/approve \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: supersecretKey123" \
  -b admin_cookies.txt \
  -d '{"email": "nilam@uni.edu"}'
```
**Expected Output:** `{"message": "User approved", "user": {"status": "approved", ...}}`

---

### Step 4: Login as Nilam (Student)
Now that Nilam is approved, we log in to establish her session.

```bash
# Login Nilam
curl -X POST http://localhost:8787/api/auth/sign-in-email \
  -H "Content-Type: application/json" \
  -c nilam_cookies.txt \
  -d '{"email": "nilam@uni.edu", "password": "password123"}'
```

---

### Step 5: Verify Access
Nilam attempts to list files. This route is protected by `status === 'approved'`.

```bash
# List Files as Nilam
curl -X GET http://localhost:8787/api/files \
  -b nilam_cookies.txt
```
**Expected Output:** `{"files": [...]}` (200 OK)

## Success Table

| User | Initial Status | Action | Final Status | Access Result |
| :--- | :--- | :--- | :--- | :--- |
| **Nilam** | `pending` | Admin Approval | `approved` | **Granted** |
