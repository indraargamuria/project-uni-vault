# Project: uni-vault
# Task: Milestone2_Auth - Local Authentication & Approval System
# Model Setting: Gemini 3 Pro (High)

## Context
Milestone 1 is complete. D1 and R2 are linked in `wrangler.jsonc`. I am building a student document vault. The goal of this milestone is to establish a secure, local-first authentication system where users must be approved by me (Arga) before they can access storage.

## Execution Strategy: LOCAL FIRST
- All database migrations must be applied to the LOCAL D1 emulator first (`--local`).
- All testing should be done against `http://localhost:8787`.
- Do NOT deploy to production until I explicitly verify the local flow.

## Objectives
1. **Drizzle Schema:** Define tables for Better Auth in `src/db/schema.ts`. Include:
   - `user`: Add `status` (default: 'pending') and `role` (default: 'student').
   - `session`, `account`, `verification`: Standard Better Auth tables.
2. **Auth Setup:** Configure `src/lib/auth.ts` using the Drizzle adapter and link to Cloudflare D1.
3. **Hono Integration:** - Mount Better Auth handlers in `src/index.ts`.
   - Create a Middleware that checks if `user.status === 'approved'`. If not, block access to protected routes with a 403 error.
4. **Admin Route:** Create `/admin/approve` (protected by a secret header or admin role) to update user status in D1.
5. **Local Migration:** Generate the SQL migration and provide the specific command to apply it to the local D1 instance.

## Documentation Requirement
Save a detailed log in `agent_log/P01_Milestone2_Auth.md`. 
Include:
- The generated schema.
- The command used for the local D1 migration.
- Instructions on how to test the 'Register -> Pending -> Approve' flow locally using curl or a browser.

## Technical Constraints
- Stack: Hono, Better Auth, Drizzle ORM.
- Environment: Cloudflare Workers (Local Emulator).
- Access D1 via `c.env.DB`.