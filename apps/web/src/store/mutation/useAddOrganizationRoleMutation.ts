import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POST } from '@web/api/fetch';
import type { CreateRoleRequest, CreateRoleDto } from '@web/types/organization';
import { queryKeys } from '../constants';
import type { PaletteColor } from '@repo/utils';
import { hexToName } from '@web/utils/color';

type Variables = { label: string; color: string };

/**
 * 조직 역할 생성
 */
export function useAddOrganizationRoleMutation(organizationId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ label, color }: Variables) => {
      const payload: CreateRoleRequest = {
        name: label,
        color: color,
      };
      const response = await POST<CreateRoleDto>(
        `api/v1/organizations/${organizationId}/roles`,
        payload
      );
      return response.result;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.organization.roles.list(organizationId),
      });
    },
    onError: (error, variables) => {
      console.error('🚨 역할 생성 실패');
      console.error('입력 값:', variables);
      if (error instanceof Error) {
        console.error('에러 메시지:', error.message);
      } else {
        console.error('에러 객체:', error);
      }
    },
  });
}
