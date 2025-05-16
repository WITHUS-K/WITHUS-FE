// src/store/query/useCreateInterview.ts
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import { POST } from '@web/api/fetch';
import { queryKeys } from '../constants';

// — 요청/응답 타입 —
// POST /api/v1/interviews/recruitments/{recruitmentId}/interviews
// → 면접 생성, 반환값은 interviewId
export type CreateInterviewResult = number;
export type CreateInterviewVariables = { recruitmentId: number };

// — Hook & Mutation —
export function useCreateInterviewMutation(): UseMutationResult<
  CreateInterviewResult, // TData
  Error, // TError
  CreateInterviewVariables // TVariables
> {
  const qc = useQueryClient();

  return useMutation<CreateInterviewResult, Error, CreateInterviewVariables>({
    mutationKey: queryKeys.interview.create(),
    mutationFn: async ({ recruitmentId }) => {
      // RESTful 경로로 변경
      const url = `api/v1/interviews/recruitments/${recruitmentId}/interviews`;
      const res = await POST<CreateInterviewResult>(url);
      console.log(res);
      return res.result;
    },
    onSuccess: () => {
      // 조직 인터뷰 리스트 무효화
      qc.invalidateQueries({ queryKey: queryKeys.interview.orgList() });
    },
  });
}
