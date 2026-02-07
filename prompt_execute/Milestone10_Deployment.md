# Project: uni-vault
# Task: Milestone10 - Production Deployment to Cloudflare
# Model Setting: Gemini 3 Pro (High)

## 1. Production Config (wrangler.jsonc)
- Ensure `database_id` for D1 and `bucket_name` for R2 are correctly set for the production environment.
- Add a `compatibility_date` to ensure stable worker behavior.

## 2. Secrets Management
- Guide the user to run `wrangler secret put` for the following:
    - `ADMIN_SECRET`
    - `BETTER_AUTH_SECRET`
    - `BETTER_AUTH_URL` (set to your actual .pages.dev or custom domain)

## 3. Deployment Command
- Run `npm run deploy` or `npx wrangler deploy`.
- **Note:** If using Cloudflare Pages, ensure the build command is `npm run build` and the output directory is correctly pointed.

## 4. Final Verification
- Check the live URL to ensure the `/login` page loads.
- Verify that the `Set-Cookie` headers work on the production domain (Cross-site cookies can be tricky, ensure `SameSite=Lax` and `Secure`).

## 5. Automation
- git add . && git commit -m "chore: production deployment config" && git push