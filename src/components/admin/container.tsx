import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

export function AdminPageContainer({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cn('gap-4 px-4 py-4 md:gap-6 md:py-6', className)} {...props}>
      {children}
    </div>
  );
}
