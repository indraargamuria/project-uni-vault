
# Milestone 4: R2 Upload Implementation Log

## 1. R2 Binding
Updated `wrangler.jsonc` to use the binding name `BUCKET`:
```json
	"r2_buckets": [
		{
			"bucket_name": "uni-vault-storage",
			"binding": "BUCKET"
		}
	],
```

## 2. D1 Schema Update
Added `files` table to `src/db/schema.ts` and ran migration.
- `id`, `name`, `key` (R2 path), `size`, `type`, `category`, `userId`, `createdAt`.

## 3. Upload Route Implementation
Created `POST /api/files/upload`:
- **Auth**: Protected by auth and 'approved' middleware.
- **Body**: Expects `multipart/form-data` with `file` and optional `category`.
- **R2**: Uploads file to path `userId/fileId-filename`.
- **D1**: Inserts file metadata.

## 4. Local R2 Setup Instructions

### Step 1: Create Local R2 Bucket (if not exists)
Wrangler automatically handles local R2 persistence in `.wrangler/state/v3/r2`. No explicit creation command is usually needed for local dev other than defining it in `wrangler.jsonc`, but you can verify it exists by running the app.

### Step 2: Upload a File via Curl
Use the `-F` flag for multipart form data.
```bash
# Don't forget the session cookie!
curl -X POST http://localhost:8787/api/files/upload \
  -H "Cookie: ...session_token..." \
  -F "file=@C:/path/to/test.pdf" \
  -F "category=Assignment"
```

### Step 3: Verify R2 Content (Simulated)
Since it's local, you can't easily "list" R2 buckets via CLI like production. However, you can verify the upload by checking the response from the upload endpoint (it returns the file metadata) or implementing a `GET /api/files` route to list them from D1.

To check via Wrangler for **production** later:
```bash
npx wrangler r2 object list uni-vault-storage
```
