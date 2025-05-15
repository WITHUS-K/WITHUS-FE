import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import { POST } from '@web/api/fetch';
import { queryKeys } from '../constants';

export type CreateInterviewResult = number;
export type CreateInterviewVariables = { recruitmentId: number };

export function useCreateInterviewMutation(): UseMutationResult<
  CreateInterviewResult,
  Error,
  CreateInterviewVariables
> {
  const qc = useQueryClient();

  return useMutation<CreateInterviewResult, Error, CreateInterviewVariables>({
    mutationKey: queryKeys.interview.create(),
    mutationFn: async ({ recruitmentId }) => {
      const url = `api/v1/interviews?recruitmentId=${recruitmentId}`;
      const res = await POST<CreateInterviewResult>(url);
      return res.result;
    },
    onSuccess: () => {
      // 배열 대신 옵션 객체 형태로 queryKey 를 전달합니다
      qc.invalidateQueries({ queryKey: queryKeys.interview.orgList() });
    },
  });
}
