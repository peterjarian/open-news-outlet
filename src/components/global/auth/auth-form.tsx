'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { ClipLoader } from 'react-spinners';
import { cn } from '@/lib/utils';

export interface AuthFormProps<K extends Zod.AnyZodObject | Zod.ZodEffects<Zod.AnyZodObject>> {
    onSubmit(values: z.infer<K>): void;
    form: UseFormReturn<z.infer<K>>;
    children: React.ReactNode;
}

export function AuthForm<K extends Zod.AnyZodObject | Zod.ZodEffects<Zod.AnyZodObject>>({
    onSubmit,
    form,
    children,
}: AuthFormProps<K>) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {children}
            </form>
        </Form>
    );
}

export interface SubmitButtonProps {
    pending: boolean;
    children: string;
    className?: string;
}

export function SubmitButton({ children, className, pending }: SubmitButtonProps) {
    return (
        <Button disabled={pending} type="submit" className={cn('w-full', className)}>
            {pending && <ClipLoader size={20} color="var(--color-foreground-invert)" />}
            {children}
        </Button>
    );
}
