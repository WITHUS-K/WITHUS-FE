'use client';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@web/routes';
import { login } from '@web/api/login';
import { LoginRequest } from '@web/types/auth';

export function useLoginMutation(): UseMutationResult<
  void,
  HTTPError,
  LoginRequest
> {
  const router = useRouter();

  return useMutation<void, HTTPError, LoginRequest>({
    mutationFn: login,
    onSuccess: () => {
      router.push(ROUTES.HOME);
    },
  });
}
