import { env } from '@/env';
import { type Config } from 'drizzle-kit';

export default {
    schema: './src/lib/drizzle/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: env.DATABASE_URL,
    },
} satisfies Config;
