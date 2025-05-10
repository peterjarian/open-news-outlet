import { auth } from '@/server/auth';
import { headers } from 'next/headers';
import { permanentRedirect } from 'next/navigation';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({ headers: await headers() });

    // if no session was found, we send the user to the sign up page
    if (!session) permanentRedirect('/sign-up');

    // redirect the user when their email is not verified
    if (!session.user.emailVerified) permanentRedirect('/verify-email');

    return <>{children}</>;
}
