
# Phase 3 - Task 1 (Fix): Header Consolidation & Logout Repair Log

## 1. Header Consolidation
- **Removed Duplicate Header:** Removed the `<nav>` logic from `src/renderer.tsx`. This ensures that unauthenticated pages (Login, Register) do not show the app header.
- **Created `Header` Component:** Implemented `src/components/Header.tsx` which contains the branding, user identity, and logout logic.
- **Updated `Dashboard`:** Modified `src/pages/dashboard.tsx` to import and use the new `<Header />` component. This ensures the header only appears on the Dashboard.

## 2. Logout Logic Repair
- **Robust Logout:** Updated `Header.tsx` to use `fetch('/api/auth/sign-out')` with a hard redirect:
  ```javascript
  const res = await fetch('/api/auth/sign-out', { method: 'POST' });
  window.location.href = '/login'; // Hard redirect to clear client state
  ```
- **Failsafe:** Even if the API call fails (rare), the client will force a redirect to `/login`.

## 3. Layout Adjustments
- **Renderer Update:** Modified `src/renderer.tsx` to conditionally wrap content in a `container`.
  - **Dashboard:** Takes full control of layout (no wrapper).
  - **Other Pages:** Wrapped in a centered `container` for consistent styling.

## 4. Git
- Changes committed: `fix(p3-t1): consolidate headers and fix logout functionality`.

## 5. Verification
- **Login/Register:** Should show clean centered cards without a top nav bar.
- **Dashboard:** Should show the Sticky Header at the top.
- **Logout:** Clicking "Log out" should reliably redirect to `/login`.
