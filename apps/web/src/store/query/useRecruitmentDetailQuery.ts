// src/store/query/useRecruitmentDetail.ts
import {
  useSuspenseQuery,
  type FetchQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants';
import type { ApiResponse, Tokens } from '@web/api/types';

// — 요청/응답 타입 —

// GET /api/v1/recruitments/{recruitmentId}
// → 리크루팅 단건 상세 조회
export interface Position {
  id: number;
  name: string;
}

export interface RecruitmentDetail {
  recruitmentId: number;
  UrlSlug: string;
  title: string;
  content: string;
  fileUrl: string;
  needGender: boolean;
  needAddress: boolean;
  needSchool: boolean;
  needBirthDate: boolean;
  needMajor: boolean;
  needAcademicStatus: boolean;
  positions: Position[];
  documentDeadline: string; // "2025-05-15"
  isDocumentResultRequired: boolean;
  documentResultDate: string; // "2025-05-15"
  finalResultDate: string; // "2025-05-15"
  interviewDuration: number;
  organizationName: string;
  documentScaleType: string;
  interviewScaleType: string;
  documentEvaluationCriteria: {
    id: number;
    content: string;
    description: string;
    type: string;
    score: number;
  }[];
  interviewEvaluationCriteria: {
    id: number;
    content: string;
    description: string;
    type: string;
    score: number;
  }[];
  applicationQuestions: unknown[];
  isInterviewRequired: boolean;
  availableTimeRanges: {
    id: number;
    date: string; // "2025-05-15"
    startTime: string; // "12:00"
    endTime: string; // "12:00"
    recruitmentId: number;
  }[];
}

// — QueryOptions & Hook —
function getRecruitmentDetailOptions(
  recruitmentId: number,
  tokens?: Tokens
): FetchQueryOptions<
  RecruitmentDetail,
  Error,
  RecruitmentDetail,
  ReturnType<typeof queryKeys.recruitment.detail>
> {
  return {
    queryKey: queryKeys.recruitment.detail(recruitmentId),
    queryFn: async () => {
      const res = await GET<RecruitmentDetail>(
        `api/v1/recruitments/${recruitmentId}`,
        undefined,
        tokens
      );
      return res.result;
    },
    staleTime: 1000 * 60 * 5,
  };
}

export function useRecruitmentDetailQuery(
  recruitmentId: number,
  tokens?: Tokens
): UseSuspenseQueryResult<RecruitmentDetail, Error> {
  return useSuspenseQuery<RecruitmentDetail, Error>({
    queryKey: queryKeys.recruitment.detail(recruitmentId),
    queryFn: async () => {
      const res = await GET<RecruitmentDetail>(
        `api/v1/recruitments/${recruitmentId}`,
        undefined,
        tokens
      );
      return res.result;
    },
    staleTime: 1000 * 60 * 5,
  });
}
