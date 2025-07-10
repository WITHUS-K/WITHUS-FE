import {
  keepPreviousData,
  queryOptions,
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import type { ApiResponse } from '@web/api/types';
import { queryKeys } from '../constants';

/** 페이징 메타 정보 */
export interface PaginationMeta {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  isLast: boolean;
}

/** 사용자용 지원서 요약 DTO */
export interface ApplicationSummary {
  documentResultAnnounced: boolean;
  id: number;
  name: string;
  positionName: string;
  status:
    | 'PENDING'
    | 'DOX_PASS'
    | 'DOX_FAIL'
    | 'INTERVIEW_PASS'
    | 'INTERVIEW_FAIL';
  documentEvaluated: boolean;
  myScoreTotal?: number;
  documentMaxScore: number;
  interviewSchedule?: string;
}

/** API 결과 - 페이징 응답 */
export interface ApplicationsResult {
  data: ApplicationSummary[];
  pagination: PaginationMeta;
}

/** 전체 API 응답 래퍼 */
export interface ApplicationsResponse extends ApiResponse<ApplicationsResult> {}

/** useApplicationsQuery 옵션 */
export interface UseApplicationsQueryOptions {
  recruitmentId: number;
  evaluationStatus?: 'ALL' | 'EVALUATED' | 'NOT_EVALUATED';
  keyword?: string;
  page?: number; // 0-based
  size?: number;
}

const APPS_STALE_TIME = 1000 * 60 * 3; // 3분

/**
 * 사용자용 지원서 목록 조회 옵션 생성기
 */
export function getApplicationsQueryOptions({
  recruitmentId,
  evaluationStatus = 'ALL',
  keyword = '',
  page = 0,
  size = 9,
}: UseApplicationsQueryOptions): UseSuspenseQueryOptions<
  ApplicationsResult,
  Error
> {
  return queryOptions<ApplicationsResult, Error>({
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
          page: String(page + 1),
          size: String(size),
        }
      ).then((res) => res.result),
    staleTime: APPS_STALE_TIME,
    placeholderData: keepPreviousData,
    refetchOnMount: true,
    enabled: recruitmentId > 0,
  });
}

export function useApplicationsQuery(params: UseApplicationsQueryOptions) {
  return useSuspenseQuery(getApplicationsQueryOptions(params));
}
