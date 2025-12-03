import {
  queryOptions,
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import type { Tokens, ApiResponse } from '@web/api/types';

/**
 * GET /api/v1/organizations/{organizationId}/code
 * 조직 ID를 기반으로 초대 코드를 생성하거나 기존 코드를 조회
 */
export interface OrganizationInviteCode {
  id: number;
  name: string;
  inviteCode: string;
}

const STALE_TIME = 1000 * 60 * 2;
const GC_TIME = 1000 * 60 * 10;

export type OrganizationInviteCodeParams = {
  organizationId: number;
  tokens?: Tokens;
};

const inviteCodeKey = (organizationId: number) =>
  ['organization', 'invite-code', organizationId] as const;

export function getOrganizationInviteCodeQueryOptions({
  organizationId,
  tokens,
}: OrganizationInviteCodeParams): UseSuspenseQueryOptions<
  OrganizationInviteCode,
  Error
> {
  return queryOptions<OrganizationInviteCode>({
    queryKey: inviteCodeKey(organizationId),
    queryFn: () =>
      GET<OrganizationInviteCode>(
        `api/v1/organizations/${organizationId}/code`,
        undefined,
        tokens
      ).then((res: ApiResponse<OrganizationInviteCode>) => res.result),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    enabled: organizationId > 0,
  });
}

export function useOrganizationInviteCodeQuery(
  organizationId: number,
  tokens?: Tokens
) {
  return useSuspenseQuery(
    getOrganizationInviteCodeQueryOptions({ organizationId, tokens })
  );
}
