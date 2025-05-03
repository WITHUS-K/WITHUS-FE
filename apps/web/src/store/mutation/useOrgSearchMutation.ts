'use client';

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import type { HTTPError } from 'ky';
import { GET_PUBLIC } from '@web/api/fetchPublic';
import { Org } from '@web/types/auth';

export function useOrgSearchMutation(): UseMutationResult<
  Org[],
  HTTPError,
  string
> {
  return useMutation<Org[], HTTPError, string>({
    mutationFn: async (keyword) => {
      //console.log('[OrgSearch] 요청 키워드:', keyword);
      const res = await GET_PUBLIC<Org[]>('api/v1/organizations/search', {
        keyword,
      });
      //console.log('[OrgSearch] 응답 데이터:', res);
      return res.result;
    },
    onSuccess: (data) => {
      //console.log('[OrgSearch] 성공, 결과 개수 =', data.length);
    },
    onError: (error) => {
      //console.error('[OrgSearch] 실패:', error);
    },
  });
}
