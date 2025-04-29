import { env } from '@/env';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
    baseURL: env.HTTP_HOST,
});
