import {
  keepPreviousData,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants';
import { Tokens } from '@web/api/types';

// =========================
// API 파라미터 타입
// =========================

export type AdminApplicationStage =
  | 'DOCUMENT'
  | 'INTERVIEW'
  | 'FINAL_PASS'
  | 'FAIL';

export type AdminApplicationSortBy =
  | 'LATEST'
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

export type AdminApplicationStatus =
  | 'PENDING'
  | 'DOX_PASS'
  | 'DOX_FAIL'
  | 'DOX_PENDING'
  | 'INTERVIEW_PASS'
  | 'INTERVIEW_FAIL'
  | 'INTERVIEW_PENDING';

// =========================
// API 응답 DTO
// =========================

export interface AdminApplicationSummary {
  sequence: string;
  id: number;
  name: string;
  organizationRoleName: string;
  status: AdminApplicationStatus;

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

// =========================
// Query Options
// =========================

export interface UseAdminApplicationsQueryOptions {
  recruitmentId: number;

  stage?: AdminApplicationStage;
  sortBy?: AdminApplicationSortBy;
  direction?: AdminApplicationDirection;

  organizationRoleIds?: number[];
  statuses?: AdminApplicationStatus[];
  keyword?: string;

  page?: number;
  size?: number;

  tokens?: Tokens;
}

const ADMIN_APPS_STALE_TIME = 1000 * 60 * 2;
const ADMIN_APPS_GC_TIME = 1000 * 60 * 3;

/**
 * GET 래퍼가 Record<string, string> 쿼리만 받는다고 가정하고,
 * 배열/옵셔널 값을 string으로 직렬화해서 넘깁니다.
 */
function toAdminAppsQueryParams(input: {
  stage: AdminApplicationStage;
  sortBy: AdminApplicationSortBy;
  direction: AdminApplicationDirection;
  page: number;
  size: number;
  organizationRoleIds?: number[];
  statuses?: AdminApplicationStatus[];
  keyword?: string;
}): Record<string, string> {
  const params: Record<string, string> = {
    stage: input.stage,
    sortBy: input.sortBy,
    direction: input.direction,
    page: String(input.page),
    size: String(input.size),
  };

  // 서버가 comma-separated를 받는다는 전제: "1,2,3"
  // 만약 "organizationRoleIds=1&organizationRoleIds=2" 반복키만 받는 서버면
  // GET 래퍼를 URLSearchParams 지원하도록 바꾸거나, path에 직접 쿼리를 붙이는 방식이 필요합니다.
  if (input.organizationRoleIds?.length) {
    params.organizationRoleIds = input.organizationRoleIds.join(',');
  }

  if (input.statuses?.length) {
    params.statuses = input.statuses.join(',');
  }

  const kw = input.keyword?.trim();
  if (kw) {
    params.keyword = kw;
  }

  return params;
}

/**
 * (중요) 필터까지 queryKey에 포함시켜야 캐시가 정확합니다.
 * 기존 queryKeys.applications.list가 6개 인자만 받는 구조라면,
 * 이 파일에서 로컬 key를 만들어서 사용합니다.
 *
 * 만약 queryKeys를 확장했다면, 여기 대신 queryKeys.applications.list(...)로 바꿔도 됩니다.
 */
function adminApplicationsListKey(params: {
  recruitmentId: number;
  stage: AdminApplicationStage;
  sortBy: AdminApplicationSortBy;
  direction: AdminApplicationDirection;
  page: number;
  size: number;
  organizationRoleIds?: number[];
  statuses?: AdminApplicationStatus[];
  keyword?: string;
}) {
  return [
    // 기존 컨벤션 최대한 유지
    ...queryKeys.applications.list(
      params.recruitmentId,
      params.stage,
      params.sortBy,
      params.direction,
      params.page,
      params.size
    ),
    // ✅ 필터를 뒤에 붙여 캐시 분리
    params.organizationRoleIds ?? [],
    params.statuses ?? [],
    params.keyword?.trim() ?? '',
  ] as const;
}

/**
 * 공통 옵션 헬퍼
 */
export function getAdminApplicationsQueryOptions(params: UseAdminApplicationsQueryOptions) {
  const {
    recruitmentId,
    stage = 'DOCUMENT',
    sortBy = 'LATEST',
    direction = 'DESC',
    organizationRoleIds,
    statuses,
    keyword,
    page = 0,
    size = 20,
    tokens,
  } = params;

  return {
    // ✅ 필터까지 포함된 key 사용
    queryKey: queryKeys.applications.adminList({
      recruitmentId,
      stage,
      sortBy,
      direction,
      page,
      size,
      organizationRoleIds,
      statuses,
      keyword,
    }),
    queryFn: async () => {
      const query = toAdminAppsQueryParams({
        stage,
        sortBy,
        direction,
        page,
        size,
        organizationRoleIds,
        statuses,
        keyword,
      });

      const res = await GET<AdminApplicationsResult>(
        `api/v1/admin/applications/recruitment/${recruitmentId}`,
        query,
        tokens
      );

      return res.result;
    },
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 3,
    enabled: recruitmentId > 0,
    placeholderData: keepPreviousData,
  } as const;
}

export function useAdminApplicationsClientQuery(params: UseAdminApplicationsQueryOptions) {
  return useQuery<AdminApplicationsResult, Error>(getAdminApplicationsQueryOptions(params));
}

export function useAdminApplicationsQuery(params: UseAdminApplicationsQueryOptions) {
  return useSuspenseQuery<AdminApplicationsResult, Error>(getAdminApplicationsQueryOptions(params));
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
