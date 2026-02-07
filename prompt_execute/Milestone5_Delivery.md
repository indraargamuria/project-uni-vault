# Project: uni-vault
# Task: Milestone5_Delivery - Listing and Downloading Files
# Model Setting: Gemini 3 Pro (High)

## Context
Files are successfully uploading to R2 and metadata is in D1. Now we need to let users see what's available and download them.

## Objectives
1. **List Route:** Create `GET /api/files`.
   - Apply `auth` and `approved` middleware.
   - Fetch all records from the D1 `files` table and return them as JSON.
   - Support optional filtering by `category` (e.g., `/api/files?category=Calculus`).

2. **Download Route:** Create `GET /api/files/download/:fileId`.
   - Apply `auth` and `approved` middleware.
   - 1. Look up the `fileId` in D1 to find the R2 `key` and original `name`.
   - 2. Fetch the object from R2: `const object = await c.env.BUCKET.get(key)`.
   - 3. Return the object as a stream. 
   - **Crucial:** Set the `Content-Disposition` header to `attachment; filename="ORIGINAL_NAME"` so the browser downloads it correctly.

3. **Error Handling:** Return `404 Not Found` if the file record doesn't exist in D1 or the object is missing from R2.

## Documentation Requirement
Save a log in `agent_log/Milestone5_Delivery.md`.
Include:
- The `curl.exe` command to list all files.
- The `curl.exe` command to download a specific file to a local Windows path.