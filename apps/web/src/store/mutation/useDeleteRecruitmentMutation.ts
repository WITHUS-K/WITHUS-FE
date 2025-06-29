'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DELETE } from '@web/api/fetch';
import type { DeleteRecruitmentResponse } from '@web/types/recruitment';
import { queryKeys } from '@web/store/constants/queryKeys';

export function useDeleteRecruitmentMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (recruitmentId: number) =>
      DELETE<DeleteRecruitmentResponse>(
        `api/v1/recruitments/${recruitmentId}`
      ).then((res) => res.success),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.recruitments.list() });
      qc.invalidateQueries({ queryKey: queryKeys.recruitment.list() });
    },
  });
}
