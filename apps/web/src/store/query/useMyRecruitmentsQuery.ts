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
  organizationId: number;
  tokens?: Tokens;
}

export async function fetchMyRecruitments(
  tokens: Tokens,
  organizationId: number
): Promise<RecruitmentSummary[]> {
  const res: { result: RecruitmentSummary[] } = await GET(
    `api/v1/recruitments/organizations/${organizationId}`,
    undefined,
    tokens
  );
  return res.result;
}

export async function fetchFirstMyRecruitmentId(
  tokens: Awaited<ReturnType<typeof getServerSideTokens>>,
  organizationId: number
) {
  const recruitments = await fetchMyRecruitments(tokens, organizationId);
  return recruitments?.[0]?.recruitmentId ?? null;
}

// 내가 속한 조직의 모든 공고
export function getMyRecruitmentsListQueryOptions({
  organizationId,
  tokens,
}: RecruitmentListParams): UseSuspenseQueryOptions<
  RecruitmentSummary[],
  Error
> {
  return queryOptions<RecruitmentSummary[]>({
    queryKey: queryKeys.recruitments.listByOrganization(organizationId),
    queryFn: () =>
      GET<RecruitmentSummary[]>(
        `api/v1/recruitments/organizations/${organizationId}`,
        undefined,
        tokens
      ).then((res) => res.result),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}

export function useMyRecruitmentsQuery(params: RecruitmentListParams) {
  return useSuspenseQuery(getMyRecruitmentsListQueryOptions(params));
}
