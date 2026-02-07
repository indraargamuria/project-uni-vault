# Project: uni-vault
# Task: Milestone3_Admin_Seed - Superadmin Identity & Promotion
# Model Setting: Gemini 3 Pro (High)

## Context
I am currently registered but stuck as a 'pending' student. I need to officially promote my email (indraargaaa@gmail.com) to 'admin' and 'approved' status within the D1 database so I can manage the vault.

## Objectives
1. **Idempotent Seeding Logic:**
   - In `src/index.ts` or a dedicated `src/db/seed.ts`, create a function that checks for the email `indraargaaa@gmail.com`.
   - If the user exists, force update their `role` to 'admin' and `status` to 'approved'.
   - This should trigger on server start or via a specific local-only route: `/dev/promote-admin`.

2. **D1 Manual Override:**
   - Provide the exact `wrangler d1 execute` SQL command to manually set my account to admin in the local SQLite file. This is a backup in case the code fails.

3. **Admin Verification Route:**
   - Create a protected route `/api/admin/check` that returns a JSON message: "Hello Admin Arga" ONLY if the logged-in user has `role === 'admin'`.

4. **Security Constraint:**
   - Ensure the `/dev/promote-admin` route is disabled if `ENVIRONMENT === 'production'`.

## Documentation Requirement
Save a log in `agent_log/Milestone3_Admin_Seed.md`.
Include:
- The SQL command for manual promotion.
- The Hono code snippet that handles the role check.
- A confirmation that `indraargaaa@gmail.com` is now the Superadmin.

## Instructions
- Use `c.env.DB` for all database interactions.
- Do not attempt to implement R2 uploads in this step; stay focused on Admin Rights.