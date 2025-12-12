export interface OrganizationSummary {
  id: number;
  name: string;
}

export interface MyPageData {
  userId: number;
  name: string;
  phoneNumber: string;
  email: string;
  imageUrl: string;
  organizations: OrganizationSummary[];
}

export interface UpdateUserRequestDTO {
  name?: string;
  phoneNumber?: string;
  currentPassword?: string;
  newPassword1?: string;
  newPassword2?: string;
  organizationIds?: number[];
}

import {
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { queryKeys } from '../constants/queryKeys';
import type { Tokens } from '@web/api/types';
import { GET } from '@web/api';

const STALE_TIME = 1000 * 60;

export function getMyPageQueryOptions(tokens?: Tokens) {
  return {
    queryKey: queryKeys.user.myPage(),
    queryFn: async () => {
      const res = await GET<MyPageData>(
        'api/v1/users/my-page',
        undefined,
        tokens
      );
      return res.result;
    },
    staleTime: STALE_TIME,
  } as UseSuspenseQueryOptions<MyPageData>;
}

export function useGetMyPageQuery(tokens?: Tokens) {
  return useSuspenseQuery(getMyPageQueryOptions(tokens));
}
