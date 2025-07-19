'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical, Pencil, Trash } from 'lucide-react';
import { ColumnUser } from '../page-client';

type UserTableActionsProps = {
  user: ColumnUser;
  onDelete(user: ColumnUser): void;
  onEdit(user: ColumnUser): void;
  isDisabled: boolean;
};

export function UserTableActions({ user, onDelete, onEdit, isDisabled }: UserTableActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isDisabled}>
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onEdit(user)} disabled={isDisabled}>
          <Pencil className="mr-2 h-4 w-4" />
          Change name
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(user)} disabled={isDisabled}>
          <Trash className="mr-2 h-4 w-4" />
          Remove user
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
