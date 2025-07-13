import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { ReactNode } from 'react';
import { AdminSidebar } from './sidebar';

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
