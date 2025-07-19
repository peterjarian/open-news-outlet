import { AdminPageContainer } from '@/components/admin/container';
import { AdminPageHeader, AdminPageHeaderContent } from '@/components/admin/page-header';
import { createBreadcrumb } from '@/components/ui/breadcrumb';
import InviteUserDialog from './_components/invite-user-dialog';
import { PageClient } from './page-client';
import { db } from '@/lib/drizzle';
import { userTable } from '@/lib/drizzle/schema';

export default async function Page() {
  const users = await db.select().from(userTable);

  return (
    <>
      <AdminPageHeader>
        <AdminPageHeaderContent>
          {createBreadcrumb([{ label: 'Users', isCurrent: true }])}
          <InviteUserDialog />
        </AdminPageHeaderContent>
      </AdminPageHeader>
      <AdminPageContainer>
        <PageClient users={users} />
      </AdminPageContainer>
    </>
  );
}
