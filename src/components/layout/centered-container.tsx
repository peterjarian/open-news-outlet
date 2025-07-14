import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

export function CenteredContainer({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex min-h-screen flex-col items-center justify-center text-center',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
