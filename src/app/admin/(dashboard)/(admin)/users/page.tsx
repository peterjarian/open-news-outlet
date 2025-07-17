import { AdminPageContainer } from '@/components/admin/container';
import { AdminPageHeader, AdminPageHeaderContent } from '@/components/admin/page-header';
import { createBreadcrumb } from '@/components/ui/breadcrumb';
import InviteUserDialog from './_components/invite-user-dialog';

export default async function Page() {
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
