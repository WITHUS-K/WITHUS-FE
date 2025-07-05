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
    mutationFn: async (body: PublishRecruitmentRequest) => {
      console.log('▶ Publish 요청 바디:', body);
      const res = await POST<PublishRecruitmentResult>(
        'api/v1/recruitments/publish',
        body
      );
      const result = res.result;
      console.log('◀ Publish 응답 전체:', res);
      console.log('◀ Publish 응답 결과:', result);
      return result;
    },
    onSuccess: (data) => {
      console.log('✅ publish 성공, 최종 데이터:', data);
      qc.invalidateQueries({ queryKey: queryKeys.recruitments.list() });
      qc.invalidateQueries({ queryKey: queryKeys.recruitment.list() });
      qc.invalidateQueries({
        queryKey: queryKeys.recruitment.detail(data.recruitmentId),
      });
    },
    onError: (error) => {
      console.error('❌ publish 실패:', error);
    },
  });
}
