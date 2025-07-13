import { getCookie } from 'cookies-next';

/**
 * @description client side에서 쿠키 가져오기
 */
export const getClientSideTokens = () => {
  return {
    accessToken: (getCookie('accessToken') as string) || '',
    refreshToken: (getCookie('refreshToken') as string) || '',
    organizationId: Number(getCookie('organizationId')) || 0,
  };
};
