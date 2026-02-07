
# Uni-Vault

Uni-Vault is a secure, university document storage system built with modern web technologies. It allows students to manage their learning materials and provides administrators with approval workflows.

## Tech Stack

-   **Runtime**: [Cloudflare Workers](https://workers.cloudflare.com/) (Hono)
-   **Database**: [Cloudflare D1](https://developers.cloudflare.com/d1/) (SQLite)
-   **Storage**: [Cloudflare R2](https://developers.cloudflare.com/r2/)
-   **Authentication**: [Better Auth](https://better-auth.com/)
-   **Frontend**: Server-side rendered Hono JSX with [Tailwind CSS](https://tailwindcss.com/) (shadcn/ui style)
-   **ORM**: [Drizzle ORM](https://orm.drizzle.team/)

## Setup Instructions

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Variables**:
    Copy `.dev.vars.example` to `.dev.vars` and set your secrets:
    ```bash
    cp .dev.vars.example .dev.vars
    ```
    - `ADMIN_SECRET`: A strong secret key used for admin actions.
    - `BETTER_AUTH_SECRET`: Secret for Better Auth session management.

3.  **Local Development**:
    Start the local development server:
    ```bash
    npm run dev
    ```

4.  **Database Migration**:
    Apply migrations to the local D1 database:
    ```bash
    npx wrangler d1 migrations apply uni-vault-db --local
    ```

## Admin Approval Flow

New user registrations default to `pending` status. A user with the `admin` role must approve them before they can access the dashboard.

1.  **Register as Admin**: Sign up with your admin email (configured in code as `indraargaaa@gmail.com`).
2.  **Promote Self**: Use the dev route to promote yourself to admin (Local dev only):
    ```bash
    curl -X POST http://localhost:8787/dev/promote-admin
    ```
3.  **Approve Users**: Log in to the Dashboard. Pending users will appear in the Admin queue. Click "Approve" and enter the `ADMIN_SECRET` when prompted.

## Security

-   **Authentication**: Secure, HttpOnly cookies are used for session management.
-   **Authorization**: Role-based access control (Admin vs Student) and Status checks (Approved vs Pending) protect sensitive routes.
-   **Admin Secret**: Critical admin actions require verification via the `X-Admin-Secret` header.

## License

Private / Proprietary.
