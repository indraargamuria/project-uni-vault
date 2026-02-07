# Project: uni-vault
# Task: P3_Task1_Auth_Emergency_Fix
# Model Setting: Gemini 3 Pro (High)

## 1. Fix Logout Request (Header.tsx)
- Remove all manual headers from the `authClient.signOut()` call.
- Better Auth handles the request type automatically. A 415 error means the headers are currently incorrect.
- Ensure no body is being sent.

## 2. Fix Base URL Warning
- In `src/lib/auth.ts` (or wherever your auth is initialized), ensure `baseURL` is set to `process.env.BETTER_AUTH_URL` or `c.env.BETTER_AUTH_URL`.
- This fixes the "Base URL could not be determined" warning which interferes with redirects.

## 3. The "Redirect Break" Logic
- In the `handleLogout` function, AFTER `await authClient.signOut()`, use:
  `window.location.href = "/login?loggedOut=true"`
- In your Middleware/Auth Guard: Add a check. If the URL has `?loggedOut=true`, DO NOT auto-redirect back to the dashboard, even if a cookie seems to exist.

## 4. Verification & Git
- `git add .`
- `git commit -m "fix(auth): resolve 415 error and break redirect loop"`
- `git push`