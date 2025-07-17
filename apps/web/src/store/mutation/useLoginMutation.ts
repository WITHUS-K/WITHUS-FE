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
  LoginPayload,
  HTTPError,
  LoginRequest
> {
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);

  return useMutation<LoginPayload, HTTPError, LoginRequest>({
    mutationFn: login,
    onSuccess: (data) => {
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

      router.push(ROUTES.HOME);
    },
  });
}
