// src/store/mutation/useUpdateTimeSlotUsersMutation.ts
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import { PATCH } from '@web/api/fetch';
import { queryKeys } from '../constants';

export interface UpdateTimeSlotUsersRequest {
  userIds: number[];
  role: 'INTERVIEWER' | 'ASSISTANT';
}

/**
 * PATCH /api/v1/timeslots/{timeSlotId}/users
 * → 타임슬롯에 배정된 사용자 전체를 수정
 */
export function useUpdateTimeSlotUsersMutation(
  timeSlotId: number,
  interviewId: number
): UseMutationResult<void, Error, UpdateTimeSlotUsersRequest> {
  const qc = useQueryClient();

  return useMutation<void, Error, UpdateTimeSlotUsersRequest>({
    mutationFn: async (body) => {
      console.log('[useUpdateTimeSlotUsers] mutationFn → 요청 바디:', body);
      // PATCH 호출 — 보통은 응답이 { result: string } 형태이므로 res에 담깁니다
      const res = await PATCH<{ result: string }>(
        `api/v1/timeslots/${timeSlotId}/users`,
        body
      );
      console.log('[useUpdateTimeSlotUsers] mutationFn → 응답값:', res);
      // 반환값을 무시하므로 별도 return 은 하지 않습니다
    },

    onSuccess: () => {
      console.log('[useUpdateTimeSlotUsers] onSuccess → 무효화 시작');
      qc.invalidateQueries({ queryKey: queryKeys.timeSlot.users(timeSlotId) });
      qc.invalidateQueries({
        queryKey: queryKeys.interview.schedule(interviewId),
      });
      console.log('[useUpdateTimeSlotUsers] onSuccess → 무효화 완료');
    },

    onError: (error) => {
      console.error('[useUpdateTimeSlotUsers] onError →', error);
    },
  });
}
