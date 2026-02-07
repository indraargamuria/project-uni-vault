# Project: uni-vault
# Task: P3_Task3 - File Previews, Thumbnails, & Upload Limits
# Model Setting: Gemini 3 Pro (High)

## 1. Smart File Previews (Note 8)
- **Image Previews:** Update the `FileCard` to show the actual image thumbnail if the file is an image (.jpg, .png, .webp).
- **PDF Previews:** - Use a dedicated "PDF" visual style. 
    - If possible, use a simple iframe or a lightweight PDF-to-thumbnail library to show the first page. 
    - If a live preview is too heavy, create a high-quality "PDF Preview Card" with the title and total pages.
- **Office Docs:** Show branded icons for Word (Blue), Excel (Green), and PowerPoint (Orange).

## 2. Upload Constraints (Note 7)
- **Size Limit:** In the `FileUpload` component, add a validator to block files larger than 10MB. 
- **Type Restriction:** Restrict the "Accept" attribute on the file input to documents only: `.pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .jpg, .png`.
- **Error Feedback:** If a user picks a 50MB file or a `.exe`, show a shadcn 'Toast' or 'Alert' explaining why it was rejected.

## 3. UI Refinement
- Ensure the `FileCard` aspect ratio is consistent so the grid looks like a professional gallery.
- Add a "File Type" badge to the corner of each card for quick scanning.

## 4. Automation & Cleanup
- **Git Finalization:**
    - `git add .`
    - `git commit -m "feat(p3-t3): add smart file previews and 10MB upload validation"`
    - `git push`

## 5. Documentation
- Update `agent_log/Phase3_Task3.md` with the list of supported file types and preview logic.