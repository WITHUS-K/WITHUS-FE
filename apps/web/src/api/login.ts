// src/api/login.ts
import { LoginRequest, LoginPayload } from '@web/types/auth';
import { api } from './api';
import { setCookie } from 'cookies-next';

export async function login(data: LoginRequest): Promise<LoginPayload> {
  const response = await api.post('api/v1/auth/login', {
    body: JSON.stringify(data),
  });

  // 토큰 세팅
  const authHeader = response.headers.get('authorization') ?? '';
  const accessToken = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : authHeader;
  const refreshToken = response.headers.get('refresh-token') ?? '';
  setCookie('accessToken', accessToken, { path: '/' });
  setCookie('refreshToken', refreshToken, { path: '/' });

  // JSON 파싱
  const json = (await response.json()) as {
    code: number;
    message: string;
    result: {
      userId: number;
      name: string;
      profileImageUrl: string | null;
      userOrganizationRoles: LoginPayload['userOrganizationRoles'];
      userOrganizations: Array<{ organizationId: number; [k: string]: any }>;
    };
    success: boolean;
  };

  const orgId = json.result.userOrganizations[0]?.organizationId;
  if (orgId != null) {
    setCookie('organizationId', String(orgId), { path: '/' });
  }

  // result 안에서 필요한 값만 꺼내서 플랫하게 리턴
  return {
    userId: json.result.userId,
    name: json.result.name,
    profileImageUrl: json.result.profileImageUrl,
    userOrganizationRoles: json.result.userOrganizationRoles,
    userOrganizations: json.result.userOrganizations.map((u) => ({
      organizationId: u.organizationId,
    })),
  };
}
