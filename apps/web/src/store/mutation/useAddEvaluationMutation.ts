// src/store/mutation/useEvaluationMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POST } from '@web/api/fetch';
import { queryKeys } from '../constants';
import type { TimeSlotApplication } from '@web/store/query/useTimeSlotApplicationsQuery';

export interface AddEvaluationRequest {
  applicationId: number;
  criteriaId: number;
  score: number;
}
export type EvaluationItem = {
  id: number;
  criteria: { id: number; content: string; type: string };
  score: number;
  user: { userId: number; name: string; profileImageUrl?: string };
};

export function useAddEvaluationMutation(
  applicationId: number,
  timeSlotId: number
) {
  const qc = useQueryClient();
  const key = queryKeys.timeSlot.applications(timeSlotId);

  return useMutation<EvaluationItem, Error, AddEvaluationRequest>({
    mutationFn: async (body) => {
      console.log('addEvaluation body:', body);
      const res = await POST<EvaluationItem>(`api/v1/evaluations`, body);
      console.log('addEvaluation response:', res);
      return res.result;
    },
    onSuccess: (newEval) => {
      // 1) 캐시에서 해당 timeSlotId 지원서들 가져오기
      qc.setQueryData<TimeSlotApplication[]>(key, (apps) => {
        if (!apps) return apps;
        return apps.map((app) => {
          if (app.applicationId !== applicationId) return app;
          // 2) 기존 동일 기준이 있으면 덮어쓰고, 없으면 append
          const idx = app.evaluations.findIndex(
            (e) => e.criteria.id === newEval.criteria.id
          );
          const updatedEvals =
            idx >= 0
              ? app.evaluations.map((e) =>
                  e.criteria.id === newEval.criteria.id ? newEval : e
                )
              : [...app.evaluations, newEval];
          return { ...app, evaluations: updatedEvals };
        });
      });
    },
  });
}
