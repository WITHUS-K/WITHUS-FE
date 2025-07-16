const isProd =
  process.env.NODE_ENV === 'production' &&
  process.env.VERCEL_ENV === 'production';

export const cookieOptions = {
  path: '/',
  sameSite: 'lax' as const,
  secure: isProd,
  ...(isProd
    ? { domain: '.recruit-withus.co.kr' } // 진짜 프로덕션 도메인일 때만
    : {}),
};
