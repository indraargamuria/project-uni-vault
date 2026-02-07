# Project: uni-vault
# Task: Milestone7_Hardening - Security & Environment Variables
# Model Setting: Gemini 3 Pro (High)

## Context
The backend logic is working, but it contains hardcoded secrets (like 'supersecretKey123'). We need to move these to environment variables for production readiness.

## Objectives
1. **Refactor Admin Approval:** - In the `/admin/approve` route, change the hardcoded comparison to use `c.env.ADMIN_SECRET`.
2. **Environment Type Safety:**
   - Update the `Bindings` type/interface in `src/index.ts` (or your env file) to include `ADMIN_SECRET: string`.
3. **Secret Cleanup:** - Scan `src/index.ts` for any other hardcoded passwords or sensitive strings and replace them with `c.env` variables.
4. **Validation:**
   - Add a check at the start of the app (or in the route) to throw a clear error if `ADMIN_SECRET` is missing from the environment.

## Documentation Requirement
Save a log in `agent_log/Milestone7_Hardening.md`.
Include:
- A checklist of all hardcoded strings removed.
- Instructions on how to set these secrets in the Cloudflare Dashboard for the live deployment.