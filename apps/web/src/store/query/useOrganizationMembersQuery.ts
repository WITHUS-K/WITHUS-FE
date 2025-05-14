import { GET } from '@web/api/fetch';
import {
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
  type UseSuspenseQueryResult,
  type QueryFunction,
  type QueryKey,
} from '@tanstack/react-query';
import type { Tokens } from '@web/api/types';
import { queryKeys } from '../constants';
import type { PaginatedUsers } from '@web/types/organization';

const STALE_TIME = 1000 * 60 * 2;
const GC_TIME = 1000 * 60 * 3;

export type GetOrganizationMembersParams = {
  organizationId: number;
  page: number;
  size: number;
  tokens?: Tokens;
};
export type OrganizationMembersQueryKey = QueryKey;
export type OrganizationMembersQueryFn = QueryFunction<
  PaginatedUsers,
  OrganizationMembersQueryKey
>;

/**
 * 서버/SSR 단계 혹은 Suspense 경계에서 미리 호출할 옵션
 */
export function getOrganizationMembersQueryOptions({
  organizationId,
  page,
  size,
  tokens,
}: GetOrganizationMembersParams): UseSuspenseQueryOptions<
  PaginatedUsers,
  unknown,
  PaginatedUsers,
  OrganizationMembersQueryKey
> {
  const key = queryKeys.organization.members.list(organizationId, page, size);

  const queryFn: OrganizationMembersQueryFn = async () => {
    const res = await GET<PaginatedUsers>(
      `api/v1/organizations/${organizationId}/users`,
      { page: String(page), size: String(size) },
      tokens
    );
    console.log('멤버 리스트 조회', res);
    return res.result;
  };

  return {
    queryKey: key,
    queryFn,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  };
}

/**
 * 클라이언트 컴포넌트에서 Suspense로 바로 쓰는 훅
 */
export function useOrganizationMembersQuery(
  organizationId: number,
  page: number,
  size: number,
  tokens?: Tokens
): UseSuspenseQueryResult<PaginatedUsers, unknown> {
  const options = getOrganizationMembersQueryOptions({
    organizationId,
    page,
    size,
    tokens,
  });
  return useSuspenseQuery<
    PaginatedUsers,
    unknown,
    PaginatedUsers,
    typeof options.queryKey
  >(options);
}
