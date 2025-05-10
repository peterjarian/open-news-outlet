'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AuthForm, SubmitButton } from '../auth-form';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';

export const signInFormSchema = z.object({
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    password: z.string().refine((password) => password.trim().length > 0, {
        message: 'Password is required',
    }),
});

export interface SignInFormProps {
    onSubmit(values: z.infer<typeof signInFormSchema>): void;
    defaultEmail?: string;
    pending: boolean;
}

export function SignInForm({ onSubmit, defaultEmail, pending }: SignInFormProps) {
    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: defaultEmail || '',
            password: '',
        },
    });

    useEffect(() => {
        if (defaultEmail) {
            form.setValue('email', defaultEmail);
            sessionStorage.removeItem('signInDefaultEmail'); // if the user refreshes the page there will be no default value
        }
    }, [defaultEmail, form]);

    return (
        <AuthForm<typeof signInFormSchema> onSubmit={onSubmit} form={form}>
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="john@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <SubmitButton pending={pending}>Sign in</SubmitButton>
        </AuthForm>
    );
}
