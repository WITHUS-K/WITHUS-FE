import {
  queryOptions,
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import type { Tokens } from '@web/api/types';
import { queryKeys } from '../constants';
import type { PaginatedUsers } from '@web/types/organization';

const MEMBERS_STALE_TIME = 1000 * 60 * 2;
const MEMBERS_GC_TIME = 1000 * 60 * 3;

export const mockMembers = Array.from({ length: 20 }, (_, i) => ({
  userId: i + 1,
  name: `홍길동${i + 1}`,
  email: `user${i + 1}@example.com`,
  profileImageUrl: '',
  roles: [
    {
      id: 1,
      roleName: '운영진',
      color: 'RED',
    },
  ],
  gender: i % 2 === 0 ? 'MALE' : 'FEMALE',
  birthDate: '1999-01-01',
  phoneNumber: `010-0000-00${(i + 1).toString().padStart(2, '0')}`,
  createdAt: '2025-07-01T12:00:00Z',
}));

export type GetOrganizationMembersParams = {
  organizationId: number;
  page: number;
  size: number;
  tokens?: Tokens;
};

export function getOrganizationMembersQueryOptions({
  organizationId,
  page,
  size,
  tokens,
}: GetOrganizationMembersParams): UseSuspenseQueryOptions<
  PaginatedUsers,
  unknown
> {
  const key = queryKeys.organization.members.list(organizationId, page, size);

  return queryOptions<PaginatedUsers, unknown>({
    queryKey: key,
    queryFn: () =>
      GET<PaginatedUsers>(
        `api/v1/organizations/${organizationId}/users`,
        { page: String(page), size: String(size) },
        tokens
      ).then((res) => res.result),
    staleTime: MEMBERS_STALE_TIME,
    gcTime: MEMBERS_GC_TIME,
  });
}

export function useOrganizationMembersQuery(
  params: GetOrganizationMembersParams
) {
  return useSuspenseQuery(getOrganizationMembersQueryOptions(params));
}
