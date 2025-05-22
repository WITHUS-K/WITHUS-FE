// src/store/query/useInterviewSchedule.ts
import {
  useSuspenseQuery,
  type FetchQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants';

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

// — QueryOptions & Hook —
export function getScheduleOptions(
  interviewId: number
): FetchQueryOptions<
  InterviewSchedule[],
  Error,
  InterviewSchedule[],
  ReturnType<typeof queryKeys.interview.schedule>
> {
  return {
    queryKey: queryKeys.interview.schedule(interviewId),
    queryFn: async () => {
      const res = await GET<InterviewSchedule[]>(
        `api/v1/interviews/${interviewId}/schedule`
      );

      return res.result;
    },
    staleTime: 1000 * 60,
  };
}

/**
 * @param interviewId
 * @returns 조직의 면접 스케줄 배열
 */
export function useInterviewScheduleQuery(
  interviewId: number
): UseSuspenseQueryResult<InterviewSchedule[], Error> {
  return useSuspenseQuery<InterviewSchedule[], Error>({
    queryKey: queryKeys.interview.schedule(interviewId),
    queryFn: async () => {
      const res = await GET<InterviewSchedule[]>(
        `api/v1/interviews/${interviewId}/schedule`
      );

      return res.result;
    },
    staleTime: 1000 * 60,
  });
}
