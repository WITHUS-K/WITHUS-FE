import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants';
import type { ApiResponse, Tokens } from '@web/api/types';

// — 요청/응답 타입 —

// GET /api/v1/recruitments/my-organizations
export interface RecruitmentSummary {
  recruitmentId: number;
  title: string;
}

// — QueryOptions & Hook —
type RecruitmentListQueryKey = ReturnType<typeof queryKeys.recruitment.list>;
type RecruitmentListOptions = UseSuspenseQueryOptions<
  RecruitmentSummary[], // TQueryFnData
  Error, // TError
  RecruitmentSummary[], // TData
  RecruitmentListQueryKey // TQueryKey
>;

export function getRecruitmentsListOptions(
  tokens?: Tokens
): RecruitmentListOptions {
  return {
    queryKey: queryKeys.recruitment.list(),
    queryFn: async () => {
      const res = await GET<RecruitmentSummary[]>(
        'api/v1/recruitments/my-organizations',
        undefined,
        tokens
      );
      console.log(res);
      return res.result;
    },
    staleTime: 1000 * 60 * 5,
  };
}

export function useRecruitmentsQuery(
  tokens?: Tokens
): UseSuspenseQueryResult<RecruitmentSummary[], Error> {
  return useSuspenseQuery<RecruitmentSummary[], Error>({
    queryKey: queryKeys.recruitment.list(),
    queryFn: async () => {
      const res = await GET<RecruitmentSummary[]>(
        'api/v1/recruitments/my-organizations',
        undefined,
        tokens
      );
      console.log(res);
      return res.result;
    },
    staleTime: 1000 * 60 * 5,
  });
}
