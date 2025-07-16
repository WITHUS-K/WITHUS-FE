import { LoginRequest, LoginPayload } from '@web/types/auth';
import { api } from './api';
import { setCookie } from 'cookies-next';
import { cookieOptions } from './authCookies';

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
  setCookie('accessToken', accessToken, cookieOptions);
  setCookie('refreshToken', refreshToken, cookieOptions);

  // JSON 파싱
  const json = (await response.json()) as {
    code: number;
    message: string;
    result: {
      userId: number;
      name: string;
      role: string;
      profileImageUrl: string | null;
      userOrganizationRoles: LoginPayload['userOrganizationRoles'];
      userOrganizations: Array<{ organizationId: number; [k: string]: any }>;
    };
    success: boolean;
  };

  console.log(json);
  const {
    userId,
    userOrganizations,
    name,
    profileImageUrl,
    role,
    userOrganizationRoles,
  } = json.result;

  const cookiesToSet: Record<string, unknown> = {
    userId,
    //organizations: userOrganizations,
    organizationId: userOrganizations?.[0]?.organizationId,
    name,
    profileImageUrl,
    role,
    position: userOrganizationRoles[0]?.roleName,
    part: userOrganizationRoles[1]?.roleName,
  };

  Object.entries(cookiesToSet).forEach(([key, value]) => {
    if (value != null) {
      const stringValue =
        typeof value === 'string' ? value : JSON.stringify(value);
      setCookie(key, stringValue, cookieOptions);
    }
  });

  // result 안에서 필요한 값만 꺼내서 플랫하게 리턴
  return {
    userId: json.result.userId,
    name: json.result.name,
    role: json.result.role,
    profileImageUrl: json.result.profileImageUrl,
    userOrganizationRoles: json.result.userOrganizationRoles,
    userOrganizations: json.result.userOrganizations.map((u) => ({
      organizationId: u.organizationId,
    })),
  };
}
