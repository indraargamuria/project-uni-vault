# Project: uni-vault
# Task: Milestone6_E2E_Testing - Full Workflow Verification
# Model Setting: Gemini 3 Pro (High)

## Context
The backend is functionally complete. I need to verify the full user lifecycle: Registration, Admin Login, Approval, and Access Control.

## Objectives
1. **New Student Persona:** Create a student named "Nilam" (nilam@uni.edu).
2. **The Workflow Script:** Provide a sequence of 5 specific curl commands:
   - **Step 1:** Register Nilam (Status will be 'pending').
   - **Step 2:** Login as Arga (indraargaaa@gmail.com) to get an admin session.
   - **Step 3:** Approve Nilam using the Admin API and the Secret Header.
   - **Step 4:** Login as Nilam to get a student session.
   - **Step 5:** Verify Nilam can now access `/api/files`.

3. **Logging Requirement:**
   - Save the history of these exact commands and their expected JSON outputs into `agent_log/Milestone6_E2E_Testing.md`.
   - Update the log with a "Success Table" showing the status change of Nilam in D1.

## Technical Requirements
- Ensure the `X-Admin-Secret` used in the script matches the one currently in `src/index.ts`.
- Use separate cookie files (`admin_cookies.txt` and `nilam_cookies.txt`) to avoid session mixing.