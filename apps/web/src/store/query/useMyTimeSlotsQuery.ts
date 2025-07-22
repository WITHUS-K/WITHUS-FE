// src/store/query/useMyTimeSlotsQuery.ts
import {
  useQuery,
  UseSuspenseQueryOptions,
  queryOptions,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants';
import type { InterviewSchedule } from './useInterviewScheduleQuery';
import { Tokens } from '@web/api/types';

export interface MyTimeSlotsParams {
  interviewId: number;
  tokens?: Tokens;
}

const STALE_TIME = 1000 * 60 * 1;
const GC_TIME = 1000 * 60 * 2;

/**
 * @description
 *   내 면접 배정 결과 조회용 React Query 옵션 생성
 */
export function getMyTimeSlotsQueryOptions({
  interviewId,
  tokens,
}: MyTimeSlotsParams): UseSuspenseQueryOptions<InterviewSchedule[], Error> {
  return queryOptions<InterviewSchedule[]>({
    queryKey: queryKeys.interview.myTimeSlots(interviewId),
    queryFn: () =>
      GET<InterviewSchedule[]>(
        `api/v1/interviews/${interviewId}/my-time-slots`,
        undefined,
        tokens
      ).then((res) =>
        res.result.map((sch) => ({
          ...sch,
          // 날짜 포맷을 마침표(.)로 통일
          date: sch.date.replace(/-/g, '.'),
          timeSlots: sch.timeSlots.map((ts) => ({
            ...ts,
            // 고정 컬러
            color: '#BECEFF',
          })),
        }))
      ),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    enabled: interviewId > 0,
  });
}

/**
 * @description
 *   Suspense 기반으로 내 면접 배정 결과를 조회하는 훅
 */
export function useMyTimeSlotsQuery(params: MyTimeSlotsParams) {
  return useSuspenseQuery(getMyTimeSlotsQueryOptions(params));
}
