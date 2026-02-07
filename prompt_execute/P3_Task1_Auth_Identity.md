# Project: uni-vault
# Task: P3_Task1 - User Identity & Smart Redirects
# Model Setting: Gemini 3 Pro (High)

## 1. Top Bar & Identity (shadcn/ui)
- Create a `UserNav` component in the header.
- Display the User's Name and Role (Admin/Student).
- Implement a "Logout" button that clears the session and redirects to `/login`.

## 2. Auth Guards & Auto-Redirects
- **Middleware Update:**
    - If a user with a valid session tries to access `/login` or `/register`, auto-redirect to `/dashboard`.
    - If an unauthenticated user tries to access `/dashboard`, auto-redirect to `/login`.
- Ensure this logic works smoothly without "infinite redirect" loops.

## 3. Register Page Implementation
- Create the `register.tsx` file (which was missing).
- Design it to match the Login page (shadcn Card).
- Fields: Name, Email, Password, Confirm Password.
- On success: Show a "Pending Approval" message and a link back to Login.

## 4. Automation & Cleanup
- Ensure the header is fixed to the top of the screen (`sticky top-0`).
- **Git Finalization:**
    - `git add .`
    - `git commit -m "feat(p3-t1): fix register page, add topbar identity, and implement auth redirects"`
    - `git push`

## 5. Documentation
- Log the new auth flow logic in `agent_log/Phase3_Task1.md`.