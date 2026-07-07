# SSR 스트리밍 + 섹션별 Suspense 패턴 가이드

한 페이지에 서로 독립적인 데이터 섹션이 여러 개 있고, 그중 하나가 느리거나 실패해도 나머지는 바로 보여줘야 할 때 쓰는 패턴이다. `docs/api-ssr-pattern.md`의 "병렬 prefetch" 패턴은 모든 API를 서버에서 `Promise.all`로 다 기다렸다가 한 번에 내려주지만, 이 패턴은 **레이아웃 결정에 필요한 핵심 데이터 하나만** 서버에서 기다리고 나머지는 섹션별로 독립 스트리밍한다.

전체 예시는 어드민 홈 대시보드(`app/(main)/dashboard/admin/`)를 기준으로 한다.

---

## 언제 이 패턴을 쓰는가

- 페이지 안에 서로 순서 의존이 없는 독립적인 섹션이 여러 개 있을 때 (예: 진행률 카드, 미완료 평가자 목록 등)
- 그중 일부 API가 느려질 수 있고, 그것 때문에 페이지 전체 첫 페인트가 늦어지면 안 될 때

섹션이 하나뿐이거나 전부 항상 빠르게 응답한다면 오버엔지니어링이다 — `docs/api-ssr-pattern.md`의 기본 병렬 prefetch로 충분하다. 섹션 간에 순서 의존성이 있으면(B가 A의 결과를 파라미터로 써야 함) 체이닝 패턴을 쓴다.

---

## 구조 요약

```
dashboard/admin/
  loading.tsx              # page.tsx를 감싸는 Suspense fallback = 페이지 전체 스켈레톤
  page.tsx                 # async 서버 컴포넌트 — 핵심 데이터 1개만 await
    └─ HydrationBoundary
         └─ XxxScreen (client)
              ├─ 이미 받은 prop만 쓰는 섹션 (즉시 렌더)
              ├─ <Suspense fallback={<ASkeleton/>}>
              │     └─ AContainer (client, useSuspenseQuery)
              └─ <Suspense fallback={<BSkeleton/>}>
                    └─ BContainer (client, useSuspenseQuery)
```

---

## 1. `loading.tsx` — 라우트 진입 즉시 스켈레톤

```tsx
// app/(main)/dashboard/admin/loading.tsx
import { AdminHomeDashboardSkeleton } from '@web/app/(main)/_components/home/Admin/AdminHomeDashboardSkeleton';

export default function AdminDashboardLoading() {
  return <AdminHomeDashboardSkeleton />;
}
```

Next.js가 같은 세그먼트의 `page.tsx`를 자동으로 이 컴포넌트를 fallback으로 하는 `<Suspense>`로 감싼다. `loading.tsx`는 **같은 폴더의 `page.tsx`만** 감싸며, 상위 `layout.tsx` 자체의 async 작업은 감싸지 않는다 — 5번 "주의" 참고.

---

## 2. `page.tsx` — 핵심 데이터 1개만 blocking

**Before** (섹션별 API 4개를 전부 서버에서 blocking):

```tsx
await Promise.all([
  queryClient.fetchQuery(docProgressOptions),
  queryClient.fetchQuery(interviewProgressOptions),
  queryClient.fetchQuery(pendingOptions),
]).catch(() => {});
```

**After** (레이아웃에 꼭 필요한 요약 데이터만 blocking):

```tsx
export default async function AdminDashboardPage() {
  const tokens = await getServerSideTokens();
  const queryClient = getQueryClient();

  const summaryOptions = getCurrentRecruitmentSummaryQueryOptions(tokens);
  let summaries: Awaited<ReturnType<typeof summaryOptions.queryFn>> = [];

  try {
    summaries = await queryClient.fetchQuery(summaryOptions); // 이것만 blocking
  } catch {
    return <AdminHomeEmptyScreen />;
  }

  const firstSummary = summaries[0];
  if (!firstSummary) return <AdminHomeEmptyScreen />;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminHomeDashboardScreen />
    </HydrationBoundary>
  );
}
```

판단 기준: **이 데이터가 있어야 하위 섹션에 넘길 파라미터(`recruitmentId` 등)를 알 수 있는가?** 그것만 서버에서 기다리고, 나머지는 3번으로 넘긴다.

---

## 3. `Container` + `Skeleton` 쌍으로 섹션 분리

섹션마다 파일 세트를 만든다:

- `XxxContainer.tsx` — `'use client'` + `useSuspenseQuery`로 데이터를 읽어 실제 표시 컴포넌트에 넘김
- `XxxSkeleton.tsx` — 실제 컴포넌트와 동일한 크기/레이아웃의 shimmer block
- `XxxSkeleton.css.ts` — shimmer 애니메이션

```tsx
// OverallProgressContainer.tsx
'use client';

import { useSuspenseQueries } from '@tanstack/react-query';
import { getRecruitmentProgressQueryOptions } from '@web/store/query/useRecruitmentProgressQuery';
import { OverallProgress } from './OverallProgress';

interface Props {
  recruitmentId: number;
}

export function OverallProgressContainer({ recruitmentId }: Props) {
  const [{ data: docData }, { data: interviewData }] = useSuspenseQueries({
    queries: [
      getRecruitmentProgressQueryOptions(recruitmentId, 'DOCUMENT'),
      getRecruitmentProgressQueryOptions(recruitmentId, 'INTERVIEW'),
    ],
  });

  return <OverallProgress docData={docData} interviewData={interviewData} />;
}
```

### ⚠️ 한 섹션 안에 쿼리가 2개 이상이면 `useSuspenseQueries`로 묶기

`useSuspenseQuery`를 한 컴포넌트 안에서 여러 번 순서대로 호출하면 안 된다:

```tsx
// 워터폴 발생 — 하지 말 것
const { data: docData } = useSuspenseQuery(docOptions);
const { data: interviewData } = useSuspenseQuery(interviewOptions);
```

첫 번째 훅이 아직 응답 없는 Promise를 throw하면 그 아래 줄(두 번째 훅)은 **이번 렌더에서 아예 실행되지 않는다.** `docData`가 응답을 받아 컴포넌트가 처음부터 다시 렌더된 뒤에야 `interviewData` 쿼리가 시작된다 — 즉 두 요청이 동시에 나가지 않고 순차적으로(워터폴) 나간다. 실제로 `OverallProgressContainer`가 이 문제를 갖고 있다가 위 예시처럼 `useSuspenseQueries`로 고쳤다. 이렇게 하면 배열 안의 쿼리가 전부 동시에 시작되고, 컴포넌트는 전체가 준비될 때 한 번만 suspend된다.

```typescript
// OverallProgressSkeleton.css.ts
import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

const shimmer = keyframes({
  '0%': { backgroundPosition: '-200% 0' },
  '100%': { backgroundPosition: '200% 0' },
});

export const skeletonBlock = style({
  background: `linear-gradient(90deg, ${vars.colors.grayscale5} 25%, ${vars.colors.grayscale10} 50%, ${vars.colors.grayscale5} 75%)`,
  backgroundSize: '200% 100%',
  animation: `${shimmer} 2.8s linear infinite`, // 1.5s ease-in-out은 너무 빠르고 튀는 느낌 — 2.5~3s + linear 권장
  borderRadius: '0.8rem',
  flexShrink: 0,
});
```

### 규칙

- `Container`는 화면에 무엇을 그릴지 모른다 — 데이터만 읽어서 표시 컴포넌트(`OverallProgress` 등)에 그대로 넘긴다.
- `Skeleton`은 실제 컴포넌트와 크기/레이아웃이 최대한 비슷해야 한다 (교체될 때 레이아웃 시프트 방지).
- shimmer는 `linear` + 2.5~3s 권장. `ease-in-out`처럼 가속/감속이 있는 easing은 반복될 때마다 튀는 느낌을 줘서 여러 블록이 동시에 애니메이션되는 대시보드에서 정신없어 보인다.
- 한 `Container` 안에서 쿼리가 2개 이상이면 `useSuspenseQuery`를 여러 번 쓰지 말고 `useSuspenseQueries`로 묶는다.

---

## 4. `Screen`에서 섹션별로 개별 `Suspense`로 감싸기

```tsx
<Suspense fallback={<OverallProgressSkeleton />}>
  <OverallProgressContainer recruitmentId={recruitmentId} />
</Suspense>

<Suspense fallback={<PendingUsersSkeleton />}>
  <PendingUsersContainer recruitmentId={recruitmentId} />
</Suspense>
```

같은 레벨에 있는 두 `Suspense`는 서로 독립적이다. 하나가 느려도 다른 하나, 그리고 이미 받은 prop만으로 렌더되는 상단 요소(`AnnounceCard`, `DocTimeline` 등)는 영향받지 않는다.

---

## 5. ⚠️ 주의 — 상위 레이아웃의 서스펜스 함정

`loading.tsx`는 **같은 폴더의 `page.tsx`만** 감싸고, 상위 `layout.tsx` 자체의 async 작업이나 그 안의 서스펜스 기반 훅은 감싸지 않는다. 상위 레이아웃(`(main)/layout.tsx`, `AuthLayout.tsx` 등)에 조건 없이 실행되는 `useSuspenseQuery`가 있고, 그걸 감싸는 `Suspense`의 fallback이 `null`이면 — 이 페이지의 `loading.tsx` 스켈레톤이 뜨기도 전에 **전체 화면이 그냥 비어있게** 된다.

실제로 겪은 사례: `AuthLayout.tsx`가 role과 무관하게 `useMyOrganizationsQuery()`(`useSuspenseQuery`)를 호출했는데, 서버에서는 `USER` role일 때만 이 데이터를 prefetch했다. `ADMIN`으로 로그인하면 캐시에 데이터가 없으니 클라이언트에서 불필요한 요청이 나가고, 그 요청이 끝날 때까지 `<Suspense fallback={null}>`이 Header/Sidebar/페이지 전체를 통째로 서스펜드시켜 빈 화면이 나타났다. 아래처럼 해당 role에서만 쿼리가 실행되도록 고쳐서 해결했다.

```tsx
// useMyOrganizationsQuery.ts
export function useMyOrganizationsQuery(enabled = true) {
  return useQuery({ ...getMyOrganizationsQueryOptions(), enabled });
}

// AuthLayout.tsx
const { data } = useMyOrganizationsQuery(role === 'USER');
```

**이 패턴을 쓰기 전에 반드시 확인**: 페이지보다 상위(레이아웃 체인)에 있는 서스펜스 기반 훅이 **모든 역할/분기에서** 실제로 데이터가 준비되어 있는지. 아니라면 `useQuery` + `enabled` 조합으로 바꿔서 불필요한 서스펜드를 막는다.

---

## 6. 체크리스트

- [ ] 페이지에 서로 순서 의존 없는 독립적인 데이터 섹션이 여러 개 있는가?
- [ ] 레이아웃 결정에 필요한 핵심 데이터만 `page.tsx`에서 `await`하는가?
- [ ] 나머지 섹션은 각각 `Container`(client, `useSuspenseQuery`) + `Skeleton` 쌍으로 분리했는가?
- [ ] 한 `Container` 안에 쿼리가 2개 이상이면 `useSuspenseQueries`로 묶어서 내부 워터폴을 막았는가?
- [ ] `Screen`에서 섹션별로 개별 `<Suspense>`로 감쌌는가?
- [ ] 같은 세그먼트에 `loading.tsx`를 뒀는가?
- [ ] 상위 레이아웃에 role/조건과 무관하게 실행되는 서스펜스 훅이 없는지 확인했는가?
- [ ] 스켈레톤 shimmer 애니메이션이 너무 빠르지 않은지(2.5~3s, `linear`) 확인했는가?
