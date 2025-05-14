import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
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
export function useUpdateOrganizationRoleMutation(
  organizationId: number
): UseMutationResult<void, Error, Variables, unknown> {
  const qc = useQueryClient();

  return useMutation<void, Error, Variables, unknown>({
    mutationFn: async ({ roleId, label, color }) => {
      const payload: UpdateRoleRequest = {
        name: label,
        color: hexToName[color]!,
      };
      await PATCH(
        `api/v1/organizations/${organizationId}/roles/${roleId}`,
        payload
      );
      //console.log('역할 수정 요청 완료:', { roleId, label, color });
    },
    onSuccess: (_data, variables) => {
      //console.log('역할 수정 성공:', variables);
      qc.invalidateQueries({
        queryKey: queryKeys.organization.roles.list(organizationId),
      });
    },
    onError: (error, variables) => {
      //console.error('역할 수정 실패:', variables, error);
    },
  });
}
