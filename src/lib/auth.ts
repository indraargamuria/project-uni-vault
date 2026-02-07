
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema";

export const getAuth = (env: any) => {
    const db = drizzle(env.uni_vault_db, { schema });
    return betterAuth({
        database: drizzleAdapter(db, {
            provider: "sqlite",
            schema: {
                ...schema,
                user: schema.user,
                session: schema.session,
                account: schema.account,
                verification: schema.verification
            }
        }),
        emailAndPassword: {
            enabled: true
        },
        user: {
            additionalFields: {
                status: { type: "string", defaultValue: "pending" },
                role: { type: "string", defaultValue: "student" }
            }
        },
        baseURL: env.BETTER_AUTH_URL,
        // Adding admin approval logic? No, just fields here. Middleware handles approval.
    });
};
