import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POST, PUT, DELETE } from '@web/api/fetch';
import { queryKeys } from '../constants';

export interface DocumentCommentItem {
  id: number;
  content: string;
  createdAt: string;
  user: {
    userId: number;
    name: string;
    profileImageUrl?: string;
    profileColor: string;
  };
}

// 1) 추가
export interface AddDocumentCommentRequest {
  content: string;
  type: 'DOCUMENT';
}
export function useAddDocumentCommentMutation(applicationId: number) {
  const qc = useQueryClient();
  return useMutation<DocumentCommentItem, Error, AddDocumentCommentRequest>({
    mutationFn: async (body) => {
      // POST<DocumentCommentItem> 으로 제네릭 지정
      const res = await POST<DocumentCommentItem>(
        `api/v1/applications/${applicationId}/comments`,
        body
      );
      console.log(res);
      return res.result;
    },
    onSuccess: () => {
      // invalidateQueries 호출 시 옵션 객체로 queryKey 전달
      qc.invalidateQueries({
        queryKey: queryKeys.applications.detail(applicationId),
      });
    },
  });
}

// 2) 수정
export interface UpdateDocumentCommentRequest {
  commentId: number;
  content: string;
}
export function useUpdateDocumentCommentMutation(applicationId: number) {
  const qc = useQueryClient();
  return useMutation<DocumentCommentItem, Error, UpdateDocumentCommentRequest>({
    mutationFn: async ({ commentId, content }) => {
      // PUT<DocumentCommentItem> 으로 제네릭 지정
      const res = await PUT<DocumentCommentItem>(
        `api/v1/applications/${applicationId}/comments/${commentId}`,
        { content }
      );
      console.log(res);
      return res.result;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.applications.detail(applicationId),
      });
    },
  });
}

// 3) 삭제
export function useDeleteDocumentCommentMutation(applicationId: number) {
  const qc = useQueryClient();
  return useMutation<void, Error, { commentId: number }>({
    mutationFn: async ({ commentId }) => {
      await DELETE<void>(
        `api/v1/applications/${applicationId}/comments/${commentId}`
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.applications.detail(applicationId),
      });
    },
  });
}
