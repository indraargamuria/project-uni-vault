
# Phase 2 - Task 2: Pro Navigation & Dashboard Upgrade Log

## 1. Backend Updates (src/index.ts)
- **Middleware Update:** Relaxed the global `approved` check to allow `GET` requests. This enables pending users to access the dashboard to see their status, while still protecting mutation routes (POST/PUT).
- **Data Fetching:**
    - `totalFiles`: Count of all files.
    - `vaultGrowth`: Count of 'upload' activity logs in the last 7 days.
    - `userActivity`: Count of activity logs for the current user.
    - `navigation`: Dynamically aggregates `category` -> `subject` hierarchy from actual file data.
- **Props:** Passed `stats`, `navigation`, and `isApproved` to the Dashboard component.

## 2. Frontend Updates (src/pages/dashboard.tsx)
- **Layout Overhaul:** Switched to a responsive Sidebar + Main Content layout.
- **Sidebar:** Implemented a library navigation tree based on the dynamic `navigation` prop. Grouped by Category, listing Subjects underneath.
- **Stats Cards:** Added top-level cards for "Total Files", "Vault Growth", and "Your Activity".
- **Pending/Guest Logic:**
    - Added an "Access Pending" banner for users with `status !== 'approved'`.
    - Hides sensitive stats (shows `-`) and locks the "Upload" button for pending users.
    - Approved users see full stats and functional buttons.

## 3. Git
- Changes committed: `feat(p2-t2): implement pro sidebar navigation, summary stats, and guest logic`.

## 4. Verification
- **Admin**: Should see full stats, sidebar populated from DB, and ability to approve users/upload files.
- **Pending User**: Should see "Access Pending" banner, empty/placeholder stats, and disabled upload button.
