import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POST } from '@web/api/fetch';
import { queryKeys } from '../constants';

/**
 * @description
 *   면접관 자동 배정 요청 (POST)
 *   → /api/v1/timeslots/interviews/{interviewId}/schedule
 */
export function useAutoAssignInterviewersMutation(interviewId: number) {
  const qc = useQueryClient();

  return useMutation<string, Error, void>({
    mutationFn: async () => {
      const res = await POST<string>(
        `api/v1/timeslots/interviews/${interviewId}/schedule`
      );
      console.log('면접관 배정', res);
      return res.result;
    },

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.interview.schedule(interviewId),
      });
      qc.invalidateQueries({
        queryKey: queryKeys.interview.myTimeSlots(interviewId),
      });
    },

    onError: (err) => {
      console.error('[useAutoAssignInterviewers] 오류 발생:', err);
    },
  });
}
