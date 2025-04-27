import { cn } from '@/lib/utils';

interface SeparatorProps {
    orientation?: 'horizontal' | 'vertical';
    className?: string;
}

export default function Separator({ orientation = 'vertical', className }: SeparatorProps) {
    return (
        <div
            aria-hidden
            data-orientation={orientation}
            className={cn(
                // Horizontal: full width, 1px height
                'data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-6',
                // Vertical: 1px width, default height (can be overridden)
                'data-[orientation=vertical]:h-6 data-[orientation=vertical]:w-px',
                'bg-gray-300',
                className,
            )}
        />
    );
}
