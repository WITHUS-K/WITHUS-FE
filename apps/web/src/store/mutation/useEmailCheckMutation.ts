'use client';

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import type { HTTPError } from 'ky';
import { GET_PUBLIC } from '@web/api/fetchPublic';
import { EmailCheckResult } from '@web/types/auth';

export function useEmailCheckMutation(): UseMutationResult<
  EmailCheckResult,
  HTTPError,
  string
> {
  return useMutation<EmailCheckResult, HTTPError, string>({
    mutationFn: async (email) => {
      //console.log('[EmailCheck] 요청:', email);
      const res = await GET_PUBLIC<EmailCheckResult>(
        'api/v1/users/email/check',
        { email }
      );
      //console.log('[EmailCheck] 응답:', res);
      return res.result;
    },
    onSuccess: (result) => {
      //console.log('[EmailCheck] 성공, isDuplicated =', result.isDuplicated);
    },
    onError: (error) => {
      //console.error('[EmailCheck] 실패:', error);
    },
  });
}
