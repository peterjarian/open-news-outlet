'use client';

import { useState, useOptimistic, startTransition } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { UserProps } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { UserTableActions } from './_components/action-cell';
import { DeleteUserDialog } from './_components/delete-user-dialog';
import { EditUserNameDialog } from './_components/edit-name-dialog';
import { deleteUser, updateUser } from '@/actions/users';
import { z } from 'zod';
import { toast } from 'sonner';
import { UpdateUserData } from '@/schemas/users';

export type PageClientProps = {
  users: UserProps[];
};

export type ColumnUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  optimistic?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
});

export function PageClient({ users: initialUsers }: PageClientProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ColumnUser | null>(null);

  const [currentUsers, setCurrentUsers] = useState<ColumnUser[]>(
    initialUsers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role!,
    })),
  );

  const [optimisticUsers, addOptimisticUser] = useOptimistic(
    currentUsers,
    (currentState, payload: { type: 'delete' | 'update'; user: ColumnUser; newName?: string }) => {
      if (payload.type === 'delete') {
        return currentState.filter((user) => user.id !== payload.user.id);
      } else if (payload.type === 'update') {
        return currentState.map((user) =>
          user.id === payload.user.id
            ? { ...user, name: payload.newName!, optimistic: true }
            : user,
        );
      }
      return currentState;
    },
  );

  function handleDeleteClick(user: ColumnUser) {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  }

  function handleEditClick(user: ColumnUser) {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  }

  async function confirmDelete() {
    if (!selectedUser) return;

    setIsDeleteDialogOpen(false);

    startTransition(() => {
      addOptimisticUser({ type: 'delete', user: selectedUser });
    });

    const userIdToDelete = selectedUser.id;

    startTransition(async () => {
      const result = await deleteUser(userIdToDelete);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`User deleted!`);
        setCurrentUsers((prevUsers) => prevUsers.filter((u) => u.id !== userIdToDelete));
      }
      setSelectedUser(null);
    });
  }

  async function handleSaveUserName(values: UpdateUserData) {
    if (!selectedUser || !values.name) return;

    setIsEditDialogOpen(false);
    const userIdToUpdate = selectedUser.id;
    const originalName = selectedUser.name;
    const newName = values.name;

    startTransition(() => {
      addOptimisticUser({ type: 'update', user: selectedUser, newName: newName });
    });

    startTransition(async () => {
      const result = await updateUser(userIdToUpdate, { name: newName });

      if (result.error) {
        toast.error(result.error);
        startTransition(() => {
          addOptimisticUser({ type: 'update', user: selectedUser, newName: originalName });
        });
      } else {
        toast.success('User updated!');
        setCurrentUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === userIdToUpdate ? { ...u, name: newName } : u)),
        );
      }
      setSelectedUser(null);
    });
  }

  const columns: ColumnDef<ColumnUser>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => {
        const user = row.original;
        return <span>{user.name}</span>;
      },
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => {
        const role = row.original.role;
        return <span className="capitalize">{role}</span>;
      },
    },
    {
      id: 'action',
      cell: ({ row }) => {
        const user = row.original;
        const isDisabled = user.optimistic;
        return (
          <UserTableActions
            user={user}
            onDelete={handleDeleteClick}
            onEdit={handleEditClick}
            isDisabled={isDisabled!}
          />
        );
      },
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={optimisticUsers} />

      <DeleteUserDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        userToDelete={selectedUser}
        onConfirmDelete={confirmDelete}
      />

      <EditUserNameDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        userToEdit={selectedUser}
        onSave={handleSaveUserName}
      />
    </>
  );
}
