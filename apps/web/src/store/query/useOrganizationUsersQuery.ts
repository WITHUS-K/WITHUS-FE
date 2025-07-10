import {
  queryOptions,
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import type { Tokens } from '@web/api/types';
import type { UserResult } from '@web/types/organization';
import { queryKeys } from '../constants';

const USERS_STALE_TIME = 1000 * 60 * 2;
const USERS_GC_TIME = 1000 * 60 * 3;

export type GetOrganizationUsersParams = {
  organizationId: number;
  roleId?: number;
  keyword?: string;
  tokens?: Tokens;
};

export function getOrganizationUsersQueryOptions({
  organizationId,
  roleId,
  keyword,
  tokens,
}: GetOrganizationUsersParams): UseSuspenseQueryOptions<UserResult[], unknown> {
  const key = queryKeys.organization.users.search(
    organizationId,
    roleId!,
    keyword
  );

  return queryOptions<UserResult[], unknown>({
    queryKey: key,
    queryFn: () => {
      const params: Record<string, string> = {};
      if (roleId != null) params.roleId = String(roleId);
      if (keyword) params.keyword = keyword;

      return GET<UserResult[]>(
        `api/v1/organizations/${organizationId}/users/search`,
        params,
        tokens
      ).then((res) => res.result);
    },
    staleTime: USERS_STALE_TIME,
    gcTime: USERS_GC_TIME,
    enabled: organizationId > 0,
  });
}

export function useOrganizationUsersQuery(params: GetOrganizationUsersParams) {
  return useSuspenseQuery(getOrganizationUsersQueryOptions(params));
}
