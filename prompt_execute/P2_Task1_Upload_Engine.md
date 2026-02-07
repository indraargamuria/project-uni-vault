# Project: uni-vault
# Task: P2_Task1 - Categorization, Activity Logs, & Upload Modal
# Model Setting: Gemini 3 Pro (High)

## 1. Database Schema Update (D1)
- **Files Table:** Add `category` (TEXT), `subject` (TEXT), and `uploaded_by` (TEXT).
- **Logs Table:** Create a new table `activity_logs` with columns: 
    `id` (Primary Key), `user_id` (TEXT), `action` (TEXT: 'upload'/'download'), `file_name` (TEXT), `timestamp` (DATETIME).
- **Migration:** Generate and run a SQL migration for the local D1 instance.

## 2. Backend API Upgrade
- **POST /api/files/upload:** - Accept `category` and `subject` from the multipart form body.
    - Store metadata in D1 and file in R2.
    - Record the action in the `activity_logs` table.

## 3. Frontend: shadcn/ui Upload Dialog
- Create a `FileUpload` component using shadcn/ui `Dialog`.
- **Fields:** Category (Select), Subject (Input), and File (Dropzone).
- **Feedback:** Add a "Success Toast" notification using `sonner` or a similar shadcn-compatible toast library upon completion.

## 4. Automation & Cleanup
- Remove any remaining temporary debug `console.log` statements.
- **Git Finalization:** - Once the code is verified, run:
    - `git add .`
    - `git commit -m "feat(p2-t1): implement file categorization, logs, and upload modal"`
    - `git push` (if a remote is configured).

## 5. Documentation
- Log the updated schema and new API endpoints in `agent_log/Phase2_Task1.md`.