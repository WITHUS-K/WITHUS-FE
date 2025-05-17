'use client';
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query'
import type {
  RecruitmentDetailDto,
  UpdateRecruitmentRequest,
} from '@web/types/recruitment'
import { queryKeys } from '@web/store/constants/queryKeys'
import { updateRecruitmentApi } from '@web/api/recruitment';
import { recruitmentDetailKey } from '@web/store/query/useRecruitmentDetailQuery';

export function useUpdateRecruitmentMutation(
  recruitmentId: number
): UseMutationResult<RecruitmentDetailDto, Error, UpdateRecruitmentRequest, unknown> {
  const qc = useQueryClient()

  return useMutation<RecruitmentDetailDto, Error, UpdateRecruitmentRequest>(
    {
      mutationFn: (body) =>
        updateRecruitmentApi(recruitmentId, body),
      onSuccess: () => {
        qc.invalidateQueries({
          queryKey: recruitmentDetailKey(recruitmentId),
        })
        qc.invalidateQueries({
          queryKey: queryKeys.recruitments.list(),
        })
      },
    }
  )
}