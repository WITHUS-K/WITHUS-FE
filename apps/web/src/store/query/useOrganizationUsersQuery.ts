import { GET } from '@web/api/fetch';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { Tokens } from '@web/api/types';
import type { UserResult } from '@web/types/organization';
import { queryKeys } from '../constants';

const STALE_TIME = 1000 * 60 * 1;
const GC_TIME = 1000 * 60 * 2;

/**
 * 선택된 역할(roleId)이 0보다 클 때만 호출
 */
export function useOrganizationUsersQuery(
  organizationId: number,
  roleId: number,
  keyword?: string,
  tokens?: Tokens
): UseQueryResult<UserResult[], unknown> {
  const key = queryKeys.organization.users.search(
    organizationId,
    roleId,
    keyword
  );

  return useQuery<UserResult[]>({
    queryKey: key,
    queryFn: async () => {
      const params: Record<string, string> = { roleId: String(roleId) };
      if (keyword) params.keyword = keyword;

      const res = await GET<UserResult[]>(
        `api/v1/organizations/${organizationId}/users/search`,
        params,
        tokens
      );
      //console.log('운영진 조회', res);
      return res.result;
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    enabled: roleId > 0,
  });
}
