# Project: uni-vault
# Task: P3_Task1_Final - Logout, Registration, and Alignment Fix
# Model Setting: Gemini 3 Pro (High)

## 1. The "Nuclear" Logout Fix (Header.tsx)
- Rewrite `handleLogout` to use `window.location.replace("/login")` after the `signOut()` call.
- **Goal:** Break the middleware redirect loop by forcing a full browser refresh to the login page.
- Clear `localStorage` and `sessionStorage` during the logout process.

## 2. Alignment Consolidation
- **Uniform Container:** Wrap the internal content of the `Header` AND the `Main Dashboard` area in the exact same Tailwind container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- Ensure the Logo on the left and the Dashboard cards start at the exact same vertical alignment.

## 3. Registration Page Implementation (Note 6)
- **File Check:** Verify `src/routes/register.tsx` exists. If not, create it.
- **Routing:** Ensure `app.get('/register', ...)` and `app.post('/register', ...)` are correctly defined in `src/index.ts`.
- **UI:** Match the Login page style (Centered Card). Add a "Back to Login" link.
- **Redirect:** After successful registration, show a "Pending Approval" message or redirect to `/login?message=pending`.

## 4. Auth Guards (Note 5)
- **Middleware Logic:**
    - Logged in users trying to hit `/login` or `/register` MUST be redirected to `/dashboard`.
    - Unlogged users trying to hit `/dashboard` MUST be redirected to `/login`.

## 5. Automation & Cleanup
- **Git Finalization:**
    - `git add .`
    - `git commit -m "fix(p3-t1): nuclear logout fix, aligned margins, and restored register route"`
    - `git push`