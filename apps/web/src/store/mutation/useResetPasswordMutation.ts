'use client';

import { useRouter } from 'next/navigation';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import type { HTTPError } from 'ky';
import { POST_PUBLIC } from '@web/api/fetchPublic';
import { ResetPasswordRequest } from '@web/types/auth';

/**
 * 비밀번호 재설정 요청
 * onSuccess 시 /password/complete 로 이동
 */
export function useResetPasswordMutation(): UseMutationResult<
  string,
  HTTPError,
  ResetPasswordRequest
> {
  const router = useRouter();
  return useMutation<string, HTTPError, ResetPasswordRequest>({
    mutationFn: async ({ email, newPassword }) => {
      //console.log('[ResetPassword] 요청 →', { email, newPassword });
      const res = await POST_PUBLIC<string>('api/v1/users/reset-password', {
        email,
        newPassword,
      });
      //console.log('[ResetPassword] 응답 →', res);
      return res.result;
    },
    onSuccess: (result, { email }) => {
      //console.log('[ResetPassword] 성공:', result);
      router.push(`/password/complete?name=${encodeURIComponent(email)}`);
    },
    onError: (error) => {
      //console.error('[ResetPassword] 실패:', error);
    },
  });
}
