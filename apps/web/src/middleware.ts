import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from './routes';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 정적 파일 요청은 미들웨어를 건너뛰도록 함
  if (
    pathname.startsWith('/_next/') ||
    pathname.includes('/api/') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const isPublicPath =
    pathname === ROUTES.LOGIN ||
    pathname === ROUTES.JOIN.BASE ||
    /^\/join\/[1-4](\?type=(user|admin))?$/.test(pathname) ||
    /^\/join\/3\/club-search(\?.*)?$/.test(pathname) ||
    pathname === ROUTES.PASSWORD.FIND ||
    pathname === ROUTES.PASSWORD.VERIFY ||
    pathname === ROUTES.PASSWORD.RESET ||
    pathname === ROUTES.PASSWORD.COMPLETE;

  if (isPublicPath) {
    return NextResponse.next();
  }
  const token = request.cookies.get('accessToken');

  if (!token) {
    const joinUrl = new URL(ROUTES.LOGIN, request.url);
    return NextResponse.redirect(joinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // 1) _next/api/static 파일 제외
    '/((?!_next/|api/|.*\\..*).*)',
    // 2) /join*, /password* 경로는 아예 미들웨어 스킵
    '/((?!join|password).*)',
  ],
};
