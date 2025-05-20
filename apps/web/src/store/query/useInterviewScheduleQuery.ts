// src/store/query/useInterviewSchedule.ts
import {
  useSuspenseQuery,
  type FetchQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants';
import type { ApiResponse } from '@web/api/types';

// 웹앱에서 재사용할 태그 컬러 맵
export const tagColorMap = {
  '#FF2A3A': { background: '#FFE6E9', circle: '#FF6974' },
  '#EE6B00': { background: '#FFEEDE', circle: '#FF995A' },
  '#E2A500': { background: '#FFF5CF', circle: '#FFD062' },
  '#009857': { background: '#D9FFE2', circle: '#76E79C' },
  '#0084BC': { background: '#DBF6FF', circle: '#87DAF9' },
  '#2C60FF': { background: '#EAEFFF', circle: '#9EB6FF' },
  '#813DFF': { background: '#EFEAFF', circle: '#C0AAFF' },
  '#F25DEB': { background: '#FFEDFE', circle: '#FFA5F5' },
  '#7F82A1': { background: '#F2F3F6', circle: '#C4C6D4' },
  '#5A5C72': { background: '#D7D8E2', circle: '#A9ABC0' },
} as const;

// 태그 컬러 키들만 뽑아서 배열로
export const TAG_COLOR_KEYS = Object.keys(tagColorMap) as Array<
  keyof typeof tagColorMap
>;

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
      console.log('안뇽', res);
      return res.result.map((sch) => ({
        ...sch,
        timeSlots: sch.timeSlots.map((ts) => {
          // 무작위 색상 키 선택
          const idx = ts.timeSlotId % TAG_COLOR_KEYS.length;
          const key = TAG_COLOR_KEYS[idx]!;
          return {
            ...ts,
            // tagColorMap 에서 background 값을 꺼내서 color에 저장
            color: tagColorMap[key].background,
          };
        }),
      }));
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
      console.log('타임테이블', res.result);
      return res.result.map((sch) => ({
        ...sch,
        timeSlots: sch.timeSlots.map((ts) => {
          const randomKey =
            TAG_COLOR_KEYS[Math.floor(Math.random() * TAG_COLOR_KEYS.length)];
          return {
            ...ts,
            color: tagColorMap[randomKey!].background,
          };
        }),
      }));
    },
    staleTime: 1000 * 60,
  });
}
