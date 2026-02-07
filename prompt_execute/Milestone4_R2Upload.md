# Project: uni-vault
# Task: Milestone4_R2_Upload - File Storage & Metadata
# Model Setting: Gemini 3 Pro (High)

## Context
Admin and Student roles are verified. Now we need to implement file uploads. We will use Cloudflare R2 for the binary files and D1 for the file records.

## Objectives
1. **R2 Binding:** Ensure the `wrangler.jsonc` has an R2 bucket binding named `BUCKET`.
2. **D1 Schema Update:** Add a `files` table in `src/db/schema.ts`:
   - `id`: Text (Primary Key)
   - `name`: Text (Original filename)
   - `key`: Text (The unique path in R2)
   - `size`: Integer
   - `type`: Text (MIME type)
   - `category`: Text (e.g., 'Assignment', 'Note')
   - `userId`: Text (Foreign Key to user)
   - `createdAt`: Integer/Timestamp
3. **Upload Route:** Create `POST /api/files/upload`.
   - Apply `auth` and `approved` middleware.
   - Accept `multipart/form-data`.
   - Upload file to R2: `c.env.BUCKET.put(key, fileBody)`.
   - Save record to D1 `files` table.
4. **Local R2 Setup:** Provide instructions on how to create the local R2 bucket for development.

## Documentation Requirement
Save a log in `agent_log/P01_Milestone4_Upload.md`.
Include:
- The `curl.exe` command to upload a PDF file from Windows.
- How to check the R2 bucket contents via Wrangler CLI.