import { GET } from '@web/api/fetch';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { EmailUser, EmailUserResponse } from '@web/types/organization';

export function useUserByEmailQuery(
  email: string,
  enabled: boolean
): UseQueryResult<EmailUser, Error> {
  return useQuery<EmailUser, Error>({
    queryKey: ['userByEmail', email],
    queryFn: async () => {
      const res = await GET<EmailUserResponse['result']>('api/v1/users/email', {
        email,
      });
      return res.result;
    },
    enabled,
    staleTime: 0,
    gcTime: 0,
  });
}
