import { keepPreviousData, useQuery } from '@tanstack/react-query';
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

/**
 * 사용자용 지원서 목록 조회
 */
export function useApplicationsQuery({
  recruitmentId,
  evaluationStatus = 'ALL',
  keyword = '',
  page = 0,
  size = 9,
}: UseApplicationsQueryOptions) {
  return useQuery<ApplicationsResult, Error>({
    // 1) 객체 형태로 queryKey, queryFn, 옵션을 한 번에 전달
    queryKey: queryKeys.applications.userList(
      recruitmentId,
      evaluationStatus,
      keyword,
      page,
      size
    ),
    queryFn: async () => {
      const params = {
        evaluationStatus,
        keyword,
        page: String(page + 1), // API는 1-based page
        size: String(size),
      };
      console.log('서류 리스트', params);
      const res = await GET<ApplicationsResponse['result']>(
        `api/v1/applications/recruitment/${recruitmentId}`,
        params
      );
      console.log('서류 리스트', res);
      return res.result;
    },

    placeholderData: keepPreviousData,
    refetchOnMount: true,
    enabled: recruitmentId > 0,
  });
}
