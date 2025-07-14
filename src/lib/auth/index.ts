import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { magicLink } from 'better-auth/plugins';
import { resend } from '../resend';
import { db } from '../drizzle';
import { env } from '@/env';
import { nextCookies } from 'better-auth/next-js';
import { admin } from 'better-auth/plugins';

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    magicLink({
      disableSignUp: true,
      sendMagicLink: async ({ email, url }) => {
        const { error } = await resend.emails.send({
          from: env.RESEND_EMAIL,
          to: email,
          subject: `Login to ${env.NEXT_PUBLIC_BRAND_NAME}`,
          text: url,
        });

        if (error) {
          console.log('[AUTH] Magic link delivery failed:', error);
          return;
        }

        console.log('[AUTH] Magic link delivered');
      },
    }),
    nextCookies(),
    admin(),
  ],
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
});
