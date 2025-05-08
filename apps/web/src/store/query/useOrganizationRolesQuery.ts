// src/store/organization/useOrganizationRolesQuery.ts
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
import type {
  OrganizationRolesData,
  OrganizationRolesResponse,
} from '@web/types/organization';

const STALE_TIME = 1000 * 60 * 2; // 2분
const GC_TIME = 1000 * 60 * 3; // 3분

export type GetOrganizationRolesParams = {
  organizationId: number;
  keyword?: string;
  tokens?: Tokens;
};

export type OrganizationRolesQueryKey = QueryKey;

export type OrganizationRolesQueryFn = QueryFunction<
  OrganizationRolesData,
  OrganizationRolesQueryKey
>;

/**
 * 서버/SSR 단계에서 미리 조직 역할 데이터를 가져올 옵션
 */
export function getOrganizationRolesQueryOptions({
  organizationId,
  keyword,
  tokens,
}: GetOrganizationRolesParams): UseSuspenseQueryOptions<
  OrganizationRolesData,
  unknown,
  OrganizationRolesData,
  OrganizationRolesQueryKey
> {
  const key = queryKeys.organization.roles.list(organizationId, keyword);

  const queryFn: OrganizationRolesQueryFn = async () => {
    const res = await GET<OrganizationRolesResponse['result']>(
      `api/v1/organizations/${organizationId}/roles`,
      keyword ? { keyword } : undefined,
      tokens
    );
    console.log('역할 조회', res);
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
 * 클라이언트 컴포넌트에서 사용하는 Suspense-ready 훅
 */
export function useOrganizationRolesQuery(
  organizationId: number,
  keyword?: string
): UseSuspenseQueryResult<OrganizationRolesData, unknown> {
  const options = getOrganizationRolesQueryOptions({ organizationId, keyword });
  return useSuspenseQuery<
    OrganizationRolesData,
    unknown,
    OrganizationRolesData,
    OrganizationRolesQueryKey
  >(options);
}
