import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POST } from '@web/api/fetch';
import { queryKeys } from '../constants';

export interface AddInterviewQuestionRequest {
  content: string;
}

export type InterviewQuestionItem = {
  id: number;
  content: string;
};

export function useAddInterviewQuestionMutation(
  applicationId: number,
  timeSlotId: number
) {
  const qc = useQueryClient();
  return useMutation<InterviewQuestionItem, Error, AddInterviewQuestionRequest>(
    {
      mutationFn: async (body) => {
        const res = await POST<InterviewQuestionItem>(
          `api/v1/applications/${applicationId}/questions`,
          body
        );
        console.log(body);
        console.log(res);
        return res.result;
      },
      onSuccess: () => {
        qc.invalidateQueries({
          queryKey: queryKeys.timeSlot.applications(timeSlotId),
        });
      },
    }
  );
}
