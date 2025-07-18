import { AdminPageContainer } from '@/components/admin/container';
import { AdminPageHeader, AdminPageHeaderContent } from '@/components/admin/page-header';
import { createBreadcrumb } from '@/components/ui/breadcrumb';
import InviteUserDialog from './_components/invite-user-dialog';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { unauthorized } from 'next/navigation';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== 'admin') return unauthorized();

  return (
    <>
      <AdminPageHeader>
        <AdminPageHeaderContent>
          {createBreadcrumb([{ label: 'Users', isCurrent: true }])}
          <InviteUserDialog />
        </AdminPageHeaderContent>
      </AdminPageHeader>
      <AdminPageContainer></AdminPageContainer>
    </>
  );
}
