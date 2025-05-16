// src/store/query/useMyTimeSlotsQuery.ts
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants';

/** API 응답 중 하나의 타임슬롯 항목 */
export interface MyTimeSlot {
  interviewId: number;
  date: string; // "2025-05-16"
  startTime: string; // "12:00"
  endTime: string; // "12:00"
  roomName: string;
  applicants: {
    applicationId: number;
    name: string;
    email: string;
    positionName: string;
  }[];
  interviewers: {
    userId: number;
    name: string;
    role: 'INTERVIEWER' | 'ASSISTANT';
  }[];
  assistants: {
    userId: number;
    name: string;
    role: 'INTERVIEWER' | 'ASSISTANT';
  }[];
}

/**
 * 내 면접 배정 결과 조회 Query
 * interviewId: path param
 */
export function useMyTimeSlotsQuery(
  interviewId: number
): UseQueryResult<MyTimeSlot[], Error> {
  return useQuery<MyTimeSlot[], Error>({
    queryKey: queryKeys.interview.myTimeSlots(interviewId),
    queryFn: async () => {
      const res = await GET<MyTimeSlot[]>(
        `api/v1/interviews/${interviewId}/my-time-slots`
      );
      console.log(res);
      return res.result;
    },
    staleTime: 1000 * 60, // 1분
  });
}
