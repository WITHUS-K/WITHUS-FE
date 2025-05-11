// src/store/organization/useAssignRoleToUserMutation.ts
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import { POST } from '@web/api/fetch';
import type {
  AssignRoleRequest,
  AssignRoleResponse,
  AssignUsersResult,
} from '@web/types/organization';
import { queryKeys } from '../constants';

export function useAssignRoleToUserMutation(
  organizationId: number,
  currentPage: number,
  pageSize: number
): UseMutationResult<AssignUsersResult[], Error, AssignRoleRequest, unknown> {
  const qc = useQueryClient();
  return useMutation<AssignUsersResult[], Error, AssignRoleRequest>({
    mutationFn: async (payload) => {
      const res = await POST<AssignRoleResponse['result']>(
        `api/v1/organizations/${organizationId}/assign-role`,
        payload
      );
      console.log('역할 부여', res);
      return res.result;
    },
    onSuccess: () => {
      // 역할 부여 후 목록 리프레시
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
