import { useQuery } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import type { Tokens } from '@web/api/types';

export interface PendingEvaluator {
  userId: number;
  name: string;
  profileImageUrl: string | null;
}

export interface PendingEvaluatorsResult {
  stage: string;
  deadline: string;
  daysToDeadline: number;
  hoursToDeadline: number;
  minutesToDeadline: number;
  users: PendingEvaluator[];
}

export interface PendingEvaluatorsResponse {
  code: number;
  message: string;
  result: PendingEvaluatorsResult;
  success: boolean;
}

export function getPendingEvaluatorsQueryOptions(
  recruitmentId: number,
  tokens?: Tokens
) {
  return {
    queryKey: ['admin', 'recruitments', recruitmentId, 'pending-evaluators'] as const,
    queryFn: async () => {
      const res = await GET<PendingEvaluatorsResponse['result']>(
        `api/v1/admin/recruitments/${recruitmentId}/pending-evaluators`,
        undefined,
        tokens
      );
      return res.result;
    },
    enabled: !!recruitmentId,
  };
}

export function usePendingEvaluatorsQuery(recruitmentId: number) {
  return useQuery<PendingEvaluatorsResult, Error>(
    getPendingEvaluatorsQueryOptions(recruitmentId)
  );
}