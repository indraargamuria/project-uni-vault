# Project: uni-vault
# Task: P2_Task2 - Sidebar Navigation, Summary Cards, & Guest Logic
# Model Setting: Gemini 3 Pro (High)

## 1. Professional Sidebar (shadcn/ui)
- **Dynamic Grouping:** Fetch the unique categories and subjects from the `files` table.
- **Hierarchy:** Build a sidebar with collapsible groups:
    - **General:** Links to "Academic General"
    - **Semesters:** A list of "Semester 1", "Semester 2", etc.
    - **Subjects:** Under each semester, show the subjects (e.g., Calculus, Physics).
- **Active State:** Highlight the current active category/subject in the sidebar.

## 2. Dashboard Summary Panel (Top Section)
- Create three 'Stat Cards' at the top of the main content area:
    1. **Total Files:** Count of all files in the vault.
    2. **Vault Growth:** Number of files uploaded in the last 7 days.
    3. **Your Activity:** Number of downloads/uploads for the currently logged-in user (from `activity_logs`).

## 3. Guest/Pending Logic
- **Unauthorized View:** If a user is `pending`, they can see the Sidebar and the Summary Panel (with 0s or blurred stats), but the main file area must display a **"Access Pending"** state.
- **Locked Message:** Use a shadcn `Alert` or `Card` to say: "Your account is awaiting approval from Arga. You will be able to view and download files once approved."

## 4. Automation & Cleanup
- **UI Polish:** Ensure the sidebar is responsive (collapsible on mobile).
- **Git Finalization:** - `git add .`
    - `git commit -m "feat(p2-t2): implement pro sidebar navigation, summary stats, and guest logic"`
    - `git push`

## 5. Documentation
- Log the navigation structure and the new summary logic in `agent_log/Phase2_Task2.md`.