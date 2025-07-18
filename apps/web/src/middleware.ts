import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from './routes';

const publicPaths: string[] = [
  ROUTES.LOGIN,
  ROUTES.JOIN.BASE,
  ROUTES.PASSWORD.FIND,
  ROUTES.PASSWORD.VERIFY,
  ROUTES.PASSWORD.RESET,
  ROUTES.PASSWORD.COMPLETE,
];

const publicPathPatterns = [
  /^\/join\/[1-4](\?type=(user|admin))?$/,
  /^\/join\/3\/club-search(\?.*)?$/,
  /^\/apply\/[^\/]+\/[^\/]+$/,
  /^\/apply\/[^\/]+\/[^\/]+\/mobile-only$/,
  /^\/apply\/[^\/]+\/[^\/]+\/submitted(\?.*)?$/,
  /^\/apply\/[^\/]+\/[^\/]+\/end$/,
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 정적 파일 및 API 요청은 미들웨어 스킵
  if (
    pathname.startsWith('/_next/') ||
    pathname.includes('/api/') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // 공개 경로 판별
  const isPublicPath =
    publicPaths.includes(pathname) ||
    publicPathPatterns.some((pattern) => pattern.test(pathname));

  if (isPublicPath) {
    return NextResponse.next();
  }

  // 보호된 경로: 토큰 없으면 로그인 페이지로 리다이렉트
  const token = request.cookies.get('accessToken');
  if (!token) {
    const loginUrl = new URL(ROUTES.LOGIN, request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // _next, api, static 파일 제외
    '/((?!_next/|api/|.*\\..*).*)',
    // join*, password* 경로 스킵
    '/((?!join|password).*)',
  ],
};
