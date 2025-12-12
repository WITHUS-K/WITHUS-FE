import {
  keepPreviousData,
  queryOptions,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants';
import { Tokens } from '@web/api/types';

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
  organizationRoleName : string;
  status:
    | 'PENDING'
    | 'DOX_PASS'
    | 'DOX_FAIL'
    | 'INTERVIEW_PASS'
    | 'INTERVIEW_FAIL'
    | 'INTERVIEW_PENDING'
    | 'DOX_PENDING';
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
  tokens?: Tokens;
}

const ADMIN_APPS_STALE_TIME = 1000 * 60 * 2;
const ADMIN_APPS_CACHE_TIME = 1000 * 60 * 3;

/**
 * 공통 옵션 헬퍼: UseQueryOptions 로 선언
 */
export function getAdminApplicationsQueryOptions(
  params: UseAdminApplicationsQueryOptions
) {
  const {
    recruitmentId,
    stage = 'DOCUMENT',
    sortBy = 'NAME',
    direction = 'ASC',
    page = 0,
    size = 20,
    tokens,
  } = params;

  const pageParam = page + 1;

  return {
    queryKey: queryKeys.applications.list(
      recruitmentId,
      stage,
      sortBy,
      direction,
      page,
      size
    ),
    queryFn: async () => {
      const res = await GET<AdminApplicationsResult>(
        `api/v1/admin/applications/recruitment/${recruitmentId}`,
        {
          stage,
          sortBy,
          direction,
          page: String(pageParam),
          size: String(size),
        },
        tokens
      );
      console.log('AdminApplicationsResult:', res.result);
      return res.result;
    },
    staleTime: ADMIN_APPS_STALE_TIME,
    cacheTime: ADMIN_APPS_CACHE_TIME,
    enabled: recruitmentId > 0,
    keepPreviousData: true,
  };
}

/**
 * Suspense 기반 스켈레톤 페칭 훅
 */
export function useAdminApplicationsQuery(
  params: UseAdminApplicationsQueryOptions
) {
  // UseQueryOptions 타입으로 받은 옵션을 그대로 useSuspenseQuery에 넘깁니다.
  return useSuspenseQuery<AdminApplicationsResult, Error>(
    getAdminApplicationsQueryOptions(params)
  );
}

/**
 * 클라이언트(useQuery)용 훅도 동일하게 재사용
 */
export function useAdminApplicationsClientQuery(
  params: UseAdminApplicationsQueryOptions
): UseQueryResult<AdminApplicationsResult, Error> {
  return useQuery<AdminApplicationsResult, Error>(
    getAdminApplicationsQueryOptions(params)
  );
}

/**
 * 관리자용 공고별 지원서 목록 조회
 * GET /api/v1/admin/applications/recruitment/{recruitmentId}
 */

/*const ADMIN_APPS_STALE_TIME = 1000 * 60 * 5; // 5분
const ADMIN_APPS_GC_TIME = 1000 * 60 * 60; // 1시간

export function getAdminApplicationsQueryOptions({
  recruitmentId,
  stage = 'DOCUMENT',
  sortBy = 'NAME',
  direction = 'ASC',
  page = 0,
  size = 7,
  tokens,
}: UseAdminApplicationsQueryOptions): UseSuspenseQueryOptions<
  AdminApplicationsResult,
  Error
> {
  const pageParam = page + 1;
  return queryOptions<AdminApplicationsResult>({
    queryKey: queryKeys.applications.list(
      recruitmentId,
      stage,
      sortBy,
      direction,
      page,
      size
    ),
    queryFn: () =>
      GET<AdminApplicationsResult>(
        `api/v1/admin/applications/recruitment/${recruitmentId}`,
        {
          stage,
          sortBy,
          direction,
          page: String(pageParam),
          size: String(size),
        },
        tokens
      ).then((res) => {
        console.log('getAdminApplications result:', res.result);
        return res.result;
      }),
    staleTime: ADMIN_APPS_STALE_TIME,
    gcTime: ADMIN_APPS_GC_TIME,
    placeholderData: keepPreviousData,
    enabled: recruitmentId > 0,
  });
}

export function useAdminApplicationsQuery(
  params: UseAdminApplicationsQueryOptions
) {
  return useSuspenseQuery(getAdminApplicationsQueryOptions(params));
}
*/
