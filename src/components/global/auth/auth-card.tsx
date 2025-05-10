import { Card, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import React from 'react';
import { cn } from '@/lib/utils';

export function AuthCard({ children, className }: { children: React.ReactNode; className?: string }) {
    return <Card className={cn('w-full max-w-96', className)}>{children}</Card>;
}

export function AuthCardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
    return <CardTitle className={cn('text-xl', className)}>{children}</CardTitle>;
}

export function AuthCardDescription({ children, className }: { children: string; className?: string }) {
    return <CardDescription className={cn('text-red-500', className)}>{children}</CardDescription>;
}

export function AuthCardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <CardFooter className={cn('justify-center space-x-4 text-center text-sm', className)}>{children}</CardFooter>
    );
}
