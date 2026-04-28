# WITHUS 프론트엔드 — Claude Code 컨텍스트

## 프로젝트 개요

**위더스(WITHUS)** — 리크루팅 프로세스 자동화 통합 솔루션  
공고 → 지원서 취합 → 서류/면접 평가 → 합불 발표까지 모든 과정을 한 곳에서 관리하는 B2B SaaS 서비스.

---

## 모노레포 구조

```text
WITHUS-FE/
├── apps/
│   └── web/                  # Next.js 16 앱 (App Router) — 메인 작업 공간
├── packages/
│   ├── ui/                   # 공통 UI 컴포넌트 (@repo/ui)
│   ├── theme/                # 디자인 토큰 (@repo/theme)
│   ├── utils/                # 공통 유틸 함수 (@repo/utils)
│   ├── typescript-config/    # 공통 TS 설정
│   └── eslint-config/        # 공통 ESLint 설정
└── docs/
    ├── api-ssr-pattern.md    # API 연동 + SSR 패턴 가이드 (필독)
    ├── modal-pattern.md      # 모달 구현 패턴 가이드 (필독)
    ├── ui-design-system.md   # UI 마크업 + 디자인 시스템 + Toast 가이드 (필독)
    └── form-pattern.md       # react-hook-form + TextField 폼 패턴 가이드 (필독)
```

패키지 매니저: **pnpm** / 모노레포 빌드: **Turborepo**

---

## 핵심 기술 스택 (apps/web)

| 역할 | 기술 |
| --- | --- |
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript (strict + noUncheckedIndexedAccess) |
| 스타일 | vanilla-extract (`.css.ts` 파일) |
| 서버 상태 | TanStack Query v5 |
| HTTP 클라이언트 | ky |
| 폼 | react-hook-form |

---

## apps/web 주요 폴더 구조

```text
src/
├── app/
│   ├── (main)/               # 인증 필요 페이지 (레이아웃에 헤더/사이드바 있음)
│   │   ├── dashboard/
│   │   │   ├── admin/page.tsx   # Admin 홈 (SSR)
│   │   │   └── user/page.tsx    # User 홈 (SSR)
│   │   ├── _components/      # (main) 라우트 전용 컴포넌트
│   │   └── page.tsx          # role 기반 redirect gate
│   └── login/                # 인증 없이 접근 가능
├── api/
│   ├── api.ts                # ky 인스턴스 (prefixUrl: NEXT_PUBLIC_API_BASE_URL)
│   ├── fetch.ts              # GET/POST/PUT/DELETE/PATCH 래퍼 (토큰 자동 주입 + 401 처리)
│   └── serverSideTokens.ts   # 서버 컴포넌트에서 쿠키 토큰 추출
├── store/
│   ├── constants/
│   │   └── queryKeys.ts      # 모든 TanStack Query 키 중앙 관리
│   ├── query/
│   │   └── useXxxQuery.ts    # 도메인별 query 파일
│   └── mutation/
│       └── useXxxMutation.ts # 도메인별 mutation 파일
├── middleware.ts              # 인증 미들웨어 + 라우트 보호
└── routes.ts                 # 앱 라우트 상수 (ROUTES.*)
```

---

## 핵심 패턴 문서

새 기능 작업 전 반드시 읽을 것:

- **`docs/api-ssr-pattern.md`** — API 연동 + SSR prefetch 패턴
- **`docs/modal-pattern.md`** — 모달 구현 패턴 (Parallel Route + Intercepting Route)
- **`docs/form-pattern.md`** — react-hook-form + Controller + TextField 연동 패턴
- **`docs/ui-design-system.md`** — UI 컴포넌트 + 디자인 토큰 + Toast 사용 가이드

## API 연동 패턴

**반드시 `docs/api-ssr-pattern.md` 를 먼저 읽고 작업할 것.**

요약:

1. `store/query/useXxxQuery.ts`에 `getXxxQueryOptions(param, tokens?)` + `useXxxQuery(param)` 작성
2. `store/constants/queryKeys.ts`에 queryKey 등록
3. `page.tsx`에서 `queryClient.fetchQuery(getXxxQueryOptions(param, tokens))` 로 SSR prefetch
4. `HydrationBoundary`로 감싼 뒤 클라이언트 컴포넌트에서 `useXxxQuery()` 사용

---

## 인증 흐름

- 로그인 시 `accessToken`, `refreshToken`, `userId`, `role`, `organizationId`, `name` 등을 쿠키에 저장
- `role`: `ADMIN` 또는 `USER`
- 서버 컴포넌트: `getServerSideTokens()` → `Tokens` 객체 반환
- 클라이언트 컴포넌트: `getClientSideTokens()` → 쿠키에서 직접 읽음
- 401 응답 시 `fetch.ts`가 자동으로 토큰 재발급 시도 → 실패 시 로그인 페이지로 리다이렉트

---

## 개발 명령어

```bash
# 루트에서 실행
pnpm dev           # 개발 서버 시작
pnpm build         # 전체 빌드
pnpm --filter web dev    # web 앱만 개발 서버
pnpm --filter web build  # web 앱만 빌드
```

---

## 커밋 컨벤션

```text
[타입]: [메시지] ([이슈번호])
예: feat: 홈 대시보드 API 연동 (#42)
```

| 타입 | 설명 |
| --- | --- |
| `feat` | 새로운 기능 |
| `fix` | 버그 수정 |
| `refactor` | 리팩토링 |
| `chore` | 기타 잡다한 수정 |
| `docs` | 문서 수정 |
| `style` | 코드 스타일/포맷 |
| `build` | 빌드 관련 |

브랜치: `[타입]/[이슈번호-작업내용]` (예: `feat/#42-home-api`)  
기본 브랜치: `develop`

---

## 코드 컨벤션

- 들여쓰기: 2 spaces
- 변수/함수/폴더: `camelCase`
- 컴포넌트/클래스: `PascalCase`
- 상수: `BIG_SNAKE_CASE`
- 주석은 WHY가 불명확할 때만, 한 줄로
- `console.log` 커밋 금지

---

## TypeScript 주의사항

- `noUncheckedIndexedAccess: true` — 배열 인덱스 접근 시 `T | undefined` 반환
  - `arr[0]` 사용 후 반드시 `if (!arr[0]) return` 가드 처리
- strict mode 전체 활성화
- path alias: `@web/*` → `apps/web/src/*`, `@repo/ui/*`, `@repo/theme/*`, `@repo/utils/*`

---

## 스타일 작성

컴포넌트와 같은 폴더에 `ComponentName.css.ts` 파일로 vanilla-extract 스타일 작성.

```typescript
// Button.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme/vars.css';

export const buttonStyle = style({
  backgroundColor: vars.color.primary,
});
```
