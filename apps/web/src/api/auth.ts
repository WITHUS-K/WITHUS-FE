import { api } from './api';
import { Tokens } from './types';
import { setCookie } from 'cookies-next';

/**
 * Refresh-Token 헤더를 붙여 재발급 호출 → 응답 헤더에서 새 토큰을 읽어 쿠키에 저장
 */
export async function reissueTokens(tokens: Tokens): Promise<Tokens> {
  // 1) Refresh-Token 헤더 전달
  const response = await api.post('api/v1/auth/reissue', {
    headers: {
      'Refresh-Token': tokens.refreshToken ?? '',
    },
  });

  // 2) 응답 헤더에서 Access/Refresh 토큰 꺼내기
  const authorization = response.headers.get('authorization') ?? '';

  const newAccessToken = authorization.startsWith('Bearer ')
    ? authorization.slice(7)
    : authorization;

  const newRefreshToken = response.headers.get('refresh-token') ?? '';

  // 3) 쿠키에 저장 (브라우저 측)
  setCookie('accessToken', newAccessToken, { path: '/' });
  setCookie('refreshToken', newRefreshToken, { path: '/' });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}
