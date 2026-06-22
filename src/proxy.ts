import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Fix 412 Precondition Failed errors caused by stale ETag/If-None-Match headers
  // during client-side navigation in Next.js with RSC
  const ifNoneMatch = request.headers.get('if-none-match');
  const ifMatch = request.headers.get('if-match');

  // For RSC (React Server Components) requests, remove conditional headers
  // that can cause 412 responses when the build hash changes
  if (ifNoneMatch || ifMatch) {
    const rscHeader = request.headers.get('RSC');
    const nextRouterState = request.headers.get('Next-Router-State-Tree');
    const nextUrl = request.headers.get('Next-Url');

    // If this is a Next.js RSC navigation request with conditional headers,
    // we need to bypass the condition check
    if (rscHeader || nextRouterState || nextUrl) {
      // Create new headers without the conditional ones
      const requestHeaders = new Headers(request.headers);
      requestHeaders.delete('if-none-match');
      requestHeaders.delete('if-match');

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon\\.ico|images|uploads).*)',
    // Also match _next/data routes specifically
    '/_next/data/:path*',
  ],
};
