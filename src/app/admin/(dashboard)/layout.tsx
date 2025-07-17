import { headers, cookies as nextCookies } from 'next/headers';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { ReactNode } from 'react';
import { AdminSidebar } from './_components/sidebar';
import { auth } from '@/lib/auth';

type AdminLayoutProps = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const cookies = await nextCookies();
  const defaultOpen = cookies.get('sidebar_state')?.value === 'true';

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AdminSidebar user={session!.user!} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
