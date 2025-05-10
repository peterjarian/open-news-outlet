import { cn } from '@/lib/utils';
import { LogoLink } from '../logo-link';

export interface CompactNavBarProps {
    className?: string;
}

export default function CompactNavBar({ className }: CompactNavBarProps) {
    return (
        <nav className={cn('flex h-16 items-center justify-between border px-4 md:px-6', className)}>
            <LogoLink />
        </nav>
    );
}
