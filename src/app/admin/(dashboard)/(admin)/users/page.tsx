import { AdminPageContainer } from '@/components/admin/container';
import { AdminPageHeader, AdminPageHeaderContent } from '@/components/admin/page-header';
import { createBreadcrumb } from '@/components/ui/breadcrumb';
import InviteUserDialog from './_components/invite-user-dialog';
import { UsersTable } from './_components/users-table';
import { db } from '@/lib/drizzle';
import { userTable } from '@/lib/drizzle/schema';
import { parseAsInteger, createLoader, SearchParams } from 'nuqs/server';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const USERS_PER_PAGE = 10;

const paginationSearchParams = {
  page: parseAsInteger.withDefault(1),
};

const loadSearchParams = createLoader(paginationSearchParams);

export default async function Page({ searchParams }: PageProps) {
  const { page } = await loadSearchParams(searchParams);

  const users = await db
    .select()
    .from(userTable)
    .limit(USERS_PER_PAGE)
    .offset((page - 1) * USERS_PER_PAGE);

  return (
    <>
      <AdminPageHeader>
        <AdminPageHeaderContent>
          {createBreadcrumb([{ label: 'Users', isCurrent: true }])}
          <InviteUserDialog />
        </AdminPageHeaderContent>
      </AdminPageHeader>
      <AdminPageContainer>
        <h1 className="mb-6 text-2xl font-semibold md:text-3xl">Users</h1>
        <UsersTable users={users} />
      </AdminPageContainer>
    </>
  );
}
