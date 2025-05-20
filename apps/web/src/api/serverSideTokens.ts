import { cookies } from 'next/headers';

/**
서버에서 쿠키 가져오기
 */
export const getServerSideTokens = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  console.log('[SSR] accessToken:', accessToken);

  return {
    accessToken: cookieStore.get('accessToken')?.value ?? '',
    refreshToken: cookieStore.get('refreshToken')?.value ?? '',
  };
};
