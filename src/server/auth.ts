import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/server/db';
import 'server-only';

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        minPasswordLength: 8,
        maxPasswordLength: 20,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        sendResetPassword: async ({ user, url, token }, request) => {
            console.log(url);
        },
    },
    database: drizzleAdapter(db, {
        provider: 'pg',
    }),
});
