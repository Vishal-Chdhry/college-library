import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith('/admin') &&
      req.nextauth.token?.role != 'admin'
    )
      return NextResponse.rewrite(new URL('/auth/signin', req.url));
    if (
      req.nextUrl.pathname.startsWith('/user') &&
      req.nextauth.token?.role != 'user'
    )
      return NextResponse.rewrite(new URL('/auth/signin', req.url));
  },
  {
    callbacks: { authorized: ({ token }) => !!token }
  }
);
export const config = {
  matcher: []
  // matcher: ['/admin/:path*', '/user/:path*']
};
