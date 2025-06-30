import { cookies } from 'next/headers';

/**
서버에서 쿠키 가져오기
 */
export type ServerSideContext = {
  accessToken: string;
  refreshToken: string;
  organizationId?: number;
};

export const getServerSideTokens = async (): Promise<ServerSideContext> => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value ?? '';
  const refreshToken = cookieStore.get('refreshToken')?.value ?? '';

  // organizationId 쿠키 읽기
  const orgIdCookie = cookieStore.get('organizationId')?.value;
  const organizationId = orgIdCookie
    ? parseInt(orgIdCookie, 10) // radix는 10
    : undefined;

  return { accessToken, refreshToken, organizationId };
};
