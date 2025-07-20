'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Image,
  Users,
  User,
  LogOut,
  ChevronUp,
  SunMoon,
  CircleUser,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import clsx from 'clsx';
import { authClient } from '@/lib/auth/client';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';
import { HoverPrefetchLink } from '@/components/common/hover-prefetch-link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useUserProvider } from '@/hooks/users/use-user-provider';
import { getAvatarPlaceholder } from '@/lib/utils';

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user } = useUserProvider();
  const { setTheme, theme } = useTheme();

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
    ...(user.role === 'admin'
      ? [
          {
            title: 'Admin',
            items: [
              {
                title: 'Users',
                url: '/admin/users',
                icon: Users,
              },
            ],
          },
        ]
      : []),
    {
      title: 'Account',
      items: [
        {
          title: 'Profile',
          url: '/admin/profile',
          icon: CircleUser,
        },
      ],
    },
  ];

  async function handleSignOut() {
    const res = await authClient.signOut();
    if (res.error) return toast.success(res.error.message);
    router.push('/');
    router.refresh();
  }

  return (
    <Sidebar>
      <SidebarHeader className="flex h-16 items-center border-b px-4" />
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <HoverPrefetchLink
                        href={item.url}
                        className={pathname === item.url ? 'bg-accent text-accent-foreground' : ''}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </HoverPrefetchLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t p-2">
        <DropdownMenu open={userMenuOpen} onOpenChange={setUserMenuOpen}>
          <DropdownMenuTrigger asChild>
            <button className="hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-3 rounded-lg p-2 text-left">
              <div className="flex h-8 w-8 items-center justify-center rounded-full">
                <Avatar className="ring-border h-8 w-8 ring-1" key={user.image || 'no-image'}>
                  {user.image ? (
                    <AvatarImage src={user.image} alt={user.name || user.email || 'User'} />
                  ) : null}
                  <AvatarFallback>{getAvatarPlaceholder(user.name)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="truncate text-sm font-medium">{user.name}</div>
                <div className="text-muted-foreground truncate text-xs">{user.email}</div>
              </div>
              <ChevronUp
                className={clsx(
                  'size-4 transition-transform duration-200',
                  userMenuOpen && 'rotate-180',
                )}
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem asChild>
              <HoverPrefetchLink href="/admin/profile">
                <User />
                Profile
              </HoverPrefetchLink>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="items-center">
                <SunMoon className="text-muted-foreground mr-2 h-4 w-4" />
                Theme
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                  <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
