import type { UseSuspenseQueryOptions } from '@tanstack/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '@web/store/constants/queryKeys';
import type { Tokens } from '@web/api/types';

export interface RecruitmentPendingEvaluatorsDto {
  stage: 'DOCUMENT' | 'INTERVIEW';
  deadline: string;             
  daysToDeadline: number;
  hoursToDeadline: number;
  minutesToDeadline: number;
  users: {
    userId: number;
    name: string;
    profileImageUrl: string | null;
  }[];
}

const STALE_TIME = 1000 * 60; 

export function getRecruitmentPendingEvaluatorsQueryOptions(
  recruitmentId: number,
  tokens?: Tokens
): UseSuspenseQueryOptions<RecruitmentPendingEvaluatorsDto, Error> {
  return {
    queryKey: queryKeys.admin.recruitmentPendingEvaluators(recruitmentId),
    queryFn: () =>
      GET<RecruitmentPendingEvaluatorsDto>(
        `api/v1/admin/recruitments/${recruitmentId}/pending-evaluators`,
        undefined,
        tokens
      ).then(res => res.result),
    staleTime: STALE_TIME,
  };
}

export function useRecruitmentPendingEvaluatorsQuery(
  recruitmentId: number,
  tokens?: Tokens
) {
  return useSuspenseQuery(
    getRecruitmentPendingEvaluatorsQueryOptions(recruitmentId, tokens)
  );
}