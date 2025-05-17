'use client';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { draftRecruitmentApi } from '@web/api/recruitment';
import type {
  DraftRecruitmentRequest,
  DraftRecruitmentResult,
} from '@web/types/recruitment';
import { queryKeys } from '@web/store/constants/queryKeys';

export function useDraftRecruitmentMutation() {
  const qc = useQueryClient();

  return useMutation<DraftRecruitmentResult, Error, DraftRecruitmentRequest>({
    mutationFn: draftRecruitmentApi,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.recruitments.list(),
      });
    },
  });
}