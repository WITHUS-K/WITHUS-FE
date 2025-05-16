import { LoginRequest } from '@web/types/auth';
import { api } from './api';
import { setCookie } from 'cookies-next';

export async function login(data: LoginRequest): Promise<void> {
  const response = await api.post('api/v1/auth/login', {
    body: JSON.stringify(data),
  });

  const authHeader = response.headers.get('authorization') ?? '';
  const accessToken = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : authHeader;
  const refreshToken = response.headers.get('refresh-token') ?? '';
  console.log(response);
  /*console.log('🗒 전체 헤더', Object.fromEntries(response.headers.entries()));
  console.log('토큰-access', accessToken);
  console.log('토큰-refresh', refreshToken);*/

  setCookie('accessToken', accessToken, { path: '/' });
  setCookie('refreshToken', refreshToken, { path: '/' });
}
