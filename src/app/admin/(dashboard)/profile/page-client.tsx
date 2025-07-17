'use client';

import { AdminPageContainer } from '@/components/admin/container';
import { AdminPageHeader, AdminPageHeaderContent } from '@/components/admin/page-header';
import { createBreadcrumb } from '@/components/ui/breadcrumb';
import { FormProvider, useForm } from 'react-hook-form';
import { PersonalInformation } from './_components/personal-information';
import { ProfileImage } from './_components/profile-image';
import { SocialPlatforms } from './_components/social-platforms';
import { UpdateUserData, updateUserSchema } from '@/schemas/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@/hooks/use-user';

export default function PageClient() {
  const { user } = useUser();

  const methods = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name,
      bylineName: user.bylineName || '',
      image: user.image || '',
      isPublicProfile: false,
      socialPlatforms: [],
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: UpdateUserData) => {
    console.log('Form submitted:', data);
    // TODO: Implement actual form submission
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AdminPageHeader className="space-x-2">
          <AdminPageHeaderContent>
            {createBreadcrumb([{ label: 'Profile', isCurrent: true }])}
          </AdminPageHeaderContent>
        </AdminPageHeader>
        <AdminPageContainer>
          <div className="space-y-4 md:space-y-6">
            <ProfileImage />
            <PersonalInformation />
            <SocialPlatforms />
          </div>
        </AdminPageContainer>
      </form>
    </FormProvider>
  );
}
