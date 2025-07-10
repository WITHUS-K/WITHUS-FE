import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PUT } from '@web/api/fetch';
import type {
  AssignUsersRequest,
  AssignUsersResult,
} from '@web/types/organization';
import { queryKeys } from '../constants';

type Variables = {
  roleId: number;
  userIds: number[];
};

/**
 * 특정 역할에 사용자 일괄 추가/제외
 */
export function useAssignOrganizationUsersMutation(organizationId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ roleId, userIds }: Variables) => {
      const payload: AssignUsersRequest = { userIds };
      const res = await PUT<AssignUsersResult[]>(
        `api/v1/organizations/${organizationId}/roles/${roleId}/assign-users`,
        payload
      );
      return res.result;
    },
    onSuccess: (_data, { roleId }) => {
      // 사용자가 속한 역할별 리스트 무효화
      qc.invalidateQueries({
        queryKey: queryKeys.organization.users.search(organizationId, roleId),
      });
      // 전체 역할 목록도 갱신
      qc.invalidateQueries({
        queryKey: queryKeys.organization.roles.list(organizationId),
      });
    },
    onError: (error: unknown, vars: Variables) => {
      console.error('할당/제외 실패:', vars, error);
    },
  });
}
