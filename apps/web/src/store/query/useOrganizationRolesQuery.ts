import {
  queryOptions,
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import type { Tokens } from '@web/api/types';
import { queryKeys } from '../constants';
import type {
  OrganizationRolesData,
  OrganizationRolesResponse,
} from '@web/types/organization';

const ROLES_STALE_TIME = 1000 * 60 * 2;
const ROLES_GC_TIME = 1000 * 60 * 3;

export type GetOrganizationRolesParams = {
  organizationId: number;
  keyword?: string;
  tokens?: Tokens;
};

export function getOrganizationRolesQueryOptions({
  organizationId,
  keyword,
  tokens,
}: GetOrganizationRolesParams): UseSuspenseQueryOptions<
  OrganizationRolesData,
  unknown
> {
  const key = queryKeys.organization.roles.list(organizationId, keyword);

  return queryOptions<OrganizationRolesData, unknown>({
    queryKey: key,
    queryFn: () =>
      GET<OrganizationRolesResponse['result']>(
        `api/v1/organizations/${organizationId}/roles`,
        keyword ? { keyword } : undefined,
        tokens
      ).then((res) => res.result),
    staleTime: ROLES_STALE_TIME,
    gcTime: ROLES_GC_TIME,
  });
}

export function useOrganizationRolesQuery(params: GetOrganizationRolesParams) {
  return useSuspenseQuery(getOrganizationRolesQueryOptions(params));
}
