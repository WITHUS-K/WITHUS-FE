// src/store/query/useMyTimeSlotsQuery.ts
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants';
import type { InterviewSchedule } from './useInterviewScheduleQuery';

/**
 * 내 면접 배정 결과 조회 Query
 * → GET /api/v1/interviews/{interviewId}/my-time-slots
 */
export function useMyTimeSlotsQuery(
  interviewId: number
): UseQueryResult<InterviewSchedule[], Error> {
  return useQuery<InterviewSchedule[], Error>({
    queryKey: queryKeys.interview.myTimeSlots(interviewId),
    queryFn: async () => {
      const res = await GET<InterviewSchedule[]>(
        `api/v1/interviews/${interviewId}/my-time-slots`
      );
      console.log('내 타임테이블', res.result);
      return res.result.map((sch) => ({
        ...sch,
        // 날짜 포맷을 마침표(.)로 통일
        date: sch.date.replace(/-/g, '.'),
        timeSlots: sch.timeSlots.map((ts) => ({
          ...ts,
          // 고정 컬러
          color: '#BECEFF',
        })),
      }));
    },
    staleTime: 1000 * 60, // 1분
    enabled: interviewId > 0,
  });
}
