import type { UseSuspenseQueryOptions } from '@tanstack/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '@web/store/constants/queryKeys';
import type { Tokens } from '@web/api/types';

export interface RecruitmentProgressDto {
  positionName: string;
  daysToDeadline: number;
  totalToEvaluate: number;
  evaluatedCount: number;
  notEvaluatedCount: number;
  progressPercent: number;
}

const STALE_TIME = 1000 * 60; 

export function getRecruitmentProgressQueryOptions(
  recruitmentId: number,
  stage: 'DOCUMENT' | 'INTERVIEW',
  tokens?: Tokens
): UseSuspenseQueryOptions<RecruitmentProgressDto[], Error> {
  return {
    queryKey: queryKeys.admin.recruitmentProgress(recruitmentId, stage),
    queryFn: () =>
      GET<RecruitmentProgressDto[]>(
        `api/v1/admin/recruitments/${recruitmentId}/progress`,
        { stage },
        tokens
      ).then(res => res.result),
    staleTime: STALE_TIME,
  };
}

export function useRecruitmentProgressQuery(
  recruitmentId: number,
  stage: 'DOCUMENT' | 'INTERVIEW',
  tokens?: Tokens
) {
  return useSuspenseQuery(
    getRecruitmentProgressQueryOptions(recruitmentId, stage, tokens)
  );
}