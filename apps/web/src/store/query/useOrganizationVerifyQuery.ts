import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';
import { GET } from '@web/api';

export interface OrganizationVerify {
  id: number;
  name?: string;
}

const STALE_TIME = 1000 * 60; 

/**
 * 조직(동아리) 코드 인증 훅
 */
export function useOrganizationVerifyQuery(
  queryKey: unknown[],
  inviteCode: string,
  options?: Omit<
    UseQueryOptions<
      OrganizationVerify,
      Error,
      OrganizationVerify,
      unknown[]
    >,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<OrganizationVerify, Error> {
  return useQuery<
    OrganizationVerify,
    Error,
    OrganizationVerify,
    unknown[]
  >({
    queryKey,
    queryFn: async () => {
      const res = await GET<OrganizationVerify>(
        `api/v1/organizations/inviteCode/exchange?inviteCode=${inviteCode}`
      );
      return res.result;
    },
    staleTime: STALE_TIME,
    ...options,
  });
}