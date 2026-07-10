import {
  queryOptions,
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { GET } from '@web/api';
import type {
  RecruitmentDetailResponse,
  RecruitmentDetailDto,
} from '@web/types/recruitment';
import { queryKeys } from '@web/store/constants/queryKeys';
import type { Tokens } from '@web/api/types';

const STALE_TIME = 1000 * 60 * 30;
const GC_TIME = 1000 * 60 * 60;

export interface RecruitmentDetailParams {
  recruitmentId: number;
  tokens?: Tokens;
}

export function getRecruitmentDetailQueryOptions({
  recruitmentId,
  tokens,
}: RecruitmentDetailParams): UseSuspenseQueryOptions<
  RecruitmentDetailDto,
  Error
> {
  return queryOptions<RecruitmentDetailDto>({
    queryKey: queryKeys.recruitment.detail(recruitmentId),
    queryFn: async () => {
      const res = await GET<RecruitmentDetailResponse['result']>(
        `api/v1/recruitments/${recruitmentId}`,
        undefined,
        tokens
      );

      return res.result;
    },

    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    enabled: recruitmentId > 0,
  });
}

export function useRecruitmentDetailQuery(params: RecruitmentDetailParams) {
  return useSuspenseQuery(getRecruitmentDetailQueryOptions(params));
}
