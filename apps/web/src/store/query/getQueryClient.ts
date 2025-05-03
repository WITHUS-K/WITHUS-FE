import {
  isServer,
  QueryClient,
  defaultShouldDehydrateQuery,
} from '@tanstack/react-query';

const DEFAULT_STALE_TIME = 60 * 1000;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: DEFAULT_STALE_TIME, // 데이터 신선도 유지 시간
      },
      dehydrate: {
        // hydrate 시 포함할 쿼리 조건(custom)
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // 서버라면 매 요청마다 새로운 QueryClient 생성 → SSR 용
    return makeQueryClient();
  } else {
    // 브라우저라면 싱글톤으로 하나만 만들어 재사용
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
