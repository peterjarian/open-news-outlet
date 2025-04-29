'use client';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';

const logoLinkVariants = cva('font-semibold', {
    variants: {
        size: {
            sm: 'text-xl',
            md: 'text-2xl',
            lg: 'text-3xl',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

interface LogoLinkProps {
    className?: string;
}

export default function LogoLink({ size, className }: VariantProps<typeof logoLinkVariants> & LogoLinkProps) {
    return (
        <Link href="/" aria-label="Home" className={cn(logoLinkVariants({ size }), className)}>
            Open News Outlet
        </Link>
    );
}
