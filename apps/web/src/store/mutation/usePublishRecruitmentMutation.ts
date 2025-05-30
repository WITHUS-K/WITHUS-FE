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
      try {
        return await publishRecruitmentApi(variables);
      } catch (err: any) {
        // ky의 HTTPError라면 err.response 가 fetch Response 객체입니다
        if (err.response && typeof err.response.json === 'function') {
          const body = await err.response.json();
          console.error('[PublishRecruitment] 서버 에러 바디:', body);
        } else {
          console.error('[PublishRecruitment] 알 수 없는 에러:', err);
        }
        throw err; // 다시 던져야 React Query가 onError를 호출합니다
      }
    },
    // 3) 성공 시
    onSuccess: (data, variables, context) => {
      console.log('[PublishRecruitment] onSuccess data:', data);
      qc.invalidateQueries({ queryKey: queryKeys.recruitments.list() });
      qc.invalidateQueries({ queryKey: queryKeys.recruitment.list() });
    },
    // 4) 실패 시
    onError: (error) => {
      // 이제 error.response 가 undefined 이더라도, 위에서 이미 파싱된 메시지를 볼 수 있습니다
      console.error('[PublishRecruitment] onError:', error);
    },
  });
}
