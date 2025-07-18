import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import type { UseSuspenseQueryOptions } from '@tanstack/react-query';
import { GET_PUBLIC } from '@web/api/fetchPublic';
import type {
  RecruitmentDetailResponse,
  RecruitmentDetailDto,
} from '@web/types/recruitment';
import { queryKeys } from '@web/store/constants/queryKeys';

const STALE_TIME = 1000 * 60 * 30;
const GC_TIME = 1000 * 60 * 60;

export interface RecruitmentBySlugParams {
  slug: string;
}

export function getRecruitmentBySlugQueryOptions(
  params: RecruitmentBySlugParams
): UseSuspenseQueryOptions<RecruitmentDetailDto, Error> {
  const { slug } = params;

  return queryOptions<RecruitmentDetailDto>({
    queryKey: queryKeys.recruitments.slug(slug),
    queryFn: () =>
      GET_PUBLIC<RecruitmentDetailResponse['result']>(
        `api/v1/recruitments/slug/${slug}`,
        undefined
      ).then((res) => res.result),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}

export function useRecruitmentBySlugQuery(params: RecruitmentBySlugParams) {
  return useSuspenseQuery(getRecruitmentBySlugQueryOptions(params));
}

export async function fetchRecruitmentBySlug(
  slug: string
): Promise<RecruitmentDetailDto> {
  const res = await GET_PUBLIC<RecruitmentDetailResponse['result']>(
    `api/v1/recruitments/slug/${slug}`
  );
  return res.result;
}
