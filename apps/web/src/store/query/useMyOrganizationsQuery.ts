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

export function getMyOrganizationsQueryOptions(
  tokens?: Tokens
): UseSuspenseQueryOptions<Organization[], Error, Organization[]> {
  return queryOptions<Organization[], Error, Organization[]>({
    queryKey: queryKeys.organization.me(),
    queryFn: async () => {
      const res = await GET<Organization[]>(
        'api/v1/organizations/me',
        undefined,
        tokens
      );
      return res.result;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useMyOrganizationsQuery() {
  return useSuspenseQuery(getMyOrganizationsQueryOptions());
}
