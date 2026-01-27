import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DELETE } from '@web/api/fetch';
import { queryKeys } from '../constants';

export interface DeleteQuestionRequest {
  questionId: number;
}

export function useDeleteInterviewQuestionMutation(
  applicationId: number,
  timeSlotId: number
) {
  const qc = useQueryClient();

  return useMutation<string, Error, DeleteQuestionRequest>({
    mutationFn: async ({ questionId }) => {
      const res = await DELETE<string>(
        `api/v1/applications/${applicationId}/questions/${questionId}`
      );
      return res.result;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.timeSlot.applications(timeSlotId),
        
      });
      qc.invalidateQueries({ queryKey: queryKeys.applications.detail(applicationId) })
    },
  });
}