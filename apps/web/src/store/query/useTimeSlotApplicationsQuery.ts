// src/store/query/useTimeSlotApplicationsQuery.ts
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants';

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

export function useTimeSlotApplicationsQuery(
  timeSlotId: number
): UseQueryResult<TimeSlotApplication[], Error> {
  return useQuery<TimeSlotApplication[], Error>({
    queryKey: queryKeys.timeSlot.applications(timeSlotId),
    queryFn: async () => {
      const res = await GET<TimeSlotApplication[]>(
        `api/v1/time-slots/${timeSlotId}/applications`
      );
      console.log('지원서', res);
      return res.result;
    },
    staleTime: 0, // 캐시를 바로 오래된 것으로 간주
    refetchOnMount: 'always', // 마운트될 때마다 재요청
  });
}
