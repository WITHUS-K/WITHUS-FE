'use client';

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import type { HTTPError } from 'ky';
import { POST_PUBLIC } from '@web/api/fetchPublic';

export function usePhoneVerifyMutation(): UseMutationResult<
  string,
  HTTPError,
  string
> {
  return useMutation<string, HTTPError, string>({
    mutationFn: async (phoneNumber) => {
      //console.log('[PhoneVerify] 요청:', phoneNumber);
      const res = await POST_PUBLIC<string>('api/v1/auth/phone/verify', {
        phoneNumber,
      });
      //console.log('[PhoneVerify] 응답:', res);
      return res.result;
    },
    onSuccess: (message) => {
      //console.log('[PhoneVerify] 성공, message =', message);
    },
    onError: (error) => {
      //console.error('[PhoneVerify] 실패:', error);
    },
  });
}
