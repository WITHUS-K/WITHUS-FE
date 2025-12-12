'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POST } from '@web/api/fetch';
import { queryKeys } from '../constants';

type AcceptInviteRequest = {
  code: string;
};

type Org = { id: number; name: string };

type AcceptInviteResponse = {
  code: number;
  message: string;
  result: Org[];
  success: boolean;
};

export const acceptOrganizationInvite = async (
  body: AcceptInviteRequest
) => {
  return await POST<AcceptInviteResponse>(
    'api/v1/organizations/invite/accept',
    body
  );
};

export function useAcceptOrganizationInviteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptOrganizationInvite,

    onSuccess: async (response) => {
      console.log('[acceptOrganizationInvite] response:', response);
      await queryClient.invalidateQueries({
        queryKey: queryKeys.organization.me(),
      });
    },

    onError: (error) => {
      console.error('[acceptOrganizationInvite] error:', error);
    },
  });
}
