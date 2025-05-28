// src/web/store/mutation/useInterviewQuestionMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PATCH } from '@web/api/fetch';
import { queryKeys } from '../constants';
import type { InterviewQuestion } from '@web/store/query/useTimeSlotApplicationsQuery';

// ————————————————
// 2) 기존 질문 수정
// ————————————————
export interface UpdateInterviewQuestionRequest {
  questionId: number;
  content: string;
}

export interface UpdateInterviewQuestionResponse {
  code: number;
  message: string;
  result: InterviewQuestion;
  success: boolean;
}

// ————————————————
// 2) 기존 질문 수정 Mutation
// ————————————————
export function useUpdateInterviewQuestionMutation(
  applicationId: number,
  timeSlotId: number
) {
  const qc = useQueryClient();

  return useMutation<InterviewQuestion, Error, UpdateInterviewQuestionRequest>({
    mutationFn: async ({ questionId, content }) => {
      // tell TS that PATCH returns the full API wrapper
      const res = await PATCH<UpdateInterviewQuestionResponse['result']>(
        `api/v1/applications/${applicationId}/questions/${questionId}`,
        { content }
      );
      // return just the inner result object
      return res.result;
    },
    onSuccess: () => {
      // invalidate the time‐slot’s applications list so your UI refetches
      qc.invalidateQueries({
        queryKey: queryKeys.timeSlot.applications(timeSlotId),
      });
    },
  });
}
