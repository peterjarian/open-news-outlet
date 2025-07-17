'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { LayoutDashboard, FileText, FolderOpen, Image, Users, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';

const menuItems = [
  {
    title: 'Dashboard',
    items: [
      {
        title: 'Overview',
        url: '/admin',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: 'Content',
    items: [
      {
        title: 'Articles',
        url: '/admin/articles',
        icon: FileText,
      },
      {
        title: 'Categories',
        url: '/admin/categories',
        icon: FolderOpen,
      },
      {
        title: 'Media',
        url: '/admin/media',
        icon: Image,
      },
    ],
  },
  {
    title: 'Admin',
    items: [
      {
        title: 'Users',
        url: '/admin/users',
        icon: Users,
      },
      {
        title: 'Settings',
        url: '/admin/settings',
        icon: Settings,
      },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="flex h-16 items-center border-b px-4"></SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className={pathname === item.url ? 'bg-accent text-accent-foreground' : ''}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
