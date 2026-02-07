# Project: uni-vault
# Task: P3_Task1_Cleanup - Force Cookie Expiration on Logout
# Model Setting: Gemini 3 Pro (High)

## 1. Server-Side Cookie Clearing (src/index.ts)
- In the Hono route that handles Better Auth (`/api/auth/*`), ensure the response headers from Better Auth are being correctly mapped to the Hono response.
- **Specific Fix:** Ensure that when `signOut` is called, the `Set-Cookie` header with an expired date (e.g., `Max-Age=0`) is sent back to the browser.

## 2. Better Auth Config (src/lib/auth.ts)
- Check the `cookie` configuration in the `auth` object.
- Ensure `useSecureCookies` is handled correctly for `localhost` (usually false for dev, true for prod).
- Verify that `advanced.cookiePrefix` isn't causing a naming mismatch.

## 3. Frontend "Hard Wipe" (Header.tsx)
- In the `handleLogout` function, add a manual cookie clearing script as a backup:
  ```javascript
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });