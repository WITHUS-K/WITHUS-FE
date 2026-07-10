import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PUT } from '@web/api/fetch';
import { queryKeys } from '../constants';
import type {
  AssignOrganizationRoleGroupRolesRequest,
  AssignOrganizationRoleGroupRolesResponse,
} from '@web/types/organization';

type Variables = {
  groupId: number;
  roleIds: number[];
};

export function useAssignOrganizationRoleGroupRolesMutation(
  organizationId: number
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ groupId, roleIds }: Variables) => {
      const payload: AssignOrganizationRoleGroupRolesRequest = { roleIds };
      const response = await PUT<AssignOrganizationRoleGroupRolesResponse['result']>(
        `api/v1/organizations/${organizationId}/role-groups/${groupId}/roles`,
        payload
      );
      return response.result;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.organization.roleGroups.list(organizationId),
      });
      qc.invalidateQueries({
        queryKey: queryKeys.organization.roles.list(organizationId),
      });
    },
  });
}
