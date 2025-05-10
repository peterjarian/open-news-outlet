'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AuthForm, SubmitButton } from '../auth-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export const signUpFormSchema = z
    .object({
        name: z.string().nonempty('Field is required'),
        email: z.string().nonempty('Field is required').email('Invalid email address.'),
        password: z
            .string()
            .nonempty('Field is required')
            .min(8, 'Password must be at least 8 characters')
            .max(128, 'Password must not exceed 128 characters'),
        confirmPassword: z.string().nonempty('Field is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export interface SignUpForm {
    onSubmit(values: z.infer<typeof signUpFormSchema>): void;
    pending: boolean;
}

export function SignUpForm({ onSubmit, pending }: SignUpForm) {
    const form = useForm<z.infer<typeof signUpFormSchema>>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    return (
        <AuthForm<typeof signUpFormSchema> onSubmit={onSubmit} form={form}>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
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
            <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirm password</FormLabel>
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
