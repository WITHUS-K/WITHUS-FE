export interface ApplicationAnswer {
  questionId: number;
  questionTitle: string;
  questionType: 'TEXT' | 'FILE';
  answerText: string;
  fileUrl: string;
}

export interface Evaluator {
  userId: number;
  name: string;
  profileImageUrl?: string;
  profileColor: string;
  totalScore?: number;
}

export interface Evaluation {
  id: number;
  score: number;
  criteria: {
    id: number;
    content: string;
    type: 'DOCUMENT' | 'INTERVIEW';
  };
  user: Evaluator;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  type: 'DOCUMENT' | 'INTERVIEW';
  user: Evaluator;
}

export interface ApplicationDetail {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  gender: 'MALE' | 'FEMALE' | 'NONE';
  university?: string;
  major?: string;
  academicStatus?: string;
  birthDate?: string;
  imageUrl?: string;
  address?: string;
  appliedPosition: string;
  documentAnswers: ApplicationAnswer[];
  availableTimes: string[];
  interviewDates: string[];
  evaluations: Evaluation[];
  documentComments: Comment[];
  interviewComments: Comment[];
  acquaintances: Evaluator[];
  documentAverageScore: string;
  interviewAverageScore: string;
  documentCompleted: Evaluator[];
  documentPending: Evaluator[];
  interviewCompleted: Evaluator[];
  interviewPending: Evaluator[];
  documentDeadline: string;
  documentResultDate: string;
  finalResultDate: string;
  title: string;
}

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants';

export function useApplicationDetailQuery(applicationId: number) {
  return useQuery<ApplicationDetail, Error>({
    queryKey: queryKeys.applications.detail(applicationId),
    queryFn: async () => {
      const res = await GET<ApplicationDetail>(
        `api/v1/applications/${applicationId}`
      );
      console.log('✅ [useApplicationDetailQuery] 응답:', res);
      return res.result;
    },
    staleTime: 1000 * 60 * 3,
    enabled: applicationId > 0,
  });
}
