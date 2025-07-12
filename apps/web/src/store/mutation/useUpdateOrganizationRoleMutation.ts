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
  color: string;
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
        color: color,
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
    onError: (error: unknown, variables: Variables) => {
      console.error('🚨 역할 업데이트 실패');
      console.error('입력 값:', variables);
      if (error instanceof Error) {
        console.error('에러 메시지:', error.message);
      } else {
        console.error('에러 객체:', error);
      }
    },
  });
}
