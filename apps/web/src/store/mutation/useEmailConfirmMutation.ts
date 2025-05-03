'use client';

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import type { HTTPError } from 'ky';
import { POST_PUBLIC } from '@web/api/fetchPublic';
import { EmailConfirmRequest } from '@web/types/auth';

/**
 * 이메일 인증번호 확인
 */
export function useEmailConfirmMutation(): UseMutationResult<
  string,
  HTTPError,
  EmailConfirmRequest
> {
  return useMutation<string, HTTPError, EmailConfirmRequest>({
    mutationFn: async ({ email, code }) => {
      //console.log('[EmailConfirm] 요청 →', { email, code });
      const res = await POST_PUBLIC<string>('api/v1/auth/email/confirm', {
        email,
        code,
      });
      //console.log('[EmailConfirm] 응답 →', res);
      return res.result;
    },
    onSuccess: (result) => {
      //console.log('[EmailConfirm] 성공:', result);
    },
    onError: (error) => {
      //console.error('[EmailConfirm] 실패:', error);
    },
  });
}
