const host =
  typeof window !== 'undefined'
    ? window.location.hostname
    : process.env.NEXT_PUBLIC_HOSTNAME;

const isProd =
  process.env.NODE_ENV === 'production' &&
  process.env.VERCEL_ENV === 'production';

const cookieDomain =
  host && host.endsWith('recruit-withus.co.kr')
    ? '.recruit-withus.co.kr'
    : undefined;

export const cookieOptions = {
  path: '/',
  sameSite: 'lax' as const,
  secure: isProd,
  ...(cookieDomain ? { domain: cookieDomain } : {}),
};
