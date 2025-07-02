import type { UseSuspenseQueryOptions } from '@tanstack/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '@web/store/constants/queryKeys';
import type { Tokens } from '@web/api/types';

export interface MyEvaluationItemDto {
  id: number;
  name: string;
  email: string;
  positionName: string;
  status: string;
}

export interface MyDocumentEvaluationsDto {
  pending: MyEvaluationItemDto[];
  done: MyEvaluationItemDto[];
}

const STALE_TIME = 1000 * 60;

export function getMyDocumentEvaluationsQueryOptions(
  recruitmentId: number,
  tokens: Tokens
): UseSuspenseQueryOptions<MyDocumentEvaluationsDto, Error> {
  return {
    queryKey: queryKeys.recruitments.myDocumentEvaluations(recruitmentId),
    queryFn: () =>
      GET<MyDocumentEvaluationsDto>(
        `api/v1/recruitments/${recruitmentId}/my/evaluations/documents`,
        undefined,
        tokens
      ).then(res => res.result),
    staleTime: STALE_TIME,
  };
}

export function useMyDocumentEvaluationsQuery(
  recruitmentId: number,
  tokens: Tokens
) {
  return useSuspenseQuery(
    getMyDocumentEvaluationsQueryOptions(recruitmentId, tokens)
  );
}