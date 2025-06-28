import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  PublishRecruitmentRequest,
  PublishRecruitmentResult,
} from '@web/types/recruitment';
import { queryKeys } from '@web/store/constants/queryKeys';
import { POST } from '@web/api';

export function usePublishRecruitmentMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: PublishRecruitmentRequest) =>
      POST<PublishRecruitmentResult>('api/v1/recruitments/publish', body).then(
        (res) => res.result
      ),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.recruitments.list() });
      qc.invalidateQueries({ queryKey: queryKeys.recruitment.list() });
    },
  });
}
