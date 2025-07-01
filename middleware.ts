import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

const PUBLIC_PATHS = ['/', '/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;


  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      const signInUrl = request.nextUrl.clone();
      signInUrl.pathname = '/sign-in';
      signInUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(signInUrl);
    }
  } catch (error) {
    console.error('Session check failed:', error);
    // If session check fails, redirect to sign-in
    const signInUrl = request.nextUrl.clone();
    signInUrl.pathname = '/sign-in';
    signInUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth).*)'],
};
