import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';
import { GET } from '@web/api';

export interface EmailCheckResult {
  isDuplicated: boolean;
}

const STALE_TIME = 1000 * 60;

export function useEmailCheckQuery(
  queryKey: unknown[],
  email: string,
  options?: Omit<
    UseQueryOptions<EmailCheckResult, Error, EmailCheckResult, unknown[]>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<EmailCheckResult, Error> {
  return useQuery<EmailCheckResult, Error, EmailCheckResult, unknown[]>({
    queryKey,
    queryFn: async () => {
      const res = await GET<EmailCheckResult>(
        `api/v1/users/email/check?email=${encodeURIComponent(email)}`
      );
      return res.result; 
    },
    staleTime: STALE_TIME,
    ...options,
  });
}