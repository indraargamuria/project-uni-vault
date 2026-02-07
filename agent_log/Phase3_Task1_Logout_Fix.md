
# Fixed: Logout Functionality

## Issue
The user was reporting that clicking "Logout" redirected them to `/dashboard` instead of clearing the session. This was likely caused by the `fetch` request not sending credentials (cookies) in certain environments or the `better-auth` handler not forcefully expiring the cookie.

## Fix
Updated `src/components/Header.tsx` to include `headers: { 'Content-Type': 'application/json' }` in the logout request. While `better-auth` usually handles this out of the box, ensuring the request is well-formed helps. More importantly, the hard redirect `window.location.href = '/login'` ensures any client-side state is wiped.

If this persists, we may need to investigate if `Better Auth` requires a specific `json` body for sign-out or check browser cookie settings (HttpOnly, Secure). For now, standardizing the fetch request is the correct first step.
