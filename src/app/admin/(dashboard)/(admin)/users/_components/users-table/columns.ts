import { userTable } from '@/lib/drizzle/schema';
import { ColumnDef } from '@tanstack/react-table';
import { InferSelectModel } from 'drizzle-orm';
import { format } from 'date-fns';

type User = InferSelectModel<typeof userTable>;

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'createdAt',
    header: 'Registered on',
    accessorFn: (row) => {
      return format(new Date(row.createdAt), 'MMM d, yyyy h:mm a');
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    accessorFn: (row) => {
      switch (row.role) {
        case 'admin':
          return 'Admin';
        case 'user':
          return 'User';
        default:
          return 'Unknown';
      }
    },
  },
];
