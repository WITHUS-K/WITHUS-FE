import type { UseSuspenseQueryOptions } from '@tanstack/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '@web/store/constants/queryKeys';
import type { Tokens } from '@web/api/types';

export interface OrganizationDto {
  id: number;
  name: string;
}

const STALE_TIME = 1000 * 60;

export function getOrganizationsMeQueryOptions(
  tokens: Tokens
): UseSuspenseQueryOptions<OrganizationDto[], Error> {
  return {
    queryKey: queryKeys.organization.me(),
    queryFn: () =>
      GET<OrganizationDto[]>(
        'api/v1/organizations/me',
        undefined,
        tokens
      ).then(res => res.result),
    staleTime: STALE_TIME,
  };
}

export function useOrganizationsMeQuery(tokens: Tokens) {
  return useSuspenseQuery(
    getOrganizationsMeQueryOptions(tokens)
  );
}