import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POST } from '@web/api/fetch';
import { queryKeys } from '../constants';
import type { CommentItem } from '@web/store/query/useTimeSlotApplicationsQuery';

export interface AddCommentRequest {
  content: string;
  type: 'INTERVIEW';
}
export interface AddCommentResponse {
  result: CommentItem;
}

// 새 코멘트 추가 Mutation
export function useAddCommentMutation(
  applicationId: number,
  timeSlotId: number
) {
  const qc = useQueryClient();
  return useMutation<CommentItem, Error, AddCommentRequest>({
    mutationFn: async (body) => {
      const res = await POST<CommentItem>(
        `api/v1/applications/${applicationId}/comments`,
        body
      );
      console.log('코멘트', body);
      console.log('코멘트', res);
      return res.result;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.timeSlot.applications(timeSlotId),
      });
      qc.invalidateQueries({
        queryKey: queryKeys.applications.detail(applicationId),
      });
    },
  });
}
