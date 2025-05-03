'use client';

import { useRouter } from 'next/navigation';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import type { HTTPError } from 'ky';
import { POST_PUBLIC } from '@web/api/fetchPublic';
import { EmailVerifyRequest } from '@web/types/auth';

/**
 * 이메일 인증번호 요청
 * onSuccess 시 자동으로 /password/verify 로 이동
 */
export function useEmailVerifyMutation(): UseMutationResult<
  string,
  HTTPError,
  EmailVerifyRequest
> {
  const router = useRouter();
  return useMutation<string, HTTPError, EmailVerifyRequest>({
    mutationFn: async ({ name, email }) => {
      //console.log('[EmailVerify] 요청 →', { name, email });
      const res = await POST_PUBLIC<string>('api/v1/auth/email/verify', {
        name,
        email,
      });
      //console.log('[EmailVerify] 응답 →', res);
      return res.result;
    },
    onSuccess: (result, { name, email }) => {
      //console.log('[EmailVerify] 성공:', result);
      router.push(
        `/password/verify?name=${encodeURIComponent(
          name
        )}&email=${encodeURIComponent(email)}`
      );
    },
    onError: (error) => {
      //console.error('[EmailVerify] 실패:', error);
    },
  });
}
