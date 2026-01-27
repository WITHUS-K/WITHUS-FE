import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POST, PUT, DELETE } from '@web/api/fetch';
import { queryKeys } from '../constants';

export type CommentType = 'DOCUMENT' | 'INTERVIEW';

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

export interface InterviewCommentItem {
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


// =========================
// 1) 추가
// =========================
export interface AddCommentRequest {
  content: string;
  type: CommentType; // ✅ DOCUMENT | INTERVIEW
}

/** ✅ 범용 추가 (DOCUMENT/INTERVIEW) */
export function useAddCommentMutation(applicationId: number) {
  const qc = useQueryClient();

  return useMutation<DocumentCommentItem, Error, AddCommentRequest>({
    mutationFn: async (body) => {
      console.log("코멘트", body)
      const res = await POST<DocumentCommentItem>(
        `api/v1/applications/${applicationId}/comments`,
        body
      );
      return res.result;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.applications.detail(applicationId),
      });
      
    },
  });
}

/** ✅ 기존 호환: 서류 전용 */
export function useAddDocumentCommentMutation(applicationId: number) {
  const mut = useAddCommentMutation(applicationId);
  return {
    ...mut,
    mutate: (vars: Omit<AddCommentRequest, 'type'>, options?: any) =>
      mut.mutate({ ...vars, type: 'DOCUMENT' }, options),
    mutateAsync: (vars: Omit<AddCommentRequest, 'type'>, options?: any) =>
      mut.mutateAsync({ ...vars, type: 'DOCUMENT' }, options),
  };
}

/** ✅ 추가: 면접 전용 */
export function useAddInterviewCommentMutation(applicationId: number) {
  const mut = useAddCommentMutation(applicationId);
  return {
    ...mut,
    mutate: (vars: Omit<AddCommentRequest, 'type'>, options?: any) =>
      mut.mutate({ ...vars, type: 'INTERVIEW' }, options),
    mutateAsync: (vars: Omit<AddCommentRequest, 'type'>, options?: any) =>
      mut.mutateAsync({ ...vars, type: 'INTERVIEW' }, options),
  };
}

// =========================
// 2) 수정 (DOCUMENT/INTERVIEW 공통)
// =========================
export interface UpdateCommentRequest {
  commentId: number;
  content: string;
}

export function useUpdateDocumentCommentMutation(applicationId: number) {
  const qc = useQueryClient();

  return useMutation<DocumentCommentItem, Error, UpdateCommentRequest>({
    mutationFn: async ({ commentId, content }) => {
      const res = await PUT<DocumentCommentItem>(
        `api/v1/applications/${applicationId}/comments/${commentId}`,
        { content }
      );
      return res.result;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.applications.detail(applicationId),
      });
    },
  });
}

// ✅ 인터뷰도 수정 로직이 동일하면 alias로 하나 더 제공
export const useUpdateInterviewCommentMutation = useUpdateDocumentCommentMutation;

// =========================
// 3) 삭제 (DOCUMENT/INTERVIEW 공통)
// =========================
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

// ✅ 인터뷰도 삭제 로직이 동일하면 alias로 하나 더 제공
export const useDeleteInterviewCommentMutation = useDeleteDocumentCommentMutation;
