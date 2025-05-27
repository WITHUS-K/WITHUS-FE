// src/web/store/mutation/useBulkEvaluations.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POST } from '@web/api/fetch';
import { queryKeys } from '../constants';

export interface DocumentEvaluationCriteria {
  id: number;
  content: string;
  description: string;
  type: 'DOCUMENT' | 'INTERVIEW' | string;
  score: number;
}

export interface BulkEvaluationRequest {
  applicationId: number;
  evaluations: {
    criteriaId: number;
    score: number;
  }[];
}

export interface BulkEvaluationResponse {
  code: number;
  message: string;
  result: Array<{
    id: number;
    criteria: DocumentEvaluationCriteria;
    score: number;
    user: {
      userId: number;
      name: string;
      profileImageUrl?: string;
      profileColor: string;
    };
  }>;
  success: boolean;
}

export function useBulkEvaluationsMutation(applicationId: number) {
  const qc = useQueryClient();

  return useMutation<
    BulkEvaluationResponse['result'], // TData
    Error,
    BulkEvaluationRequest // TVariables
  >({
    mutationFn: async (data) => {
      try {
        // ▶ 제네릭을 BulkEvaluationResponse 전체로 지정
        const res = await POST<BulkEvaluationResponse['result']>(
          'api/v1/evaluations/bulk',
          data
        );
        console.log('[BulkEvaluations] server response envelope:', res);
        return res.result;
      } catch (err: any) {
        console.error('[BulkEvaluations] request payload:', data);

        if (err.response) {
          // 서버가 돌려준 JSON을 정확히 읽어봅니다
          try {
            const body = await err.response.json();
            console.error('[BulkEvaluations] error response JSON:', body);
          } catch {
            const text = await err.response.text();
            console.error('[BulkEvaluations] error response text:', text);
          }
        }
        throw err;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.applications.detail(applicationId),
      });
    },
    onError: (error: any) => {
      console.error('[BulkEvaluations] mutation error:', error);
    },
  });
}
