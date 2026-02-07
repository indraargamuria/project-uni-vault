
# Phase 2 - Task 4: Live Polish & Search Log

## 1. Global Search
- Implemented a **Global Search Input** in the dashboard header.
- **Client-Side Filtering:** JavaScript filters the File Grid instantly by matching card text (Name and Subject) against the search term.
- **Empty State:** Added a `#empty-search-state` component ("No matches found") that appears when search results are empty, preventing a blank screen.

## 2. Activity Feed
- **Backend:** Updated `GET /dashboard` to fetch the last 10 entries from `activity_logs`, joined with the `user` table to display names.
- **Frontend:** Added a "Recent Activity" sidebar/panel to the dashboard.
- **Visuals:** Used `animate-ping` for a "live" feel (Blue for Uploads, Green for Downloads).
- **Format:** "User X uploaded File Y - 2 mins ago".

## 3. Navigation & Layout
- **Breadcrumbs:** Added a `Vault > Dashboard` breadcrumb for clear navigation context.
- **Layout:** Refined the grid to include the Activity Feed as a distinct column on large screens (`lg:grid-cols-4`, where Files take 3 cols and Feed takes 1).

## 4. Git
- Changes committed: `feat(p2-t4): implement activity feed, global search, and breadcrumb navigation`.

## 5. Verification
- **Search:** Typing "Calculus" should hide Physics files.
- **Activity:** Recent actions should appear in the feed with correct user names.
- **Empty State:** Typing "Gibberish" should show the "No matches found" message.
