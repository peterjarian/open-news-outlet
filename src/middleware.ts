import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server';
import { betterFetch } from '@better-fetch/fetch';
import { auth } from './lib/auth';

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Because middelware runs in the edge runtime, we can't use the auth.api object
  // We need to fetch the session manually with a fetch libary.
  const { data } = await betterFetch<Session>('/api/auth/get-session', {
    baseURL: origin,
    headers: {
      cookie: request.headers.get('cookie') || '',
    },
  });

  if (data && pathname === '/admin/sign-in') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  if (!data && pathname !== '/admin/sign-in') {
    return NextResponse.redirect(new URL('/admin/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    // Match all /admin routes (including sign-in)
    '/admin/:path*',
  ],
};
