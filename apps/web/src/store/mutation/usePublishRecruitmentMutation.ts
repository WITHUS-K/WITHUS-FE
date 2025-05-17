import { useMutation, useQueryClient } from '@tanstack/react-query'
import type {
  PublishRecruitmentRequest,
  PublishRecruitmentResult,
} from '@web/types/recruitment'
import { queryKeys } from '@web/store/constants/queryKeys'
import { publishRecruitmentApi } from '@web/api/recruitment'

export function usePublishRecruitmentMutation() {
  const qc = useQueryClient()

  return useMutation<PublishRecruitmentResult, Error, PublishRecruitmentRequest, unknown>({
    mutationFn: publishRecruitmentApi,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.recruitments.list(),
      })
    },
  })
}