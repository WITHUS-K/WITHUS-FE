// src/store/mutation/useInviteUsersMutation.ts
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import { POST } from '@web/api/fetch';
import { queryKeys } from '../constants';

export interface InviteUsersRequest {
  userIds: number[];
}

/**
 * 조직 사용자 초대 Mutation
 * organizationId: path param
 */
export function useInviteUsersMutation(
  organizationId: number
): UseMutationResult<void, Error, InviteUsersRequest> {
  const qc = useQueryClient();
  return useMutation<void, Error, InviteUsersRequest>({
    mutationFn: async (body) => {
      await POST(`api/v1/organizations/${organizationId}/users/invite`, body);
    },
    onSuccess: () => {
      // "members.list" 키를 무효화해서 사용자 목록을 다시 가져오게 합니다.
      qc.invalidateQueries({
        queryKey: queryKeys.organization.members.list(
          organizationId,
          /* page */ 1,
          /* size */ 20
        ),
      });
    },
  });
}
