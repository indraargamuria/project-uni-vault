# Project: uni-vault
# Task: P2_Task3 - Visual File Cards, Previews, & Registration Link
# Model Setting: Gemini 3 Pro (High)

## 1. Grid Card View (shadcn/ui)
- Replace the simple table with a **Grid Layout** (Responsive: 1 col on mobile, 3-4 on desktop).
- **FileCard Component:** Each card should display:
    - **Icon/Thumbnail:** Use Lucide icons based on file extension (e.g., FileText for .txt, FileArchive for .zip, FileVideo for .mp4, Image for photos).
    - **Metadata:** File name, size, subject tag, and upload date.
    - **Download Action:** A button that is only enabled/visible for 'approved' users.

## 2. File Preview Logic
- For **Images** (.jpg, .png, .webp): Show a small thumbnail preview if possible, or a dedicated "Image" icon.
- For **PDFs**: Use a specific "PDF" branded icon (Red accent).
- For **Excel/Sheets**: Use a "Sheet" branded icon (Green accent).

## 3. Registration Access
- **Entry Point:** Add a "Create an account" link to the existing shadcn Login page.
- **Register Form:** Ensure the Registration page matches the Login styling (centered card, Zinc theme).
- **Redirect:** After registration, redirect the user to a "Success" page that explains their account is now 'Pending' and awaiting Arga's approval.

## 4. Automation & Cleanup
- **Hover Effects:** Add subtle scaling or border-color changes when hovering over a File Card.
- **Git Finalization:**
    - `git add .`
    - `git commit -m "feat(p2-t3): implement visual file cards, previews, and registration flow"`
    - `git push`

## 5. Documentation
- Log the new component structures (FileCard) and UI screenshots/descriptions in `agent_log/Phase2_Task3.md`.