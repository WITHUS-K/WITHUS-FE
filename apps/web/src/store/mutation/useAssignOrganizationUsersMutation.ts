import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
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
export function useAssignOrganizationUsersMutation(
  organizationId: number
): UseMutationResult<AssignUsersResult[], Error, Variables, unknown> {
  const qc = useQueryClient();

  return useMutation<AssignUsersResult[], Error, Variables, unknown>({
    mutationFn: async ({ roleId, userIds }) => {
      const payload: AssignUsersRequest = { userIds };

      const res = await PUT<AssignUsersResult[]>(
        `api/v1/organizations/${organizationId}/roles/${roleId}/assign-users`,
        payload
      );
      //console.log('멤버 할당/제외 요청 완료', res);
      return res.result;
    },
    onSuccess: (_data, { roleId }) => {
      //console.log('멤버 할당/제외 성공:', roleId);
      qc.invalidateQueries({
        queryKey: queryKeys.organization.users.search(organizationId, roleId),
      });

      qc.invalidateQueries({
        queryKey: queryKeys.organization.roles.list(organizationId),
      });
    },
    onError: (error, vars) => {
      //console.error('멤버 할당/제외 실패:', vars, error);
    },
  });
}
