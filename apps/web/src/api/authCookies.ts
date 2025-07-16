export const cookieOptions = {
  path: '/',
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  ...(process.env.NODE_ENV === 'production'
    ? { domain: '.recruit-withus.co.kr' }
    : {}),
};
