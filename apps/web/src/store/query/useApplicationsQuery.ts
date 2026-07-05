import {
  UseQueryResult,
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import type { ApiResponse, Tokens } from '@web/api/types';
import { queryKeys } from '../constants';

export interface PaginationMeta {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  isLast: boolean;
}

export interface ApplicationSummary {
  documentResultAnnounced: boolean;
  id: number;
  name: string;
  organizationRoleName : string;
  appliedPositions?: string[];
  status:
    | 'PENDING'
    | 'DOX_PASS'
    | 'DOX_FAIL'
    | 'INTERVIEW_PASS'
    | 'INTERVIEW_FAIL'
    | 'INTERVIEW_PENDING'
    | 'DOX_PENDING';
  documentEvaluated: boolean;
  myScoreTotal?: number;
  documentMaxScore: number;
  interviewSchedule?: string;
}

export interface ApplicationsResult {
  data: ApplicationSummary[];
  pagination: PaginationMeta;
}

export interface ApplicationsResponse extends ApiResponse<ApplicationsResult> {}

/** useApplicationsQuery 옵션 */
export interface UseApplicationsQueryOptions {
  recruitmentId: number;
  evaluationStatus?: 'ALL' | 'EVALUATED' | 'NOT_EVALUATED';
  keyword?: string;
  page?: number;
  size?: number;
  tokens?: Tokens;
}

const APPS_STALE_TIME = 1000 * 60 * 1;
const APPS_CACHE_TIME = 1000 * 60 * 2;

/**
 * 사용자용 지원서 목록 조회 옵션 생성기
 */
export function getApplicationsQueryOptions(
  params: UseApplicationsQueryOptions
) {
  const {
    recruitmentId,
    evaluationStatus = 'ALL',
    keyword = '',
    page = 0,
    size = 9,
    tokens,
  } = params;
  const pageParam = page + 1;

  return {
    queryKey: queryKeys.applications.userList(
      recruitmentId,
      evaluationStatus,
      keyword,
      page,
      size
    ),
    queryFn: () =>
      GET<ApplicationsResponse['result']>(
        `api/v1/applications/recruitment/${recruitmentId}`,
        {
          evaluationStatus,
          keyword,
          page: String(pageParam),
          size: String(size),
        },
        tokens
      ).then((res) => res.result),
    staleTime: APPS_STALE_TIME,
    gcTime: APPS_CACHE_TIME,
    keepPreviousData: true,
    refetchOnMount: true,
    enabled: recruitmentId > 0,
  };
}

export function useApplicationsQuery(params: UseApplicationsQueryOptions) {
  return useSuspenseQuery<ApplicationsResult, Error>(
    getApplicationsQueryOptions(params)
  );
}

export function useApplicationsClientQuery(
  params: UseApplicationsQueryOptions
): UseQueryResult<ApplicationsResult, Error> {
  return useQuery<ApplicationsResult, Error>(
    getApplicationsQueryOptions(params)
  );
}
