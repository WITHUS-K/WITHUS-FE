import { useQuery } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';

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

export function useMyDocumentEvaluationsQuery(recruitmentId: number) {
  return useQuery<MyDocumentEvaluationsResult, Error>({
    queryKey: ['recruitments', recruitmentId, 'my', 'evaluations', 'documents'],
    queryFn: async () => {
      const res = await GET<MyDocumentEvaluationsResponse['result']>(
        `api/v1/recruitments/${recruitmentId}/my/evaluations/documents`
      );
      return res.result;
    },
    enabled: !!recruitmentId,
  });
}