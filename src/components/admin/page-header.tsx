import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

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
      {children}
    </div>
  );
}

export function AdminPageHeaderTitle({ children, className, ...props }: ComponentProps<'h1'>) {
  return (
    <h1 className={cn('', className)} {...props}>
      {children}
    </h1>
  );
}
