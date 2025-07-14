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
import { FileText, Newspaper, LogOut, LucideIcon, Pencil } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { env } from '@/env';
import { HoverPrefetchLink } from '@/components/common/hover-prefetch-link';

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
  groups: SidebarGroup[];
  separator?: boolean;
  footer: MenuItem[];
};

const sidebarData: SidebarStructure = {
  groups: [
    {
      label: 'Content',
      items: [
        {
          title: 'Articles',
          href: '/admin/dashboard/articles',
          icon: FileText,
        },
        {
          title: 'Editor',
          href: '/admin/dashboard/editor',
          icon: Pencil,
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
      <SidebarHeader className="flex h-16 flex-row items-center border-b px-4">
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
                        <HoverPrefetchLink href={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </HoverPrefetchLink>
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
