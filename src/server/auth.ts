import { betterAuth } from 'better-auth';
import { magicLink } from 'better-auth/plugins';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/server/db';
import 'server-only';

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true, // make sure users need to verify their email before signing in
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        sendResetPassword: async ({ user, url, token }, request) => {},
    },
    emailVerification: {
        sendOnSignUp: true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        sendVerificationEmail: async ({ user, url, token }, request) => {},
    },
    plugins: [
        magicLink({
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            sendMagicLink: async ({ email, token, url }, request) => {},
        }),
    ],
    database: drizzleAdapter(db, {
        provider: 'pg',
    }),
});
