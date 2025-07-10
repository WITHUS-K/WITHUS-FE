import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DELETE } from '@web/api/fetch';
import { queryKeys } from '../constants';

export function useDeleteOrganizationUsersMutation(
  organizationId: number,
  currentPage: number,
  pageSize: number
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ userIds }: { userIds: number[] }) => {
      const res = await DELETE<string>(
        `api/v1/organizations/${organizationId}/users`,
        { userIds }
      );
      return res.result;
    },
    onSuccess: () => {
      // 배열이 아니라 객체 형태로 전달!
      qc.invalidateQueries({
        queryKey: queryKeys.organization.members.list(
          organizationId,
          currentPage,
          pageSize
        ),
      });
    },
    onError: (err: unknown) => {
      // 필요하면 에러 처리
    },
  });
}
