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

export function useBulkEvaluationsMutation({
  applicationId,
  recruitmentId,
  evaluationStatus = 'ALL',
  keyword = '',
  page = 0,
  size = 9,
}: {
  applicationId: number;
  recruitmentId: number;
  evaluationStatus?: 'ALL' | 'EVALUATED' | 'NOT_EVALUATED';
  keyword?: string;
  page?: number;
  size?: number;
}) {
  const qc = useQueryClient();

  return useMutation<
    BulkEvaluationResponse['result'],
    Error,
    BulkEvaluationRequest
  >({
    mutationFn: async (data) => {
      try {
        const res = await POST<BulkEvaluationResponse['result']>(
          'api/v1/evaluations/bulk',
          data
        );
        console.log('[BulkEvaluations] server response envelope:', res);
        return res.result;
      } catch (err: any) {
        console.error('[BulkEvaluations] request payload:', data);

        if (err.response) {
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

      qc.invalidateQueries({
        queryKey: queryKeys.applications.userList(
          recruitmentId,
          evaluationStatus,
          keyword,
          page,
          size
        ),
      });

      qc.invalidateQueries({
        queryKey: queryKeys.recruitments.myDocumentEvaluations(recruitmentId),
      });
    },
    

    onError: (error: any) => {
      console.error('[BulkEvaluations] mutation error:', error);
    },
  });
}
