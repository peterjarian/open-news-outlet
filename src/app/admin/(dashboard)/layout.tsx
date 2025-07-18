import { headers, cookies as nextCookies } from 'next/headers';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { ReactNode } from 'react';
import { AdminSidebar } from './_components/sidebar';
import { auth } from '@/lib/auth';
import { tryCatch } from '@/lib/try-catch';
import { userTable } from '@/lib/drizzle/schema';
import { db } from '@/lib/drizzle';
import { eq } from 'drizzle-orm';
import { UserProvider } from '@/providers/user';

type AdminLayoutProps = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const cookies = await nextCookies();
  const defaultOpen = cookies.get('sidebar_state')?.value === 'true';

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
      <SidebarProvider defaultOpen={defaultOpen}>
        <AdminSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </UserProvider>
  );
}
