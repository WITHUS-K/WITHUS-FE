import {
  queryOptions,
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { GET } from '@web/api';
import { queryKeys } from '@web/store/constants/queryKeys';
import type { Tokens } from '@web/api/types';
import { getServerSideTokens } from '@web/api/serverSideTokens';

export interface RecruitmentSummary {
  recruitmentId: number;
  title: string;
}

const STALE_TIME = 1000 * 60 * 2;
const GC_TIME = 1000 * 60 * 3;

export interface RecruitmentListParams {
  tokens?: Tokens;
}

export async function fetchRecruitments(
  tokens: Tokens
): Promise<RecruitmentSummary[]> {
  const res: { result: RecruitmentSummary[] } = await GET(
    'api/v1/recruitments/my-organizations',
    undefined,
    tokens
  );
  return res.result;
}

export async function fetchFirstRecruitmentId(
  tokens: Awaited<ReturnType<typeof getServerSideTokens>>
) {
  const recruitments = await fetchRecruitments(tokens);
  return recruitments?.[0]?.recruitmentId ?? null;
}

// 내가 속한 조직의 모든 공고
export function getRecruitmentsListQueryOptions({
  tokens,
}: RecruitmentListParams): UseSuspenseQueryOptions<
  RecruitmentSummary[],
  Error
> {
  return queryOptions<RecruitmentSummary[]>({
    queryKey: queryKeys.recruitment.list(),
    queryFn: () =>
      GET<RecruitmentSummary[]>(
        'api/v1/recruitments/my-organizations',
        undefined,
        tokens
      ).then((res) => res.result),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}

export function useRecruitmentsQuery(params: RecruitmentListParams = {}) {
  return useSuspenseQuery(getRecruitmentsListQueryOptions(params));
}
