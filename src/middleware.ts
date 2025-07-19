import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server';
import { betterFetch } from '@better-fetch/fetch';
import { auth } from './lib/auth';

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Because middelware runs in the edge runtime, we can't use the auth.api object
  // We need to fetch the session manually with a fetch libary.
  const { data: session } = await betterFetch<Session>('/api/auth/get-session', {
    baseURL: origin,
    headers: {
      cookie: request.headers.get('cookie') || '',
    },
  });

  if (session && pathname === '/admin/sign-in') {
    return NextResponse.redirect(new URL('/admin', origin));
  }

  if (!session && pathname !== '/admin/sign-in') {
    return NextResponse.redirect(new URL('/admin/sign-in', origin));
  }

  if (
    session &&
    session.user.role !== 'admin' &&
    (pathname === '/admin/users' || pathname === '/admin/settings')
  ) {
    return NextResponse.redirect(new URL('/admin', origin));
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    // Match all /admin routes (including sign-in)
    '/admin/:path*',
  ],
};
