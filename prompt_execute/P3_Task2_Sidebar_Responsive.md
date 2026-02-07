# Project: uni-vault
# Task: P3_Task2 - Hierarchical Navigation & Mobile Responsive UI
# Model Setting: Gemini 3 Pro (High)

## 1. Data Transformation (Grouping)
- In the Dashboard/Sidebar, transform the flat `files` array into a nested object: 
  `Record<Category, Record<Subject, File[]>>`.
- **Note 3 (Defaults):** Assign files with missing metadata to Category: "General" and Subject: "Miscellaneous".

## 2. Folder-Style Sidebar (shadcn/ui)
- **Top Level (Folders):** Use `category` (e.g., General, Semester 1).
- **Sub Level (Items):** Inside each folder, show a list of unique `subjects` (e.g., Calculus).
- **Behavior:** Use shadcn `Collapsible` or `Accordion`. Clicking a Subject filters the main file grid to show only those files.

## 3. Mobile Responsiveness (Note 4)
- **Header:** Add a Menu (Hamburger) icon on the left (visible only on mobile).
- **Drawer:** Trigger a shadcn `Sheet` that holds the Sidebar content when the menu is clicked.
- **Layout:** On mobile, the main content should take 100% width (remove the `ml-64` margin).

## 4. Automation & Cleanup
- Ensure the "Active" folder/subject has a distinct background color (e.g., Zinc-100).
- **Git Finalization:**
    - `git add .`
    - `git commit -m "feat(p3-t2): folder-style sidebar and mobile responsiveness"`
    - `git push`

## 5. Documentation
- Update `agent_log/Phase3_Task2.md` with the new component hierarchy.