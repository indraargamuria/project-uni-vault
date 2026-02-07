
# Milestone 6: E2E Testing Log (Emanuel)

This log documents the full end-to-end verification of the user lifecycle for the new user "Emanuel".

## Context
- **Admin Secret**: `vK9#mZ2!pL8xQ$5nB7*tW4yR1jG6hA9` (from `.dev.vars`)
- **Admin Email**: `indraargaaa@gmail.com`
- **Student Email**: `emanuel@uni.edu`

## Workflow Execution

### Step 1: Register New Student "Emanuel"
```bash
curl -X POST http://localhost:8787/api/auth/sign-up-email \
  -H "Content-Type: application/json" \
  -c emanuel_cookies.txt \
  -d '{"email": "emanuel@uni.edu", "password": "password123", "name": "Emanuel Student"}'
```
**Expected Output:** `{"user": {"email": "emanuel@uni.edu", "status": "pending", ...}}`

---

### Step 2: Login as Admin "Arga"
```bash
curl -X POST http://localhost:8787/api/auth/sign-in-email \
  -H "Content-Type: application/json" \
  -c admin_cookies.txt \
  -d '{"email": "indraargaaa@gmail.com", "password": "password123"}'
```
**Expected Output:** `{"user": {"role": "admin", "status": "approved", ...}}`

---

### Step 3: Approve Emanuel (Admin Action)
Using the correct secret from `.dev.vars` and the header case matching the request.

```bash
curl -X POST http://localhost:8787/admin/approve \
  -H "Content-Type: application/json" \
  -H "X-Admin-Secret: vK9#mZ2!pL8xQ$5nB7*tW4yR1jG6hA9" \
  -b admin_cookies.txt \
  -d '{"email": "emanuel@uni.edu"}'
```
**Expected Output:** `{"message": "User approved", "user": {"status": "approved", ...}}`

---

### Step 4: Login as Emanuel (Student)
```bash
curl -X POST http://localhost:8787/api/auth/sign-in-email \
  -H "Content-Type: application/json" \
  -c emanuel_cookies.txt \
  -d '{"email": "emanuel@uni.edu", "password": "password123"}'
```

---

### Step 5: Verify Access
```bash
curl -X GET http://localhost:8787/api/files \
  -b emanuel_cookies.txt
```
**Expected Output:** `{"files": [...]}` (200 OK)

## Success Table

| User | Initial Status | Action | Final Status | Access Result |
| :--- | :--- | :--- | :--- | :--- |
| **Emanuel** | `pending` | Admin Approval | `approved` | **Granted** |
