import { cn } from '@/lib/utils';
import { Image as LucideImage } from 'lucide-react';
import type { ReactNode } from 'react';

export function ImagePlaceholder({
  icon,
  size = 80,
  className = '',
  children,
}: {
  icon?: ReactNode;
  size?: number;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        'bg-secondary flex aspect-square w-full items-center justify-center',
        className,
      )}
    >
      {icon || <LucideImage className="text-muted-foreground" size={size} />}
      {children}
    </div>
  );
}
