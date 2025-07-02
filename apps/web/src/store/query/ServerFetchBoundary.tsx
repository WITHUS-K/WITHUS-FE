import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import type { FetchQueryOptions, QueryKey } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { getQueryClient } from './getQueryClient';

export type FetchOptions<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Pick<
  FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  'queryKey' | 'queryFn' | 'staleTime' | 'gcTime'
>;

// type Props<
//   TQueryFnData = unknown,
//   TError = Error,
//   TData = TQueryFnData,
//   TQueryKey extends QueryKey = QueryKey,
// > = {
//   fetchOptions:
//     | FetchOptions<TQueryFnData, TError, TData, TQueryKey>[]
//     | FetchOptions<TQueryFnData, TError, TData, TQueryKey>;
//   children: ReactNode | ReactNode[];
// };

type AnyFetchOptions = FetchOptions<any, any, any, any>;

type Props = {
  fetchOptions: AnyFetchOptions | AnyFetchOptions[];
  children: ReactNode | ReactNode[];
};

export async function ServerFetchBoundary({ fetchOptions, children }: Props) {
  const queryClient = getQueryClient();
  const options = Array.isArray(fetchOptions) ? fetchOptions : [fetchOptions];

  try {
    // 1) 서버에서 미리 모든 쿼리 실행 (await + try/catch로 감쌈)
    await Promise.all(options.map((option) => queryClient.fetchQuery(option)));
  } catch (err) {
    console.error('❌ ServerFetchBoundary fetchQuery 실패:', err);
    // SSR 실패 시에도 fallback할 수 있도록 SSR 자체는 중단하지 않음
  }

  // 2) hydrate state를 children에 주입
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
