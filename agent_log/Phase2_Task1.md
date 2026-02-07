
# Phase 2 - Task 1: Upload Engine Upgrade Log

## 1. Database Schema
Updated `src/db/schema.ts` with:
- `files` table: Added `subject`, `uploaded_by` (mapped to `uploadedBy` in Drizzle), and `category` (was already there, verified).
- `activity_logs` table: Created to track `upload` and `download` actions.

Migration `0002_volatile_veda.sql` was generated and applied to the local D1 database.

## 2. Backend API
- `POST /api/files/upload`:
    - Now accepts `subject` and `category` from `multipart/form-data`.
    - Saves extended metadata to D1.
    - Logs 'upload' action to `activity_logs`.
- `GET /api/files/download/:fileId`:
    - Logs 'download' action to `activity_logs`.

## 3. Frontend (Dashboard)
- Implemented a "Upload File" button invoking a Modal.
- **Upload Modal**: Built with Tailwind CSS, matches shadcn/ui style (Dialog).
    - Inputs: File, Subject, Category (Select).
- **File List**: Updated table columns to show "Subject", "Category", and "Uploaded By".

## 4. Git
- Changes committed: `feat(p2-t1): implement file categorization, logs, and upload modal`.

## 5. Verification
- Upload flow tested via Dashboard UI.
- File listing reflects new metadata.
