import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POST } from '@web/api/fetch';
import { queryKeys } from '../constants';
import type {
  CreateOrganizationRoleGroupRequest,
  CreateOrganizationRoleGroupResponse,
} from '@web/types/organization';

export function useCreateOrganizationRoleGroupMutation(organizationId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateOrganizationRoleGroupRequest) => {
      const response = await POST<CreateOrganizationRoleGroupResponse['result']>(
        `api/v1/organizations/${organizationId}/role-groups`,
        payload
      );
      return response.result;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.organization.roleGroups.list(organizationId),
      });
    },
  });
}
