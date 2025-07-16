import { cookies as nextCookies } from 'next/headers';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { ReactNode } from 'react';
import { AdminSidebar } from './_components/sidebar';

type AdminLayoutProps = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const cookies = await nextCookies();
  const defaultOpen = cookies.get('sidebar_state')?.value === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AdminSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
