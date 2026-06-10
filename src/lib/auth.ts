import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';

// Admin credentials (in production, store in database/env)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin123', 10);

const SESSION_SECRET = process.env.SESSION_SECRET || 'elite-limo-secret-key-2026';

export function verifyCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);
}

export function createSessionToken(): string {
  // Simple token generation - in production use JWT or similar
  const payload = {
    admin: true,
    iat: Date.now(),
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };
  // Base64 encode the payload with a signature
  const data = Buffer.from(JSON.stringify(payload)).toString('base64');
  const signature = Buffer.from(data + SESSION_SECRET).toString('base64');
  return `${data}.${signature}`;
}

export function verifySessionToken(token: string): boolean {
  try {
    const [data, signature] = token.split('.');
    if (!data || !signature) return false;

    // Verify signature
    const expectedSignature = Buffer.from(data + SESSION_SECRET).toString('base64');
    if (signature !== expectedSignature) return false;

    // Verify expiration
    const payload = JSON.parse(Buffer.from(data, 'base64').toString());
    if (payload.exp < Date.now()) return false;
    if (!payload.admin) return false;

    return true;
  } catch {
    return false;
  }
}

export function createSessionCookie(token: string): string {
  return serialize('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });
}

export function createLogoutCookie(): string {
  return serialize('admin_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: -1,
    path: '/',
  });
}

export function getSessionTokenFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;

  // Parse cookies properly - values may contain = signs
  const cookies: Record<string, string> = {};
  cookieHeader.split(';').forEach(c => {
    const trimmed = c.trim();
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex > 0) {
      const key = trimmed.substring(0, eqIndex);
      const val = decodeURIComponent(trimmed.substring(eqIndex + 1));
      cookies[key] = val;
    }
  });

  return cookies['admin_session'] || null;
}
