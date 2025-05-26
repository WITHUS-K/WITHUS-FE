// src/store/mutation/useUpdateEvaluators.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POST } from '@web/api/fetch';

// API 요청·응답 타입 정의
export interface UpdateEvaluatorsRequest {
  applicationId: number;
  evaluationType: 'DOCUMENT' | 'INTERVIEW';
  evaluatorIds: number[];
}

export interface UpdateEvaluatorsResponse {
  code: number;
  message: string;
  result: string; // swagger 예시: 문자열
  success: boolean;
}

/**
 * 지원서별 평가 담당자 재배정 훅
 * POST /api/v1/admin/applications/evaluators
 */
export function useUpdateEvaluators(
  recruitmentId: number,
  stage: 'DOCUMENT' | 'INTERVIEW'
) {
  const qc = useQueryClient();
  const listPrefix = [
    'admin',
    'applications',
    'recruitment',
    recruitmentId,
    'list',
    stage,
  ] as const;

  return useMutation<string, Error, UpdateEvaluatorsRequest>({
    mutationFn: async (body) => {
      const res = await POST<UpdateEvaluatorsResponse['result']>(
        'api/v1/admin/applications/evaluators',
        body
      );
      console.log('담당자', res);
      return res.result;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: listPrefix });
    },
  });
}
