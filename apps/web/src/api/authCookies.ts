const isProd =
  process.env.NODE_ENV === 'production' &&
  process.env.VERCEL_ENV === 'production';

export const cookieOptions = {
  path: '/',
  sameSite: 'lax' as const,
  secure: isProd,
  /* ...(isProd
    ? { domain: 'www.recruit-withus.co.kr' } // ← 여기를 www로
    : {}),*/
};
