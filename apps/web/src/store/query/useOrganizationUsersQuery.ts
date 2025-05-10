// src/store/organization/useOrganizationUsersQuery.ts
import { GET } from '@web/api/fetch';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { Tokens } from '@web/api/types';
import type { UserResult } from '@web/types/organization';
import { queryKeys } from '../constants';

const STALE_TIME = 1000 * 60 * 1;
const GC_TIME = 1000 * 60 * 2;

/**
 * 선택된 역할(roleId)이 0보다 클 때만 호출되는 운영진 조회 훅
 */
export function useOrganizationUsersQuery(
  organizationId: number,
  roleId: number,
  keyword?: string,
  tokens?: Tokens
): UseQueryResult<UserResult[], unknown> {
  // 1) 쿼리 키 생성
  const key = queryKeys.organization.users.search(
    organizationId,
    roleId,
    keyword
  );

  // 2) useQuery 에 옵션을 객체로 통째로 넘김
  return useQuery<UserResult[]>({
    queryKey: key,
    queryFn: async () => {
      const params: Record<string, string> = { roleId: String(roleId) };
      if (keyword) params.keyword = keyword;

      // prefixUrl 과 충돌 안 나도록 맨 앞 슬래시 제거
      const res = await GET<UserResult[]>(
        `api/v1/organizations/${organizationId}/users/search`,
        params,
        tokens
      );
      console.log('운영진 조회', res);
      return res.result;
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    enabled: roleId > 0, // roleId 가 0일 땐 요청 자체가 일어나지 않습니다
  });
}
