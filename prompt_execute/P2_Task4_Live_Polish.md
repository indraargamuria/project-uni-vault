# Project: uni-vault
# Task: P2_Task4 - Activity Feed, Global Search, & Final Polish
# Model Setting: Gemini 3 Pro (High)

## 1. Real-Time Activity Feed (shadcn/ui)
- **Component:** Add an "Recent Activity" sidebar or bottom-sheet on the Dashboard.
- **Logic:** Fetch the latest 10 entries from the `activity_logs` table.
- **Display:** Show natural language strings like:
    - "🟢 Nilam downloaded 'Calculus_Week1.pdf' - 2 mins ago"
    - "🔵 Arga uploaded 'Physics_Syllabus.pdf' - 1 hour ago"
- **Iconography:** Use small Lucide icons (DownloadCloud, UploadCloud) to differentiate actions.

## 2. Global Search Bar
- **Implementation:** Add a search input at the top of the File Grid.
- **Functionality:** Filter the `FileCard` grid in real-time as the user types (client-side filtering for speed).
- **Scope:** Search should match against File Name and Subject tags.

## 3. UX Refinements (The "Pro" Touch)
- **Empty States:** Create a beautiful "Empty State" component for categories with no files (using a Lucide 'Ghost' or 'FolderPlus' icon).
- **Breadcrumbs:** Add a shadcn `Breadcrumb` component above the file grid (e.g., Vault > Semester 1 > Calculus) so users don't get lost.
- **Logout:** Ensure the Logout button clears the session and redirects to `/login` smoothly.

## 4. Automation & Cleanup
- **Final Code Audit:** Remove any leftover debug logs or unused imports.
- **Git Finalization:**
    - `git add .`
    - `git commit -m "feat(p2-t4): implement activity feed, global search, and breadcrumb navigation"`
    - `git push`

## 5. Documentation
- Update `README.md` with screenshots of the finished UI and final feature list.
- Log the final Phase 2 completion in `agent_log/Phase2_Task4.md`.