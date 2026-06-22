import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Proxy (Next.js 16 replacement for middleware)
 * 
 * Fixes 412 Precondition Failed errors caused by stale ETags
 * during RSC (React Server Components) client-side navigation.
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl;

  // Only intercept _next/data requests that might have stale conditional headers
  if (url.pathname.startsWith('/_next/data/')) {
    const hasConditionalHeaders =
      request.headers.get('if-none-match') ||
      request.headers.get('if-match');

    if (hasConditionalHeaders) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.delete('if-none-match');
      requestHeaders.delete('if-match');

      return NextResponse.next({
        request: { headers: requestHeaders },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/_next/data/:path*'],
};
