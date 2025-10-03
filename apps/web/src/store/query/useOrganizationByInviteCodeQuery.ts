import { useQuery } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import type { ApiResponse, Tokens } from '@web/api/types';
import { queryKeys } from '../constants';

export interface OrganizationByInviteCode {
  id: number;
  name: string;
}

/**
 * GET /api/v1/organizations/inviteCode/exchange
 * 초대 코드를 기반으로 조직 상세 조회
 */
export function useOrganizationByInviteCodeQuery(
  inviteCode?: string,
  tokens?: Tokens
) {
  return useQuery<OrganizationByInviteCode | null, Error>({
    queryKey: queryKeys.organization.inviteCode.exchange(inviteCode ?? ''),
    queryFn: async () => {
      const params = inviteCode ? { inviteCode } : undefined;
      try {
        const res = await GET<OrganizationByInviteCode>(
          'api/v1/organizations/inviteCode/exchange',
          params,
          tokens
        );
        return (res as ApiResponse<OrganizationByInviteCode>).result ?? null;
      } catch (err: any) {
        if (err?.response?.status === 404) return null;
        throw err;
      }
    },
    enabled: !!inviteCode,
    staleTime: 1000 * 60 * 2,
    retry: (failureCount, err: any) => {
      const status = err?.response?.status;
      if (status === 404) return false;
      return failureCount < 2;
    },
  });
}
