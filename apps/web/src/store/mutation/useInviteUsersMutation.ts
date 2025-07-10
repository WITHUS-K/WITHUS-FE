import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POST } from '@web/api/fetch';

export interface InviteUsersRequest {
  userIds: number[];
}

/**
 * 조직 사용자 초대 Mutation
 * organizationId: path param
 */
export function useInviteUsersMutation(organizationId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (body: InviteUsersRequest) => {
      await POST(
        `api/v1/organizations/${organizationId}/users/invite`,
        body
      );
    },
    onSuccess: () => {
      // "members.list" 키를 무효화
      // 일단 지움... 초대 메일 보내고 바로 추가 되는게 아니어서...
      /*qc.invalidateQueries({
        queryKey: [ 'organization', organizationId, 'members', 'list' ],
        exact: false,      
      });*/
    },
  });
}
