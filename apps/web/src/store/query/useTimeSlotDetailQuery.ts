import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants';

/**
 * GET /api/v1/time-slots/{timeSlotId}
 * → 특정 타임슬롯 상세 조회
 */
export interface TimeSlotPosition {
  id: number;
  name: string;
  color: string;
}

export interface TimeSlotUser {
  userId: number;
  name: string;
  profileImageUrl: string;
  role: 'INTERVIEWER' | 'ASSISTANT';
}

export interface TimeSlotApplicant {
  id: number;
  name: string;
}

export interface TimeSlotDetail {
  timeSlotId: number;
  startAt: string;
  endAt: string;
  position: TimeSlotPosition;
  users: TimeSlotUser[];
  applicants: TimeSlotApplicant[];
}

export function useTimeSlotDetailQuery(
  timeSlotId: number
): UseQueryResult<TimeSlotDetail | undefined, Error> {
  return useQuery<TimeSlotDetail, Error>({
    queryKey: queryKeys.timeSlot.detail(timeSlotId),
    queryFn: async () => {
      const res = await GET<TimeSlotDetail>(`api/v1/time-slots/${timeSlotId}`);
      console.log('타임슬롯 상세', res.result);
      return res.result;
    },
    staleTime: 1000 * 60,
    enabled: Number.isFinite(timeSlotId),
  });
}
