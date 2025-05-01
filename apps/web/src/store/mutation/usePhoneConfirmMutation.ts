'use client';

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import type { HTTPError } from 'ky';
import { POST_PUBLIC } from '@web/api/fetchPublic';
import { PhoneConfirmParams } from '@web/types/auth';

export function usePhoneConfirmMutation(): UseMutationResult<
  string,
  HTTPError,
  PhoneConfirmParams
> {
  return useMutation<string, HTTPError, PhoneConfirmParams>({
    mutationFn: async ({ phoneNumber, code }) => {
      console.log('[PhoneConfirm] 요청:', { phoneNumber, code });
      const res = await POST_PUBLIC<string>('api/v1/auth/phone/confirm', {
        phoneNumber,
        code,
      });
      console.log('[PhoneConfirm] 응답:', res);
      return res.result;
    },
    onSuccess: (message) => {
      console.log('[PhoneConfirm] 성공, message =', message);
    },
    onError: (error) => {
      console.error('[PhoneConfirm] 실패:', error);
    },
  });
}
