import { useMutation } from '@tanstack/react-query';
import { POST } from '@web/api/fetch';

export function useRemindEvaluatorsMutation() {
  return useMutation({
    mutationFn: (recruitmentId: number) =>
      POST(`api/v1/evaluations/remind?recruitmentId=${recruitmentId}`),
  });
}
