import {
  queryOptions,
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import type { Tokens } from '@web/api/types';
import { queryKeys } from '../constants';
import type {
  OrganizationRoleGroup,
  OrganizationRoleGroupsResponse,
} from '@web/types/organization';

const ROLE_GROUPS_STALE_TIME = 1000 * 60 * 2;
const ROLE_GROUPS_GC_TIME = 1000 * 60 * 3;

export type GetOrganizationRoleGroupsParams = {
  organizationId: number;
  tokens?: Tokens;
};

export function getOrganizationRoleGroupsQueryOptions({
  organizationId,
  tokens,
}: GetOrganizationRoleGroupsParams): UseSuspenseQueryOptions<
  OrganizationRoleGroup[],
  unknown
> {
  return queryOptions<OrganizationRoleGroup[], unknown>({
    queryKey: queryKeys.organization.roleGroups.list(organizationId),
    queryFn: () =>
      GET<OrganizationRoleGroupsResponse['result']>(
        `api/v1/organizations/${organizationId}/role-groups`,
        undefined,
        tokens
      ).then((res) => res.result),
    staleTime: ROLE_GROUPS_STALE_TIME,
    gcTime: ROLE_GROUPS_GC_TIME,
  });
}

export function useOrganizationRoleGroupsQuery(
  params: GetOrganizationRoleGroupsParams
) {
  return useSuspenseQuery(getOrganizationRoleGroupsQueryOptions(params));
}
