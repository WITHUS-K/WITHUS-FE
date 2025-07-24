import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PATCH } from '@web/api/fetch';
import { queryKeys } from '../constants';

/**
 * @description
 *   면접 타임테이블 초기화 요청 (PATCH)
 *   → /api/v1/interviews/{interviewId}/schedule/reset
 *   기존 배정된 면접 시간표를 모두 삭제하고, 구성 설정을 0으로 초기화
 */
export function useResetInterviewScheduleMutation(interviewId: number) {
  const qc = useQueryClient();

  return useMutation<string, Error, void>({
    mutationFn: async () => {
      const res = await PATCH<string>(
        `api/v1/interviews/${interviewId}/schedule/reset`
      );
      console.log('면접 스케줄 초기화', res);
      return res.result;
    },

    onSuccess: () => {
      // 스케줄, 내 타임슬롯, 설정 조회 쿼리 무효화
      qc.invalidateQueries({
        queryKey: queryKeys.interview.schedule(interviewId),
      });
      qc.invalidateQueries({
        queryKey: queryKeys.interview.myTimeSlots(interviewId),
      });
      qc.invalidateQueries({
        queryKey: queryKeys.interview.config(interviewId),
      });
    },

    onError: (err) => {
      console.error('[useResetInterviewSchedule] 오류 발생:', err);
    },
  });
}
