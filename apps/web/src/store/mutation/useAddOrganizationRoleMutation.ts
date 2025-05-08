import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import { POST } from '@web/api/fetch';
import { CreateRoleRequest, CreateRoleDto } from '@web/types/organization';
import { queryKeys } from '../constants';
import type { PaletteColor } from '@repo/utils';
import { hexToName } from '@web/utils/color';

type Variables = { label: string; color: PaletteColor };

/**
 * 조직 역할 생성
 * - 성공 시 반환값 void
 * - 생성 후 invalidateQueries 로 목록 갱신
 */
export function useAddOrganizationRoleMutation(
  organizationId: number
): UseMutationResult<CreateRoleDto, Error, Variables, unknown> {
  const qc = useQueryClient();

  return useMutation<CreateRoleDto, Error, Variables, unknown>({
    mutationFn: async ({ label, color }) => {
      const payload: CreateRoleRequest = {
        name: label,
        color: hexToName[color]!,
      };
      const response = await POST<CreateRoleDto>(
        `api/v1/organizations/${organizationId}/roles`,
        payload
      );
      console.log('역할 생성', response);
      return response.result;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.organization.roles.list(organizationId),
      });
    },
  });
}
