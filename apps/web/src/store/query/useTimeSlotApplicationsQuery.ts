// src/store/query/useTimeSlotApplicationsQuery.ts
import {
  queryOptions,
  useQuery,
  UseSuspenseQueryOptions,
  type UseQueryResult,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants';
import { Tokens } from '@web/api/types';

export interface DocumentAnswer {
  questionId: number;
  questionTitle: string;
  questionType: 'TEXT' | string;
  answerText: string;
  fileUrl?: string;
  fileSize?: number;
}

export interface InterviewQuestion {
  id: number;
  content: string;
  user: {
    userId: number;
    name: string;
    profileImageUrl?: string;
    profileColor?: string;
  };
}

export interface Evaluation {
  id: number;
  criteria: {
    id: number;
    content: string;
    description: string;
    type: 'DOCUMENT' | 'INTERVIEW';
    positionName: string;
    score: number;
  };
  score: number;
  user: {
    userId: number;
    name: string;
    profileImageUrl?: string;
    profileColor?: string;
  };
}

export interface CommentItem {
  id: number;
  content: string;
  type: 'DOCUMENT' | 'INTERVIEW';
  createdAt: string;
  user: {
    userId: number;
    name: string;
    profileImageUrl?: string;
    profileColor: string;
  };
}

export interface TimeSlotApplication {
  applicationId: number;
  appliedPosition: number;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  status:
    | 'PENDING'
    | 'DOX_PASS'
    | 'DOX_FAIL'
    | 'INTERVIEW_PASS'
    | 'INTERVIEW_FAIL';
  documentAnswers: DocumentAnswer[];
  interviewQuestions: InterviewQuestion[];
  evaluations: Evaluation[];
  documentComments: CommentItem[];
  interviewComments: CommentItem[];
}

export interface TimeSlotApplicationsParams {
  timeSlotId: number;
  tokens?: Tokens;
}

const STALE_TIME = 1000 * 60 * 1;
const GC_TIME = 1000 * 60 * 2;

/**
 * @description
 *   특정 타임슬롯의 지원서 목록을 조회하기 위한 React Query 옵션 생성
 */
export function getTimeSlotApplicationsQueryOptions({
  timeSlotId,
  tokens,
}: TimeSlotApplicationsParams): UseSuspenseQueryOptions<
  TimeSlotApplication[],
  Error
> {
  return queryOptions<TimeSlotApplication[]>({
    queryKey: queryKeys.timeSlot.applications(timeSlotId),
    queryFn: () =>
      GET<TimeSlotApplication[]>(
        `api/v1/time-slots/${timeSlotId}/applications`,
        undefined,
        tokens
      ).then((res) => res.result),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    enabled: timeSlotId > 0,
  });
}

/**
 * @description
 *   Suspense 기반으로 특정 타임슬롯의 지원서 목록을 조회하는 훅
 */
export function useTimeSlotApplicationsQuery(
  params: TimeSlotApplicationsParams
) {
  return useSuspenseQuery(getTimeSlotApplicationsQueryOptions(params));
}
