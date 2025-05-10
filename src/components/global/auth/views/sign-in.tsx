'use client';

import { CardContent, CardHeader } from '@/components/ui/card';
import { AuthCard, AuthCardDescription, AuthCardFooter, AuthCardTitle } from '../auth-card';
import { useState } from 'react';
import { z } from 'zod';
import { SignInForm, signInFormSchema } from '../forms/sign-in';
import { authClient } from '@/client/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSessionStorage } from '@/hooks/use-session-storage';

export function SignIn() {
    const router = useRouter();
    const defaultEmail = useSessionStorage('signInDefaultEmail');

    const [error, setError] = useState<string>();
    const [pending, setPending] = useState(false);

    async function onSubmit({ email, password }: z.infer<typeof signInFormSchema>) {
        setPending(true);

        const { data, error } = await authClient.signIn.email({
            email,
            password,
            rememberMe: true,
        });

        if (error) {
            setError(error.message);
            return;
        }

        // the user should first verify their email before continueing
        if (!data.user.emailVerified) router.push('/verify-email');
        else router.push('/');
    }

    return (
        <AuthCard>
            <CardHeader>
                <AuthCardTitle>Sign in</AuthCardTitle>
                {error && <AuthCardDescription>{error}</AuthCardDescription>}
            </CardHeader>
            <CardContent>
                <SignInForm onSubmit={onSubmit} pending={pending} defaultEmail={defaultEmail || undefined} />
            </CardContent>
            <AuthCardFooter>
                Don&apos;t have an account?&nbsp;
                <Link className="hover:underline" href="/sign-up">
                    Sign up
                </Link>
            </AuthCardFooter>
        </AuthCard>
    );
}
