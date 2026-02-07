
# Milestone 5: Delivery Implementation Log

## 1. List Route
Implemented `GET /api/files` in `src/index.ts`.
- Fetches all files from D1 `files` table.
- Supports optional `?category=` filter.
- Returns JSON array of file metadata.

## 2. Download Route
Implemented `GET /api/files/download/:fileId` in `src/index.ts`.
- Validates file existence in D1.
- Fetches object from R2 bucket.
- Sets `Content-Disposition` header to `attachment; filename="original_name"`.
- Streams the file content back to the client.

## 3. Testing Instructions

### Step 1: Upload a File (Prerequisite)
Ensure you have uploaded at least one file as per Milestone 4.

### Step 2: List Files
```bash
curl -X GET http://localhost:8787/api/files \
  -H "Cookie: ...session_token..."
```
Response should look like:
```json
{
  "files": [
    {
      "id": "...",
      "name": "test.pdf",
      "key": "...",
      "category": "Assignment",
      ...
    }
  ]
}
```

### Step 3: Download a File
Copy the `id` from the list response.
```bash
# -O saves the file with the remote filename (via Content-Disposition) or you can use -o local_name.pdf
curl -X GET http://localhost:8787/api/files/download/<FILE_ID> \
  -H "Cookie: ...session_token..." \
  -O -J
```
*Note: `-J` tells curl to use the filename from the Content-Disposition header.*

## 4. Error Handling
- Invalid `fileId` returns `404 File record not found`.
- Missing R2 object (data sync issue) returns `404 File content not found in storage`.
