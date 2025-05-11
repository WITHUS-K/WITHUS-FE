// src/store/organization/useDeleteOrganizationUsersMutation.ts
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import { DELETE } from '@web/api/fetch';
import { queryKeys } from '../constants';

export function useDeleteOrganizationUsersMutation(
  organizationId: number,
  currentPage: number,
  pageSize: number
): UseMutationResult<string, Error, { userIds: number[] }, unknown> {
  const qc = useQueryClient();
  return useMutation<string, Error, { userIds: number[] }, unknown>({
    mutationFn: async ({ userIds }) => {
      // 경로 앞의 슬래시(/)를 제거합니다.
      const res = await DELETE<string>(
        `api/v1/organizations/${organizationId}/users`,
        { userIds }
      );
      console.log('멤버 일괄 삭제', res);
      return res.result;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.organization.members.list(
          organizationId,
          currentPage,
          pageSize
        ),
      });
    },
    onError: (error) => {
      console.error('멤버 일괄 삭제 실패', error);
    },
  });
}
