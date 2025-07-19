'use client';

import { AdminPageContainer } from '@/components/admin/container';
import { AdminPageHeader, AdminPageHeaderContent } from '@/components/admin/page-header';
import { createBreadcrumb } from '@/components/ui/breadcrumb';
import { useForm } from 'react-hook-form';
import { PersonalInformation } from './_components/personal-information';
import { ProfileImage } from './_components/profile-image';
import { UpdateUserData, updateUserSchema } from '@/schemas/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@/hooks/use-user';
import { updateUser } from '@/actions/users';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { Save } from 'lucide-react';
import { Form } from '@/components/ui/form';

export default function Page() {
  const { user, setUser } = useUser();
  const [savingUser, setSavingUser] = useState(false);

  const form = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      bylineName: user.bylineName ?? undefined,
      image: undefined,
      isPublicProfile: user.isPublicProfile,
    },
  });

  const { isDirty } = form.formState;

  useEffect(() => {
    if (!isDirty && savingUser) {
      setSavingUser(false);
    }
  }, [isDirty, savingUser]);

  async function handleUserSave(data: UpdateUserData) {
    setSavingUser(true);

    const res = await updateUser(user.id, data);

    if (res.error) {
      toast.error(res.error);
      setSavingUser(false);
      return;
    }

    toast.success('Updates saved!');

    const updatedUser = {
      ...user,
      bylineName: data.bylineName ?? null,
      isPublicProfile: data.isPublicProfile ?? user.isPublicProfile,
      image: res.data?.image !== undefined ? res.data.image : user.image,
    };

    setUser(updatedUser);

    form.reset(data);
  }

  return (
    <>
      <AdminPageHeader className="space-x-2">
        <AdminPageHeaderContent>
          {createBreadcrumb([{ label: 'Profile', isCurrent: true }])}
          <Button
            size="sm"
            disabled={!isDirty || savingUser}
            onClick={form.handleSubmit(handleUserSave)}
          >
            {savingUser ? (
              <LoadingSpinner />
            ) : (
              <>
                <Save />
                <span>Save</span>
              </>
            )}
          </Button>
        </AdminPageHeaderContent>
      </AdminPageHeader>
      <AdminPageContainer>
        <Form {...form}>
          <div className="space-y-4 md:space-y-6">
            <ProfileImage />
            <PersonalInformation />
          </div>
        </Form>
      </AdminPageContainer>
    </>
  );
}
