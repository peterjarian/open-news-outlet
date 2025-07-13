import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { env } from '@/env';

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
    conn: Pool | undefined;
};

const conn =
    globalForDb.conn ??
    new Pool({
        connectionString: env.DATABASE_URL,
    });

if (env.NODE_ENV === 'production') globalForDb.conn = conn;

export const db = drizzle({
    client: conn,
    schema: {
        ...schema,
        verification: schema.verificationTable,
        account: schema.accountTable,
        session: schema.sessionTable,
        user: schema.userTable,
    },
});
