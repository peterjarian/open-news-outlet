'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { FileText, Newspaper, LogOut, LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { env } from '@/env';

type SubMenuItem = {
  title: string;
  href: string;
};

type MenuItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  subItems?: SubMenuItem[];
};

type SidebarGroup = {
  label: string;
  items: MenuItem[];
};

type SidebarStructure = {
  header: {
    title: string;
    subtitle: string;
    icon: LucideIcon;
  };
  groups: SidebarGroup[];
  separator?: boolean;
  footer: MenuItem[];
};

const sidebarData: SidebarStructure = {
  header: {
    title: 'Newsroom',
    subtitle: env.NEXT_PUBLIC_BRAND_NAME,
    icon: Newspaper,
  },
  groups: [
    {
      label: 'Content',
      items: [
        {
          title: 'Articles',
          href: '/admin/dashboard/articles',
          icon: FileText,
        },
      ],
    },
  ],
  separator: true,
  footer: [
    {
      title: 'Sign Out',
      href: '/admin/logout',
      icon: LogOut,
    },
  ],
};

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="flex h-16 flex-row items-center border-b">
        <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
          <Newspaper className="size-4" />
        </div>
        <span className="font-semibold text-nowrap">{env.NEXT_PUBLIC_BRAND_NAME}</span>
      </SidebarHeader>

      <SidebarContent>
        {sidebarData.groups.map((group, groupIndex) => (
          <div key={group.label}>
            <SidebarGroup>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={pathname === item.href}>
                        <a href={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                      {item.subItems && (
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.href}>
                              <SidebarMenuSubButton asChild isActive={pathname === subItem.href}>
                                <a href={subItem.href}>{subItem.title}</a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            {groupIndex === sidebarData.groups.length - 2 && sidebarData.separator && (
              <SidebarSeparator />
            )}
          </div>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {sidebarData.footer.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <a href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
