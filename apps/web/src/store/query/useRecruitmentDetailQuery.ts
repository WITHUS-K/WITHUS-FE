'use client';
import { useQuery } from '@tanstack/react-query';
import { GET } from '@web/api';
import type { RecruitmentDetailResponse } from '@web/types/recruitment';

const STALE_TIME = 1000 * 60 * 2;
const GC_TIME = 1000 * 60 * 3;

export const recruitmentDetailKey = (id: number) =>
  ['recruitments', id] as const;

export function useRecruitmentDetailQuery(recruitmentId: number | null) {
  return useQuery<RecruitmentDetailResponse['result'], Error>({
    queryKey:
      recruitmentId != null
        ? recruitmentDetailKey(recruitmentId)
        : ['recruitments', 'detail', null],
    queryFn: () =>
      GET<RecruitmentDetailResponse['result']>(
        `api/v1/recruitments/${recruitmentId}`
      ).then((res) => res.result),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    enabled: recruitmentId != null,
  });
}
