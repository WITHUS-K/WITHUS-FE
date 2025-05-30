import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POST, PUT } from '@web/api/fetch';
import { queryKeys } from '../constants';
import type { CommentItem } from '@web/store/query/useTimeSlotApplicationsQuery';

export interface UpdateCommentRequest {
  commentId: number;
  content: string;
}
export interface UpdateCommentResponse {
  result: {
    id: number;
    content: string;
    type: string;
    createdAt: string;
    user: CommentItem['user'];
  };
}

// 기존 코멘트 수정 Mutation
export function useUpdateCommentMutation(
  applicationId: number,
  timeSlotId: number
) {
  const qc = useQueryClient();
  return useMutation<CommentItem, Error, UpdateCommentRequest>({
    mutationFn: async ({ commentId, content }) => {
      const res = await PUT<CommentItem>(
        `api/v1/applications/${applicationId}/comments/${commentId}`,
        { content }
      );
      console.log('코멘트', content);
      console.log('코멘트', res);
      return { ...res.result, user: res.result.user as CommentItem['user'] };
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
