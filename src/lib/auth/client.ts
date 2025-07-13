import { env } from '@/env';
import { createAuthClient } from 'better-auth/react';
import { magicLinkClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
    baseURL: env.NEXT_PUBLIC_BASE_URL,
    plugins: [magicLinkClient()],
});
