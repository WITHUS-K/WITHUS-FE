// src/store/query/useTimeSlotUsersQuery.ts
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants';

/**
 * GET /api/v1/timeslots/{timeSlotId}/users
 * → 특정 타임슬롯에 배정된 사용자 목록
 */
export interface TimeSlotUser {
  userId: number;
  name: string;
  role: 'INTERVIEWER' | 'ASSISTANT';
}

export function useTimeSlotUsersQuery(
  timeSlotId: number
): UseQueryResult<TimeSlotUser[] | undefined, Error> {
  return useQuery<TimeSlotUser[], Error>({
    queryKey: queryKeys.timeSlot.users(timeSlotId),
    queryFn: async () => {
      const res = await GET<TimeSlotUser[]>(
        `api/v1/timeslots/${timeSlotId}/users`
      );
      console.log('타임슬록 배정', res.result);
      return res.result;
    },
    staleTime: 1000 * 60,
    enabled: Number.isFinite(timeSlotId),
  });
}
