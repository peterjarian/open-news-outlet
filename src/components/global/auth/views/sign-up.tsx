'use client';

import { CardContent, CardHeader } from '@/components/ui/card';
import { AuthCard, AuthCardDescription, AuthCardFooter, AuthCardTitle } from '../auth-card';
import { SignUpForm, signUpFormSchema } from '../forms/sign-up';
import { z } from 'zod';
import { useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/client/auth';
import { useRouter } from 'next/navigation';

export function SignUp() {
    const router = useRouter();

    const [error, setError] = useState<string | null>(null);

    async function onSubmit({ name, email, password }: z.infer<typeof signUpFormSchema>) {
        await authClient.signUp.email(
            {
                name,
                email,
                password,
            },
            {
                onSuccess: () => {
                    // on success we send the user to the page to verify their email
                    router.push('/verify-email');
                },
                onError: ({ error }) => {
                    if (error.code === 'USER_ALREADY_EXISTS') {
                        // if the user already exists, we set the the current email in the session storage,
                        // and redirect to the sign-up page with the email as default value
                        sessionStorage.setItem('signInDefaultEmail', email);
                        router.push('/sign-in');
                        return;
                    }

                    setError(error.message);
                },
            },
        );
    }

    return (
        <AuthCard>
            <CardHeader>
                <AuthCardTitle>Sign up</AuthCardTitle>
                {error && <AuthCardDescription>{error}</AuthCardDescription>}
            </CardHeader>
            <CardContent>
                <SignUpForm onSubmit={onSubmit} />
            </CardContent>
            <AuthCardFooter>
                Already have an account?&nbsp;
                <Link className="hover:underline" href="/sign-in">
                    Sign in
                </Link>
            </AuthCardFooter>
        </AuthCard>
    );
}
