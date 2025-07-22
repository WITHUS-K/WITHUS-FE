// src/store/query/useInterviewSchedule.ts
import {
  useSuspenseQuery,
  type FetchQueryOptions,
  UseSuspenseQueryResult,
  queryOptions,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants';
import { Tokens } from '@web/api/types';

// — 요청/응답 타입 —
// GET /api/v1/interviews/{interviewId}/schedule
export interface TimeSlot {
  timeSlotId: number;
  date: string;
  roomName: string;
  startTime: string;
  endTime: string;
  applicants: {
    applicationId: number;
    name: string;
    email: string;
    positionName: string;
  }[];
  interviewers: {
    userId: number;
    name: string;
    role: string;
    profileUrl: string;
  }[];
  assistants: {
    userId: number;
    name: string;
    role: string;
    profileUrl: string;
  }[];

  /** UI용 배경색 (tagColorMap 내 background 값) */
  color: string;
}

export interface InterviewSchedule {
  interviewId: number;
  date: string;
  startTime: string;
  endTime: string;
  interviewDuration: number;
  roomNames: string[];
  timeSlots: TimeSlot[];
}

export interface InterviewScheduleParams {
  interviewId: number;
  tokens?: Tokens;
}

/**
 * @param interviewId
 * @param tokens  optional authentication tokens
 */
export function getInterviewScheduleQueryOptions({
  interviewId,
  tokens,
}: InterviewScheduleParams): UseSuspenseQueryOptions<
  InterviewSchedule[],
  Error
> {
  return queryOptions<InterviewSchedule[]>({
    queryKey: queryKeys.interview.schedule(interviewId),
    queryFn: () =>
      GET<InterviewSchedule[]>(
        `api/v1/interviews/${interviewId}/schedule`,
        undefined,
        tokens
      ).then((res) => res.result),
    staleTime: 1000 * 60,
    enabled: interviewId > 0,
  });
}

/**
 * @param params.interviewId
 * @param params.tokens   optional authentication tokens
 * @returns 조직의 면접 스케줄 배열
 */
export function useInterviewScheduleQuery(params: InterviewScheduleParams) {
  return useSuspenseQuery(getInterviewScheduleQueryOptions(params));
}
