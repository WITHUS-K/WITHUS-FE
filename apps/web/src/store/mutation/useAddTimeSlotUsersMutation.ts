// src/store/query/useTimeSlotUsersQuery.ts
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import { POST } from '@web/api/fetch';
import { queryKeys } from '../constants';

/**
 * POST /api/v1/timeslots/{timeSlotId}/users
 * → 타임슬롯에 사용자 추가 (면접관 or 안내자)
 */
export interface AddTimeSlotUsersRequest {
  userIds: number[];
  role: 'INTERVIEWER' | 'ASSISTANT';
}

export function useAddTimeSlotUsersMutation(
  timeSlotId: number,
  interviewId: number
): UseMutationResult<void, Error, AddTimeSlotUsersRequest> {
  const queryClient = useQueryClient();

  return useMutation<void, Error, AddTimeSlotUsersRequest>({
    mutationFn: async (body) => {
      await POST(`api/v1/timeslots/${timeSlotId}/users`, body);
    },
    onSuccess: () => {
      // 1) 타임슬롯 사용자 목록 리패치
      queryClient.invalidateQueries({
        queryKey: queryKeys.timeSlot.users(timeSlotId),
      });
      // 2) 면접 스케줄(타임테이블) 리패치
      queryClient.invalidateQueries({
        queryKey: queryKeys.interview.schedule(interviewId),
      });
    },
  });
}
