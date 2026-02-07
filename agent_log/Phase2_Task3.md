
# Phase 2 - Task 3: Visual Vault & Registration Log

## 1. Visual File Cards (Grid Layout)
- Replaced the data table with a responsve CSS Grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`).
- **FileCard Design:**
    - **Header:** Icon (color-coded by type) + Category Badge.
    - **Body:** File Name (truncated with ellipsis) + Subject.
    - **Footer:** Size + Date + Full-width "Download" button.
- **Preview Logic:**
    - **Images:** Purple accent, Image icon.
    - **PDFs:** Red accent, FileText icon.
    - **Sheets/Excel:** Green accent, Table/Sheet icon.
    - **Default:** Blue accent, File icon.
- **Interactions:** Added hover scaling (`hover:scale-[1.02]`) and shadow effects for a premium feel.

## 2. Public Registration
- Created `src/pages/register.tsx`:
    - Matches Login UI (Zinc styled card).
    - Fields: Name, Email, Password.
    - Links back to Login page.
- Updated `src/pages/login.tsx`:
    - Added a "Don't have an account? Register" link.

## 3. Git
- Changes committed: `feat(p2-t3): implement visual file cards, previews, and registration flow`.

## 4. Verification
- **Visuals:** Files should now appear as colorful cards instead of a boring list.
- **Sign Up:** Users can self-register via the UI.
