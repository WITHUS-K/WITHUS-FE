'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DELETE } from '@web/api/fetch';
import type { DeleteRecruitmentResponse } from '@web/types/recruitment';
import { queryKeys } from '@web/store/constants/queryKeys';

export function useDeleteRecruitmentMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (recruitmentId: number) => {
      console.log('[useDeleteRecruitmentMutation] 삭제 요청 recruitmentId:', recruitmentId);

      return DELETE<DeleteRecruitmentResponse>(
        `api/v1/recruitments/${recruitmentId}`
      ).then((res) => {
        console.log('[useDeleteRecruitmentMutation] 삭제 응답:', res);
        return res.success;
      });
    },

    onSuccess: () => {
      console.log('[useDeleteRecruitmentMutation] 삭제 성공 → 목록 invalidate');
      qc.invalidateQueries({ queryKey: queryKeys.recruitments.list() });
      qc.invalidateQueries({ queryKey: queryKeys.recruitment.list() });
    },
  });
}
