# API 연동 + SSR 패턴 가이드

이 프로젝트의 표준 API 연동 방식이다. 새 페이지나 기능에 API를 붙일 때 이 패턴을 따른다.

---

## 전체 구조 요약

```
page.tsx (async 서버 컴포넌트)
  └─ getServerSideTokens()          // 쿠키에서 토큰 추출
  └─ getQueryClient()               // 요청별 새 QueryClient
  └─ queryClient.fetchQuery(...)    // 서버에서 API 호출 → 캐시에 저장
  └─ HydrationBoundary              // 캐시 상태를 클라이언트로 직렬화 전달
       └─ XxxScreen (Client Component)
            └─ useXxxQuery()        // 캐시에서 즉시 읽음 (네트워크 요청 없음)
```

- 서버에서 prefetch한 데이터는 `HydrationBoundary`를 통해 클라이언트로 전달된다.
- 클라이언트 hook은 이미 캐시에 있으므로 추가 네트워크 요청이 발생하지 않는다.

---

## 1. Query 파일 작성 (`store/query/useXxxQuery.ts`)

모든 query 파일은 **options 함수**와 **client hook** 두 가지를 export한다.

```typescript
import { useQuery } from '@tanstack/react-query';
import { GET } from '@web/api/fetch';
import { queryKeys } from '@web/store/constants/queryKeys';
import type { Tokens } from '@web/api/types';

// --- 타입 정의 ---
export interface MyData {
  id: number;
  name: string;
}

// --- Options 함수 (서버 + 클라이언트 공용) ---
// tokens 파라미터: 서버에서 호출 시 주입, 클라이언트에서는 생략
export function getMyDataQueryOptions(id: number, tokens?: Tokens) {
  return {
    queryKey: queryKeys.xxx.detail(id),
    queryFn: async () => {
      const res = await GET<MyData>(`api/v1/something/${id}`, undefined, tokens);
      return res.result;
    },
    enabled: !!id,
    staleTime: 1000 * 60, // 1분
  };
}

// --- 클라이언트 Hook ---
export function useMyDataQuery(id: number) {
  return useQuery<MyData, Error>(getMyDataQueryOptions(id));
}
```

### 규칙
- `tokens?` 파라미터는 항상 마지막에 optional로 둔다.
- `queryFn`은 `res.result`만 반환한다 (ApiResponse wrapping 제거).
- `enabled: !!param`으로 파라미터가 falsy일 때 자동 비활성화.
- `console.log` 절대 남기지 않는다.

---

## 2. queryKeys 등록 (`store/constants/queryKeys.ts`)

새 엔드포인트 추가 시 `queryKeys`에도 키를 등록한다.

```typescript
export const queryKeys = {
  // 기존 키들 ...
  myFeature: {
    detail: (id: number) => ['myFeature', 'detail', id] as const,
    list: () => ['myFeature', 'list'] as const,
  },
};
```

---

## 3. Page.tsx — SSR prefetch 패턴

### 기본 패턴 (단순 prefetch)

```typescript
// app/(main)/some-page/page.tsx
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@web/store/query/getQueryClient';
import { getServerSideTokens } from '@web/api/serverSideTokens';
import { getMyDataQueryOptions } from '@web/store/query/useMyDataQuery';
import { SomePageScreen } from './_components/SomePageScreen';
import { SomeEmptyScreen } from './_components/SomeEmptyScreen';

export default async function SomePage() {
  const tokens = await getServerSideTokens();
  const queryClient = getQueryClient();

  await queryClient.fetchQuery(getMyDataQueryOptions(someId, tokens))
    .catch(() => {});  // 실패해도 빈 화면 대신 클라이언트에서 재시도

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SomePageScreen />
    </HydrationBoundary>
  );
}
```

### 체이닝 패턴 (순서가 있는 의존적 prefetch)

앞 API의 결과로 다음 API 파라미터를 결정해야 할 때.

```typescript
export default async function SomePage() {
  const tokens = await getServerSideTokens();
  const queryClient = getQueryClient();

  // 1단계: 첫 번째 API (이후 단계에 필요한 ID 획득)
  let firstData;
  try {
    firstData = await queryClient.fetchQuery(getFirstQueryOptions(tokens));
  } catch {
    return <EmptyScreen />;  // 핵심 데이터 실패 → 빈 화면
  }

  const id = firstData[0]?.someId;
  if (!id) return <EmptyScreen />;

  // 2단계: 독립적인 API는 병렬로 처리
  await Promise.all([
    queryClient.fetchQuery(getSecondQueryOptions(id, tokens)),
    queryClient.fetchQuery(getThirdQueryOptions(id, tokens)),
    // 3단계가 2단계 결과에 의존하면 .then()으로 체이닝
    queryClient.fetchQuery(getFourthQueryOptions(tokens)).then((result) => {
      const dependentId = result.find((r) => r.someId === id)?.otherId;
      if (dependentId) {
        return queryClient.fetchQuery(getFifthQueryOptions(dependentId, tokens));
      }
    }),
  ]).catch(() => {});  // 보조 데이터 실패는 무시 (클라이언트에서 재시도)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SomePageScreen />
    </HydrationBoundary>
  );
}
```

### 주의: queryClient.fetchQuery() vs queryFn() 직접 호출

```typescript
// 올바름: queryClient.fetchQuery() — 캐시에 저장됨 → HydrationBoundary로 전달됨
await queryClient.fetchQuery(getMyQueryOptions(id, tokens));

// 잘못됨: queryFn 직접 호출 — 캐시에 저장 안 됨 → 클라이언트에서 다시 요청함
await getMyQueryOptions(id, tokens).queryFn!();
```

---

## 4. Client Component Hook 사용

```typescript
'use client';

import { useMyDataQuery } from '@web/store/query/useMyDataQuery';

export const SomePageScreen = () => {
  // SSR에서 prefetch된 경우 → 캐시에서 즉시 반환 (isLoading=false)
  // SSR에서 prefetch 안 된 경우 → 클라이언트에서 자동으로 fetch
  const { data, isLoading } = useMyDataQuery(id);

  if (isLoading) return <Spinner />;
  return <div>{data?.name}</div>;
};
```

### useSuspenseQuery vs useQuery

| | `useSuspenseQuery` | `useQuery` |
|---|---|---|
| 로딩 중 | Suspense fallback으로 올라감 | `isLoading: true` 반환 |
| 에러 시 | ErrorBoundary로 올라감 | `isError: true` 반환 |
| 사용 위치 | Suspense 경계 안쪽 | 어디서든 |

`recruitmentId`처럼 **레이아웃 자체를 결정하는 최상위 데이터**나, role에 따라 실행 여부가 갈리는 쿼리(조건부 `enabled`가 필요한 경우)는 `useQuery`를 쓴다. `useSuspenseQuery`는 `enabled` 옵션을 지원하지 않기 때문이다.

```typescript
'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { getMyDataQueryOptions } from '@web/store/query/useMyDataQuery';

export function MyDataContainer({ id }: { id: number }) {
  // 이미 상위 Suspense fallback이 로딩을 대신 보여주므로 isLoading 분기가 필요 없다
  const { data } = useSuspenseQuery(getMyDataQueryOptions(id));
  return <div>{data.name}</div>;
}

// 사용하는 쪽
<Suspense fallback={<MyDataSkeleton />}>
  <MyDataContainer id={id} />
</Suspense>
```

섹션이 여러 개고 그중 하나가 느려도 나머지는 바로 보여줘야 하는 경우(어드민 홈 대시보드의 진행률/미완료 평가자 섹션 등)엔 이렇게 섹션별 `Container` + `useSuspenseQuery` + `Suspense`로 분리한다 — 자세한 패턴은 **`docs/ssr-streaming-pattern.md`** 참고.

---

## 5. 실제 예시: User 홈 대시보드 (체이닝 + 병렬 prefetch)

### `app/(main)/dashboard/user/page.tsx`
```typescript
export default async function UserDashboardPage() {
  const tokens = await getServerSideTokens();
  const orgId = tokens.organizationId;
  const queryClient = getQueryClient();

  if (!orgId) {
    return <UserHomeEmptyScreen />;
  }

  // 1단계: 현재 공고 요약 (recruitmentId 획득)
  const summaryOptions = getCurrentRecruitmentSummaryByOrgQueryOptions(orgId, tokens);
  let summaries: Awaited<ReturnType<typeof summaryOptions.queryFn>> = [];

  try {
    summaries = await queryClient.fetchQuery(summaryOptions);
  } catch {
    return <UserHomeEmptyScreen />;
  }

  const firstSummary = summaries[0];
  if (!firstSummary) {
    return <UserHomeEmptyScreen />;
  }

  const recruitmentId = firstSummary.recruitmentId;

  // 2단계: 독립적인 API는 병렬로, 의존적인 API는 .then()으로 체이닝
  const docEvalOptions = getMyDocumentEvaluationsQueryOptions(recruitmentId, tokens);
  const orgInterviewsOptions = getOrgInterviewsForHomeQueryOptions(orgId, tokens);

  await Promise.all([
    queryClient.fetchQuery(docEvalOptions),
    queryClient.fetchQuery(orgInterviewsOptions).then((orgInterviews) => {
      const interviewId = orgInterviews.find(
        (iv) => iv.recruitmentId === recruitmentId
      )?.interviewId;
      if (interviewId) {
        return queryClient.fetchQuery(
          getMyTimeSlotsForHomeQueryOptions(interviewId, tokens)
        );
      }
    }),
  ]).catch(() => {});

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserHomeDashboardScreen />
    </HydrationBoundary>
  );
}
```

> **참고**: 위 패턴은 병렬 prefetch한 API들이 전부 빠르게 응답한다는 전제하에 쓴다. 페이지 안에 서로 독립적인 섹션이 여러 개 있고 그중 하나가 느려져도 나머지는 바로 보여줘야 한다면(예: 어드민 홈 대시보드), 이 문서 대신 **`docs/ssr-streaming-pattern.md`**의 섹션별 Suspense 스트리밍 패턴을 따른다.

---

## 6. Mutation 파일 작성

```typescript
// store/mutation/useXxxMutation.ts
import { useMutation } from '@tanstack/react-query';
import { POST } from '@web/api/fetch';

export function useXxxMutation() {
  return useMutation({
    mutationFn: (param: number) =>
      POST(`api/v1/something/${param}`),
  });
}
```

```typescript
// 사용 (Client Component)
const { mutate: doSomething, isPending } = useXxxMutation();
<Button onClick={() => doSomething(id)} isLoading={isPending}>실행</Button>
```

---

## 7. 폴더 구조

```
store/
  constants/
    queryKeys.ts          # 모든 queryKey 중앙 관리
  query/
    getQueryClient.ts     # 서버용 QueryClient 팩토리
    useXxxQuery.ts        # 각 도메인별 query 파일
  mutation/
    useXxxMutation.ts     # 각 도메인별 mutation 파일

app/(main)/
  dashboard/
    admin/page.tsx        # Admin SSR page
    user/page.tsx         # User SSR page
  _components/
    home/
      Admin/AdminHomeDashboardScreen.tsx  # 'use client'
      User/UserHomeDashboardScreen.tsx    # 'use client'
```

---

## 8. 체크리스트 (새 API 연동 시)

- [ ] `queryKeys`에 새 키 등록
- [ ] `useXxxQuery.ts` 파일 생성: options 함수 + client hook
- [ ] `page.tsx`에서 `queryClient.fetchQuery(getXxxQueryOptions(..., tokens))` 호출
- [ ] `HydrationBoundary`로 감싸기
- [ ] Client Component에서 `useXxxQuery()` hook 사용
- [ ] `console.log` 없는지 확인
