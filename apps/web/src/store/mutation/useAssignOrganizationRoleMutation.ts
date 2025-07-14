import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POST } from '@web/api/fetch';

import { queryKeys } from '../constants';

export interface AssignRoleRequestDTO {
  userId: number;
  roleIds: number[];
}

export interface AssignRoleResultDTO {
  id: number;
  userName: string;
  roleName: string;
}

type Variables = {
  userId: number;
  roleIds: number[];
};
/**
 * 특정 유저에게 조직 내 역할 부여/제거
 */
export function useAssignOrganizationRoleMutation(organizationId: number) {
  const qc = useQueryClient();

  return useMutation<AssignRoleResultDTO[], unknown, Variables>({
    mutationFn: async ({ userId, roleIds }) => {
      const payload: AssignRoleRequestDTO = { userId, roleIds };
      console.log('보냄', payload);
      const res = await POST<AssignRoleResultDTO[]>(
        `api/v1/organizations/${organizationId}/assign-role`,
        payload
      );
      console.log('결과', res);
      return res.result;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.organization.roles.list(organizationId),
      });
      qc.invalidateQueries({
        queryKey: ['organization', 'users', 'search', organizationId],
      });
      qc.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === 'organization' &&
          query.queryKey[1] === organizationId &&
          query.queryKey[2] === 'members',
      });
    },
    onError: (error, vars) => {
      console.error('역할 부여 실패:', vars, error);
    },
  });
}
