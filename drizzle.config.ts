import { env } from '@/env';
import { type Config } from 'drizzle-kit';

export default {
    schema: './src/server/db/schema.ts',
    dialect: 'postgresql',
    tablesFilter: ['ono_*'],
    dbCredentials: {
        url: env.DATABASE_URL,
    },
} satisfies Config;
