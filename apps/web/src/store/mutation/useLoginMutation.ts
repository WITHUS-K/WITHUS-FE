// 📦 src/store/mutation/useLoginMutation.ts
'use client';

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@web/routes';
import { login } from '@web/api/login';
import { LoginRequest, LoginPayload } from '@web/types/auth';
import { useUserStore } from '../state/userStore';

export function useLoginMutation(): UseMutationResult<
  LoginPayload, // 이제 정확한 반환 타입을 적어주면 더 좋습니다
  HTTPError,
  LoginRequest
> {
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);

  return useMutation<LoginPayload, HTTPError, LoginRequest>({
    mutationFn: login,
    onSuccess: (data) => {
      // 변경 전 ▶ const { userId, … } = data.result;
      // 변경 후 ▶ data 에서 바로 꺼내세요
      const {
        userId,
        name,
        role,
        profileImageUrl,
        userOrganizationRoles,
        userOrganizations,
      } = data;

      setUser({
        userId,
        organizationId: userOrganizations[0]?.organizationId ?? null,
        role,
        name,

        profileImageUrl,
        userOrganizationRoles,
      });

      // 홈으로 이동
      router.push(ROUTES.HOME);
    },
  });
}
