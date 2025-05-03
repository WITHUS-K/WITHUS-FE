'use client';

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { AdminJoinRequest } from '@web/types/auth';
import type { HTTPError } from 'ky';

import { POST_PUBLIC } from '@web/api/fetchPublic';

export function useAdminJoinMutation(): UseMutationResult<
  void,
  HTTPError,
  AdminJoinRequest
> {
  const router = useRouter();

  return useMutation<void, HTTPError, AdminJoinRequest>({
    mutationFn: async (data) => {
      const res = await POST_PUBLIC<void>('api/v1/users/join/admin', data);
      //console.log('회원가입', res);
      return res.result;
    },

    onSuccess: (_, { name }) => {
      router.push(`/join/4?${new URLSearchParams({ type: 'admin', name })}`);
    },

    onError: (error) => {
      //console.error('[Admin Join] 실패:', error);
    },
  });
}
