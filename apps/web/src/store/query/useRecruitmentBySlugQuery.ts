import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import type { UseSuspenseQueryOptions } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import type {
  RecruitmentDetailResponse,
  RecruitmentDetailDto,
} from '@web/types/recruitment';
import { queryKeys } from '@web/store/constants/queryKeys';
import type { Tokens } from '@web/api/types';

const STALE_TIME = 1000 * 60 * 30;
const GC_TIME = 1000 * 60 * 60;

export interface RecruitmentBySlugParams {
  slug: string;
  tokens?: Tokens;
}

export function getRecruitmentBySlugQueryOptions(
  params: RecruitmentBySlugParams
): UseSuspenseQueryOptions<RecruitmentDetailDto, Error> {
  const { slug, tokens } = params;

  return queryOptions<RecruitmentDetailDto>({
    queryKey: queryKeys.recruitments.slug(slug),
    queryFn: () =>
      GET<RecruitmentDetailResponse['result']>(
        `api/v1/recruitments/slug/${slug}`,
        undefined,
        tokens
      ).then((res) => res.result),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}

export function useRecruitmentBySlugQuery(params: RecruitmentBySlugParams) {
  return useSuspenseQuery(getRecruitmentBySlugQueryOptions(params));
}
