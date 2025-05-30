import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query'
import { deleteRecruitmentApi } from '@web/api/recruitment'
import { queryKeys } from '@web/store/constants/queryKeys'
import { recruitmentDetailKey } from '@web/store/query/useRecruitmentDetailQuery'

export function useDeleteRecruitmentMutation(): UseMutationResult<
  boolean,       
  Error,         
  number,        
  unknown
> {
  const qc = useQueryClient()

  return useMutation<boolean, Error, number>({
    mutationFn: (recruitmentId: number) =>
      deleteRecruitmentApi(recruitmentId),
    onSuccess: (_data, recruitmentId) => {
      qc.invalidateQueries({ queryKey: recruitmentDetailKey(recruitmentId) })
      qc.invalidateQueries({ queryKey: queryKeys.recruitments.list() })
      qc.invalidateQueries({ queryKey: queryKeys.recruitment.list() })
    },
  })
}