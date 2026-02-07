# Project: uni-vault
# Task: Milestone8_Frontend_MVP - shadcn/ui Inspired Interface
# Model Setting: Gemini 3 Pro (High)

## Context
The backend API is functional and secured. I now need a modern, beautiful web interface served directly via Hono JSX. The design must mimic the shadcn/ui "Zinc" theme (Clean, minimalist, high-contrast text).

## Objectives
1. **Global Styles & Layout:**
   - Integrate Tailwind CSS (Play CDN) and 'Inter' Google Font.
   - Configure Tailwind to use shadcn colors: Zinc-950 (foreground), White (background), Zinc-100 (muted).
   - Create a Layout wrapper with a responsive Navbar featuring 'Uni-Vault' branding.

2. **Login View (/login):**
   - Design a centered card: Border Zinc-200, Shadow-sm, Rounded-xl.
   - Form fields: Label (Small/Medium weight), Input (Zinc-200 border, ring-black focus).
   - Button: Slate-900 background, White text, hover effect.

3. **Dashboard View (/dashboard):**
   - **Header:** Title "The Vault" with a "Sign Out" button.
   - **File Table:** A shadcn-style table with columns for: Name, Type, Size, and Action.
   - **Empty State:** If no files exist, show a "No files in the vault" illustration or text.
   - **Download Button:** Use a 'Secondary' or 'Ghost' button style with a Lucide 'Download' icon.

4. **Admin Management Section:**
   - Conditional Render: Only show if the session user is the admin (Arga).
   - Display "Pending Students" in a card.
   - "Approve" button: Primary color (Slate-900) that calls `/admin/approve`.

## Technical Execution
- Use `hono/jsx` and `hono/jsx/dom` for components.
- Implement a `renderer.tsx` to handle the HTML boilerplate (Head, Meta, Scripts).
- All interactions (Login, Approve, Download) must use `fetch` with `credentials: 'include'` to handle the cookies we set up in Milestone 6.

## Documentation
- Log the completed routes and component structure in `agent_log/Milestone8_Frontend_MVP.md`.