import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  PublishRecruitmentRequest,
  PublishRecruitmentResult,
} from '@web/types/recruitment';
import { queryKeys } from '@web/store/constants/queryKeys';
import { publishRecruitmentApi } from '@web/api/recruitment';

export function usePublishRecruitmentMutation() {
  const qc = useQueryClient();

  return useMutation<
    PublishRecruitmentResult,
    Error,
    PublishRecruitmentRequest
  >({
    // 1) 실제 API 호출 전후에 로그 추가
    mutationFn: async (variables) => {
      console.log('[PublishRecruitment] sending:', variables);
      const result = await publishRecruitmentApi(variables);
      console.log('[PublishRecruitment] response:', result);
      return result;
    },

    // 3) 성공 시
    onSuccess: (data, variables, context) => {
      console.log('[PublishRecruitment] onSuccess data:', data);
      qc.invalidateQueries({ queryKey: queryKeys.recruitments.list() });
    },
    // 4) 실패 시
    onError: (error, variables, context) => {
      console.error('[PublishRecruitment] onError:', error);
    },
  });
}
