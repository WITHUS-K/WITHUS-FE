'use client';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import type {
  DraftRecruitmentRequest,
  DraftRecruitmentResult,
} from '@web/types/recruitment';
import { queryKeys } from '@web/store/constants/queryKeys';
import { POST } from '@web/api';

export function useDraftRecruitmentMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: DraftRecruitmentRequest) =>
      POST<DraftRecruitmentResult>(
        'api/v1/recruitments/draft',
        body
      ).then(res => res.result),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.recruitments.list() });
    },
  });
}