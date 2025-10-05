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

const RESERVED_PREFIXES = [
  'api',
  '_next',
  'application-list',
  'apply-management',
  'docs-evaluation',
  'interview-evaluation',
  'interview-management',
  'organization',
  'profile',
  'favicon.ico',
];

const orgSlugBase = new RegExp(
  `^\\/(?!(${RESERVED_PREFIXES.join('|')}))(?:[^\\/]+)\\/(?:[^\\/]+)$`
);
const orgSlugMobileOnly = new RegExp(
  `^\\/(?!(${RESERVED_PREFIXES.join('|')}))(?:[^\\/]+)\\/(?:[^\\/]+)\\/mobile-only$`
);
const orgSlugSubmitted = new RegExp(
  `^\\/(?!(${RESERVED_PREFIXES.join('|')}))(?:[^\\/]+)\\/(?:[^\\/]+)\\/submitted(?:\\?.*)?$`
);
const orgSlugEnd = new RegExp(
  `^\\/(?!(${RESERVED_PREFIXES.join('|')}))(?:[^\\/]+)\\/(?:[^\\/]+)\\/end$`
);

const publicPathPatterns = [
  // 회원가입 스텝들 (type 파라미터 포함)
  /^\/join\/[1-4](\?type=(user|admin))?$/,
  /^\/join\/3\/club-search(\?.*)?$/,
  // 루트 레벨 공개 URL
  orgSlugBase,
  orgSlugMobileOnly,
  orgSlugSubmitted,
  orgSlugEnd,
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 정적 파일 및 API 요청은 스킵
  if (
    pathname.startsWith('/_next/') ||
    pathname.includes('/api/') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // 공개 경로 체크
  const isPublic =
    publicPaths.includes(pathname) ||
    publicPathPatterns.some((re) => re.test(pathname));

  if (isPublic) {
    return NextResponse.next();
  }

  // 보호 경로 → 토큰 없으면 로그인으로 리다이렉트
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
