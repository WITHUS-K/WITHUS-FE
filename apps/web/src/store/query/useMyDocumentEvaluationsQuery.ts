import { useQuery } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '../constants/queryKeys';
import type { Tokens } from '@web/api/types';

export interface MyEvaluationItem {
  id: number;
  name: string;
  email: string;
  positionName: string;
  status: string;
}

export interface MyDocumentEvaluationsResult {
  pending: MyEvaluationItem[];
  done: MyEvaluationItem[];
}

export interface MyDocumentEvaluationsResponse {
  code: number;
  message: string;
  result: MyDocumentEvaluationsResult;
  success: boolean;
}

export function getMyDocumentEvaluationsQueryOptions(
  recruitmentId: number,
  tokens?: Tokens
) {
  return {
    queryKey: queryKeys.recruitments.myDocumentEvaluations(recruitmentId),
    queryFn: async () => {
      const res = await GET<MyDocumentEvaluationsResponse['result']>(
        `api/v1/recruitments/${recruitmentId}/my/evaluations/documents`,
        undefined,
        tokens
      );
      return res.result;
    },
    enabled: !!recruitmentId,
  };
}

export function useMyDocumentEvaluationsQuery(recruitmentId: number) {
  return useQuery<MyDocumentEvaluationsResult, Error>(
    getMyDocumentEvaluationsQueryOptions(recruitmentId)
  );
}