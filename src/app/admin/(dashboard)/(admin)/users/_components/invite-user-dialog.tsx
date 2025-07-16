'use client';

import { inviteUser } from '@/actions/auth';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InviteUserData, inviteUserSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function InviteUserDialog() {
  const [isPending, setIsPending] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<InviteUserData>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  async function handleInvite({ name, email }: InviteUserData) {
    setIsPending(true);

    const res = await inviteUser({ name, email });

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(res.data);
      setOpen(false);
      form.reset();
    }

    setIsPending(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus />
          <span>Invite</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            id="invite-user-form"
            onSubmit={form.handleSubmit(handleInvite)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="user@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="invite-user-form" disabled={isPending}>
            {isPending ? <LoadingSpinner /> : 'Invite'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
