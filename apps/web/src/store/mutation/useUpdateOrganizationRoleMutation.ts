import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PATCH } from '@web/api/fetch';
import { queryKeys } from '../constants';
import type { PaletteColor } from '@repo/utils';
import { hexToName } from '@web/utils/color';

interface UpdateRoleRequest {
  name: string;
  color: string;
}

type Variables = {
  roleId: number;
  label: string;
  color: PaletteColor;
};

/**
 * 조직 역할 수정
 */
export function useUpdateOrganizationRoleMutation(organizationId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ roleId, label, color }: Variables) => {
      const payload: UpdateRoleRequest = {
        name: label,
        color: hexToName[color]!,
      };
      await PATCH(
        `api/v1/organizations/${organizationId}/roles/${roleId}`,
        payload
      );
    },
    onSuccess: (_data, _variables) => {
      qc.invalidateQueries({
        queryKey: queryKeys.organization.roles.list(organizationId),
      });
    },
    onError: (error: unknown, variables: Variables) => {},
  });
}
