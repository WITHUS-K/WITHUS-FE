import { getCookie } from 'cookies-next';

function getCookieValue(key: string): string {
  const val = getCookie(key);
  if (Array.isArray(val)) return val[0];
  return typeof val === 'string' ? val : '';
}

function parseNumberCookie(key: string): number {
  const raw = getCookieValue(key);
  const n = parseInt(raw, 10);
  return Number.isNaN(n) ? 0 : n;
}

/**
 * @description client side에서 쿠키 가져오기
 */
export const getClientSideTokens = () => ({
  accessToken: getCookieValue('accessToken'),
  refreshToken: getCookieValue('refreshToken'),
  organizationId: parseNumberCookie('organizationId'),
  userId: parseNumberCookie('userId'),
  name: getCookieValue('name'),
});
