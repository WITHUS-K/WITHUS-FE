/** 지원서 상세 조회 DTO */
export interface ApplicationAnswer {
  questionId: number;
  questionTitle: string;
  questionDescription: string;
  questionType: 'TEXT' | 'FILE';
  answerText: string;
  fileUrl: string;
  textLimit: number;
  includeWhitespace: boolean;
  maxFileCount: number;
  maxFileSizeMb: number;
  fileSize?: number;
}

/** 사용자 요약 정보 */
export interface Evaluator {
  userId: number;
  name: string;
  profileImageUrl?: string;
  profileColor: string;
  totalScore?: number;
}

/** 면접 질문 DTO */
export interface InterviewQuestion {
  id: number;
  content: string;
  user: Evaluator;
}

/** 평가 기준 DTO */
export interface DocumentEvaluationCriteria {
  id: number;
  content: string;
  description: string;
  type: 'DOCUMENT' | 'INTERVIEW';
  score: number | null;
  organizationRoleName : string;
}

/** 평가 내역 DTO */
export interface Evaluation {
  id: number;
  score: number | null;
  criteria: DocumentEvaluationCriteria;
  user: Evaluator;
}

/** 코멘트 DTO */
export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  type: 'DOCUMENT' | 'INTERVIEW';
  user: Evaluator;
}

/** 완료/미완료 평가자 정보 DTO */
export interface EvaluatorInfo {
  evaluator: Evaluator;
  totalScore: number;
}

/** 지원서 상세 조회 결과 */
export interface ApplicationDetail {
  id: number;
  title: string;
  appliedPosition: string;
  appliedPositions?: string[];
  name: string;
  gender: 'MALE' | 'FEMALE' | 'NONE';
  email: string;
  phoneNumber: string;
  university?: string;
  major?: string;
  academicStatus?: 'ENROLLED' | 'GRADUATED' | 'LEAVE_OF_ABSENCE' | 'DEFERRED';
  birthDate?: string;
  imageUrl?: string;
  address?: string;
  status:
    | 'PENDING'
    | 'DOX_PASS'
    | 'DOX_FAIL'
    | 'INTERVIEW_PASS'
    | 'INTERVIEW_FAIL';
  documentAnswers: ApplicationAnswer[];
  availableTimes: string[];
  interviewDates: string[];
  interviewQuestions: InterviewQuestion[];
  evaluations: Evaluation[];
  documentComments: Comment[];
  interviewComments: Comment[];
  documentScaleTypeKey: string;
  documentEvaluationCriterias: DocumentEvaluationCriteria[];
  acquaintances: Evaluator[];
  acquaintanceCount: number;
  documentAverageScore: string;
  documentCompleted: EvaluatorInfo[];
  documentPending: Evaluator[];
  interviewAverageScore: string;
  interviewCompleted: EvaluatorInfo[];
  interviewPending: Evaluator[];
  documentDeadline: string;
  documentResultDate: string;
  finalResultDate: string;
}

import {
  queryOptions,
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants';
import { Tokens } from '@web/api/types';

export interface ApplicationDetailParams {
  applicationId: number;
  tokens?: Tokens;
}

export function getApplicationDetailQueryOptions({
  applicationId,
  tokens,
}: ApplicationDetailParams): UseSuspenseQueryOptions<ApplicationDetail, Error> {
  return queryOptions<ApplicationDetail>({
    queryKey: queryKeys.applications.detail(applicationId),
    queryFn: () =>
      GET<ApplicationDetail>(
        `api/v1/applications/${applicationId}`,
        undefined,
        tokens
      ).then((res) => res.result),
    staleTime: 1000 * 60 * 3,
    enabled: applicationId > 0,
  });
}

export function useApplicationDetailQuery(params: ApplicationDetailParams) {
  return useSuspenseQuery(getApplicationDetailQueryOptions(params));
}
