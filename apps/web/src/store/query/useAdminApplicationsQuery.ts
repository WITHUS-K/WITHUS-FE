import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants';

// API 파라미터 타입
export type AdminApplicationStage =
  | 'DOCUMENT'
  | 'INTERVIEW'
  | 'FINAL_PASS'
  | 'FAIL';
export type AdminApplicationSortBy =
  | 'NAME'
  | 'POSITION_NAME'
  | 'DOCUMENT_EVALUATION_STATUS'
  | 'INTERVIEW_EVALUATION_STATUS'
  | 'DOCUMENT_SCORE'
  | 'INTERVIEW_SCORE'
  | 'STATUS'
  | 'IS_MAIL_SENT'
  | 'IS_SMS_SENT';
export type AdminApplicationDirection = 'ASC' | 'DESC';

// API 응답 DTO
export interface AdminApplicationSummary {
  sequence: string;
  id: number;
  name: string;
  positionName: string;
  status:
    | 'PENDING'
    | 'DOX_PASS'
    | 'DOX_FAIL'
    | 'INTERVIEW_PASS'
    | 'INTERVIEW_FAIL';
  documentAssignedCount: number;
  documentEvaluatedCount: number;
  documentAverageScore: string;
  documentEvaluators: {
    userId: number;
    name: string;
    profileImageUrl?: string;
    profileColor: string;
  }[];
  interviewAssignedCount: number;
  interviewEvaluatedCount: number;
  interviewAverageScore: string;
  interviewEvaluators: {
    userId: number;
    name: string;
    profileImageUrl?: string;
    profileColor: string;
  }[];
  isMailSent: boolean;
  isSmsSent: boolean;
}

export interface PaginationMeta {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  isLast: boolean;
}

export interface ApplicationCounts {
  document: number;
  interview: number;
  finalPass: number;
  fail: number;
}

export interface AdminApplicationsResult {
  data: AdminApplicationSummary[];
  pagination: PaginationMeta;
  counts: ApplicationCounts;
}

export interface AdminApplicationsResponse {
  code: number;
  message: string;
  result: AdminApplicationsResult;
  success: boolean;
}

interface UseAdminApplicationsQueryOptions {
  recruitmentId: number;
  stage?: AdminApplicationStage;
  sortBy?: AdminApplicationSortBy;
  direction?: AdminApplicationDirection;
  page?: number;
  size?: number;
}

/**
 * 관리자용 공고별 지원서 목록 조회
 * GET /api/v1/admin/applications/recruitment/{recruitmentId}
 */
export function useAdminApplicationsQuery({
  recruitmentId,
  stage = 'DOCUMENT',
  sortBy = 'NAME',
  direction = 'ASC',
  page = 0,
  size = 7,
}: UseAdminApplicationsQueryOptions) {
  return useQuery<AdminApplicationsResult, Error>({
    queryKey: queryKeys.applications.list(
      recruitmentId,
      stage,
      sortBy,
      direction,
      page,
      size
    ),
    queryFn: async () => {
      const pageParam = page + 1;
      const res = await GET<AdminApplicationsResult>(
        `api/v1/admin/applications/recruitment/${recruitmentId}`,
        {
          stage,
          sortBy,
          direction,
          page: String(pageParam),
          size: String(size),
        }
      );
      console.log('관리자 지원서 조회', res.result);
      return res.result;
    },
    placeholderData: keepPreviousData,
    enabled: recruitmentId > 0,
  });
}
