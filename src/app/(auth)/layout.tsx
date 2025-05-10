import { CompactNavBar } from '@/components/global/nav-bar';
import { auth } from '@/server/auth';
import { headers } from 'next/headers';
import { permanentRedirect } from 'next/navigation';
import React from 'react';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session) {
        // the user should verify their email first
        if (!session.user.emailVerified) permanentRedirect('/verify-email');

        // if the user already has a session, we redirect to the account page
        permanentRedirect('/account');
    }

    return (
        <>
            <CompactNavBar className="fixed w-full" />
            <main className="flex h-screen items-center justify-center px-4 md:px-6">{children}</main>
        </>
    );
}
