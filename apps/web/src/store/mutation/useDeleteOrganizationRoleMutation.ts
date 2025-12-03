import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DELETE } from '@web/api/fetch';

export type DeleteOrganizationRoleResponse = {
  code: number;
  message: string;
  result: string;
  success: boolean;
};

/**
 * 조직 역할 삭제
 * DELETE /api/v1/organizations/{organizationId}/roles/{roleId}
 */
export function useDeleteOrganizationRoleMutation(organizationId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (roleId: number) => {
      const res = await DELETE<DeleteOrganizationRoleResponse>(
        `api/v1/organizations/${organizationId}/roles/${roleId}`
      );
      return res.success;
    },

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['organization', organizationId, 'roles'],
      });
    },
  });
}
