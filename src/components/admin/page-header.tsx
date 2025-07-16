import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';
import { SidebarTrigger } from '../ui/sidebar';

export function AdminPageHeader({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex h-16 w-full items-center gap-2 border-b p-3 px-4',
        'container-breadcrumb',
        className,
      )}
      {...props}
    >
      <SidebarTrigger />
      {children}
    </div>
  );
}

export function AdminPageHeaderContent({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cn('flex w-full items-center justify-between', className)} {...props}>
      {children}
    </div>
  );
}
