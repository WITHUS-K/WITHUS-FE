import {
  queryOptions,
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { HTTPError } from 'ky';
import { queryKeys } from '../constants';
import { Tokens } from '@web/api/types';

export interface AssignmentItem {
  positionName: string;
  organizationRoleName: string;
  evaluationType: 'DOCUMENT' | 'INTERVIEW';
  count: number;
}

export interface LatestDistribution {
  id: number;
  recruitmentId: number;
  assignments: AssignmentItem[];
}

const LATEST_DIST_STALE_TIME = 1000 * 60;
const LATEST_DIST_GC_TIME = 1000 * 60 * 5;

export type GetLatestDistributionParams = {
  recruitmentId: number;
  tokens?: Tokens;
};

/**
 * 최신 분배 정보를 가져올 쿼리 옵션
 * 404 에러는 null 로 처리
 */
/**
 * 최신 분배 정보를 가져올 쿼리 옵션
 * 404 에러는 null 로 처리
 */
export function getLatestDistributionQueryOptions({
  recruitmentId,
  tokens,
}: GetLatestDistributionParams): UseSuspenseQueryOptions<
  LatestDistribution | null,
  Error
> {
  return queryOptions<LatestDistribution | null, Error>({
    queryKey: queryKeys.distribution.latest(recruitmentId),
    queryFn: async () => {
      try {
        const res = await GET<LatestDistribution>(
          `api/v1/admin/applications/distribute-evaluators/latest/${recruitmentId}`,
          undefined,
          tokens
        );
        return res.result;
      } catch (err: any) {
        // response.status가 404면 null 리턴
        if (err?.response?.status === 404) {
          return null;
        }
        // 그 외 에러는 다시 던져서 React Query가 처리하게
        throw null;
      }
    },
    staleTime: LATEST_DIST_STALE_TIME,
    gcTime: LATEST_DIST_GC_TIME,
    retry: false,
    enabled: recruitmentId > 0,
  });
}

export function useLatestDistributionQuery(
  params: GetLatestDistributionParams
) {
  return useSuspenseQuery(getLatestDistributionQueryOptions(params));
}
