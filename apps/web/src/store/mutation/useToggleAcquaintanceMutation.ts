import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PATCH } from '@web/api/fetch';
import { queryKeys } from '../constants';

// 응답 타입 정의
export interface AcquaintanceToggleResponse {
  code: number;
  message: string;
  result: {
    acquainted: boolean;
  };
  success: boolean;
}

/**
 * useToggleAcquaintanceMutation
 *
 * @param applicationId 토글할 지원서 ID
 * @returns {mutate, isLoading, isError, data}
 */
export function useToggleAcquaintanceMutation(applicationId: number) {
  const qc = useQueryClient();

  return useMutation<boolean, Error, void>({
    mutationFn: async () => {
      const res = await PATCH<AcquaintanceToggleResponse['result']>(
        `api/v1/applications/${applicationId}/acquaintance`
      );
      console.log(res);
      return res.result.acquainted;
    },
    onSuccess: () => {
      // 변경된 부분: object로 감싸서 queryKey 프로퍼티로 전달
      qc.invalidateQueries({
        queryKey: queryKeys.applications.detail(applicationId),
      });
    },
  });
}
