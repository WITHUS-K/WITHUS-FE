'use client';

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import type { HTTPError } from 'ky';
import { useRouter } from 'next/navigation';
import { POST_PUBLIC } from '@web/api/fetchPublic';
import type { UserJoinRequest } from '@web/types/auth';

export function useUserJoinMutation(): UseMutationResult<
  void,
  HTTPError,
  UserJoinRequest
> {
  const router = useRouter();

  return useMutation<void, HTTPError, UserJoinRequest>({
    mutationFn: async (payload) => {
      //console.log('[UserJoin] 요청:', payload);
      const res = await POST_PUBLIC<string>('api/v1/users/join/user', payload);
      //console.log('[UserJoin] 응답:', res);
    },
    onSuccess: (_, variables) => {
      const params = new URLSearchParams({
        type: 'user',
        name: variables.name,
      }).toString();
      router.push(`/join/4?${params}`);
    },
    onError: (error) => {
      //console.error('[UserJoin] 실패:', error);
    },
  });
}
