import { NextResponse } from 'next/server';
import { getSessionTokenFromRequest, verifySessionToken } from '@/lib/auth';

export async function GET(request: Request) {
  const token = getSessionTokenFromRequest(request);

  if (!token || !verifySessionToken(token)) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { authenticated: true },
    { status: 200 }
  );
}
