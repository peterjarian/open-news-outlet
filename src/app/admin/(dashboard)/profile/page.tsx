import { UserProvider } from '@/providers/user';
import PageClient from './page-client';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { db } from '@/lib/drizzle';
import { userTable } from '@/lib/drizzle/schema';
import { eq } from 'drizzle-orm';
import { tryCatch } from '@/lib/try-catch';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  const { data: users, error } = await tryCatch(
    db.select().from(userTable).where(eq(userTable.id, session.user.id)).limit(1),
  );

  if (error || !users[0]) {
    console.log('[PROFILE] Failed to fetch user data:', error);
    return null;
  }

  return (
    <UserProvider initialUser={users[0]}>
      <PageClient />
    </UserProvider>
  );
}
