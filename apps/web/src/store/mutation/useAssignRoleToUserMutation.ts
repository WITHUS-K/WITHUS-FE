import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POST } from '@web/api/fetch';
import type {
  AssignRoleRequest,
  AssignRoleResponse,
} from '@web/types/organization';
import { queryKeys } from '../constants';

export function useAssignRoleToUserMutation(
  organizationId: number,
  currentPage: number,
  pageSize: number
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AssignRoleRequest) => {
      const res = await POST<AssignRoleResponse['result']>(
        `api/v1/organizations/${organizationId}/assign-role`,
        payload
      );
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
  });
}
