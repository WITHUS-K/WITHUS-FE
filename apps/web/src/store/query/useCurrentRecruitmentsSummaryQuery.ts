import type { UseSuspenseQueryOptions } from '@tanstack/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '@web/store/constants/queryKeys';
import type { Tokens } from '@web/api/types';

export interface RecruitmentSummaryDto {
  recruitmentId: number;
  title: string;
  dDays: {
    label: string;
    date: string;
    daysRemaining: number;
    isPassed: boolean;
  }[];
  organizationName: string;
  totalApplicants: number;
  positionCounts: {
    positionName: string;
    count: number;
  }[];
}

const STALE_TIME = 1000 * 60; 

export function getCurrentRecruitmentsSummaryQueryOptions(
  tokens?: Tokens
): UseSuspenseQueryOptions<RecruitmentSummaryDto[], Error> {
  return {
    queryKey: queryKeys.admin.currentRecruitmentsSummary(),
    queryFn: () =>
      GET<RecruitmentSummaryDto[]>( 
        'api/v1/admin/recruitments/current/summary',
        undefined,
        tokens
      ).then(res => res.result), 
    staleTime: STALE_TIME,
  };
}

export function useCurrentRecruitmentsSummaryQuery(tokens?: Tokens) {
  return useSuspenseQuery(
    getCurrentRecruitmentsSummaryQueryOptions(tokens)
  );
}