
# Fixed: Logout Loops & Alignment

## 1. The Nuclear Logout
- Updated `src/components/Header.tsx` to handle aggressive sign-out.
  - Clears `localStorage` and `sessionStorage`.
  - Sends a `POST` request to `/api/auth/sign-out` with JSON headers.
  - Most importantly, uses `window.location.replace('/login')` to forcefully navigate away and clear the history stack for the current page state.

## 2. Universal Alignment
- Standardized the container max-width and padding across the app.
- **Header:** Uses `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`.
- **Dashboard Grid:** Uses the exact same classes `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`.
- This ensures the left edge of the Logo aligns exactly with the left edge of the Sidebar on all screen sizes.

## 3. Registration Routing
- Verified `src/pages/register.tsx` (not `src/routes/register.tsx`, project structure uses `pages`) exists and is properly imported.
- `src/index.ts` correctly mounts `app.get('/register')` and `app.post('/api/auth/sign-up/email')`.
- The registration page includes:
  - Centered Card Layout (matching Login).
  - Validation (Confirm Password).
  - Success State with "Back to Login".

## 4. Auth Guards
- Verified `src/index.ts` middleware.
- **Rules:**
  - `Authenticated -> /login` => `Redirect /dashboard`
  - `Authenticated -> /register` => `Redirect /dashboard`
  - `Unauthenticated -> /dashboard` => `Redirect /login`

## 5. Git
- Changes committed: `fix(p3-t1): nuclear logout fix, aligned margins, and restored register route`.
