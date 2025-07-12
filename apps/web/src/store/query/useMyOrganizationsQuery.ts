import {
  queryOptions,
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import type { Tokens } from '@web/api/types';
import { queryKeys } from '@web/store/constants/queryKeys';

export interface Organization {
  id: number;
  name: string;
}

export async function fetchMyOrganizations(
  tokens?: Tokens
): Promise<Organization[]> {
  const res = await GET<Organization[]>(
    'api/v1/organizations/me',
    undefined,
    tokens
  );
  return res.result;
}

export function getMyOrganizationsQueryOptions(
  tokens?: Tokens
): UseSuspenseQueryOptions<Organization[], Error> {
  return queryOptions<Organization[]>({
    queryKey: queryKeys.organization.me(),
    queryFn: () => fetchMyOrganizations(tokens),
    staleTime: 1000 * 60 * 5,
  });
}

export function useMyOrganizationsQuery() {
  return useSuspenseQuery(getMyOrganizationsQueryOptions());
}
