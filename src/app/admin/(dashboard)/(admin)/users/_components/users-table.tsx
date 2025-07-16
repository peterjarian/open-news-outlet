'use client';

import { userTable } from '@/lib/drizzle/schema';
import { InferSelectModel } from 'drizzle-orm';
import { columns } from './users-table/columns';
import { DataTable } from '@/components/ui/data-table';

type User = InferSelectModel<typeof userTable>;

type UsersTableProps = {
  users: User[];
};

export function UsersTable({ users }: UsersTableProps) {
  return <DataTable columns={columns} data={users} />;
}
