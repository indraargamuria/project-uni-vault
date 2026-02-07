# Project: uni-vault
# Task: P3_Task1_Fix - Header Consolidation & Logout Repair
# Model Setting: Gemini 3 Pro (High)

## 1. Header Consolidation (Merge Headers)
- **Identify Duplicate Headers:** Look at `layout.tsx` and `Dashboard.tsx` (or similar). Remove the redundant top bars.
- **Unified Header:** Create a single `Header` component at the top of the app that contains:
    - **Left:** App Logo ('Uni-Vault') and a Mobile Menu trigger (Hamburger).
    - **Right:** User Identity (Name & Role) and the Logout Button.
- **Style:** Sticky position, backdrop-blur, border-b Zinc-200.

## 2. Logout Logic Repair
- **API Call:** Ensure the logout button calls `await authClient.signOut()`.
- **Hard Redirect:** On success, use `window.location.href = '/login'` instead of a soft router link to ensure all states are wiped.
- **Manual Cookie Clear (Optional):** If `signOut()` fails, manually clear the session cookies to force the user out.

## 3. Auth Guard Refinement
- Ensure that the `/login` page **does not** show the Header. The Header should only appear once a user is authenticated and on the `/dashboard`.

## 4. Automation & Cleanup
- Check for "Register Page Not Found" again—ensure the route is exported correctly in `index.ts`.
- **Git Finalization:**
    - `git add .`
    - `git commit -m "fix(p3-t1): consolidate headers and fix logout functionality"`
    - `git push`

## 5. Documentation
- Verify the header looks correct on mobile and desktop in `agent_log/Phase3_Task1_Fix.md`.