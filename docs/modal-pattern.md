# 모달 구현 패턴 가이드

이 프로젝트의 모달은 **Next.js Parallel Route + Intercepting Route** 조합으로 구현한다.  
모달을 열면 URL이 바뀌고, 브라우저 뒤로가기로 닫힌다.

---

## 전체 구조

```
app/(main)/
├── layout.tsx              # modal prop 받아서 렌더링
├── @modal/
│   ├── default.tsx         # 모달 없을 때 null 반환 (필수)
│   └── (.)some-modal/
│       └── page.tsx        # 실제 모달 컴포넌트
└── some-page/
    └── page.tsx            # 모달을 여는 버튼이 있는 페이지
```

- `@modal`: Parallel Route — 레이아웃이 `modal` prop으로 받음
- `(.)`: Intercepting Route — 같은 레벨의 경로를 가로채서 모달로 표시
- `default.tsx`: 모달이 없을 때 `null` 반환 (없으면 에러)

---

## 1. 폴더/파일 세팅

### `@modal/default.tsx` — 항상 필요
```typescript
export default function ModalDefault() {
  return null;
}
```

### `layout.tsx` — modal prop 추가
```typescript
export default function SomeLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
```

---

## 2. 모달 페이지 작성 (`@modal/(.)modal-name/page.tsx`)

```typescript
'use client';

import { Modal } from '@repo/ui/Modal';
import { useRouter } from 'next/navigation';

export default function SomeModal() {
  const router = useRouter();
  const close = () => router.back();  // 뒤로가기 = 모달 닫기

  return (
    <Modal.Overlay open onClose={close}>
      <Modal.Layout>
        <Modal.Header text="모달 제목" />
        <Modal.Content>
          {/* 모달 내용 */}
        </Modal.Content>
        <Modal.Footer hasTopBorder>
          <Modal.DoubleCTA
            cancelText="취소"
            confirmText="확인"
            cancelProps={{ onClick: close }}
            confirmProps={{ onClick: handleConfirm }}
          />
        </Modal.Footer>
      </Modal.Layout>
    </Modal.Overlay>
  );
}
```

---

## 3. 모달 열기 — 버튼에서 router.push

```typescript
'use client';
import { useRouter } from 'next/navigation';

export function SomePage() {
  const router = useRouter();

  return (
    <button onClick={() => router.push('/some-modal')}>
      모달 열기
    </button>
  );
}
```

URL이 `/some-modal`로 바뀌면서 `@modal/(.)some-modal/page.tsx`가 intercept해서 모달로 렌더링됨.

---

## 4. Modal 컴포넌트 API (`@repo/ui/Modal`)

### 조합 구조
```typescript
<Modal.Overlay open onClose={close}>      // 배경 오버레이
  <Modal.Layout width="42rem">            // 모달 컨테이너 (기본 42rem)
    <Modal.Header text="제목" />          // 헤더 (text or children)
    <Modal.Content>                       // 내용 영역
      {/* 자유롭게 */}
    </Modal.Content>
    <Modal.Footer hasTopBorder>           // 하단 버튼 영역
      <Modal.DoubleCTA ... />             // 또는 <Modal.CTA ... />
    </Modal.Footer>
  </Modal.Layout>
</Modal.Overlay>
```

### Modal.Overlay
| prop | 타입 | 설명 |
|------|------|------|
| `open` | `boolean` | 표시 여부 (모달 내에선 항상 `true`) |
| `onClose` | `() => void` | 오버레이 클릭 시 닫기 콜백 |

### Modal.Layout
| prop | 타입 | 기본값 |
|------|------|------|
| `width` | `string` | `'42rem'` |

### Modal.Header
| prop | 타입 | 설명 |
|------|------|------|
| `text` | `string` | 헤더 텍스트 |
| `children` | `ReactNode` | 커스텀 헤더 (text 대신 사용) |

### Modal.Footer
| prop | 타입 | 기본값 |
|------|------|------|
| `hasTopBorder` | `boolean` | `false` |

### Modal.DoubleCTA — 취소/확인 버튼 쌍
```typescript
<Modal.DoubleCTA
  cancelText="취소"
  confirmText="확인"
  cancelProps={{ onClick: close }}
  confirmProps={{ onClick: handleConfirm, disabled: !isValid, isLoading: isPending }}
/>
```

### Modal.CTA — 단일 버튼
```typescript
<Modal.CTA text="확인" onClick={close} />
```

### Modal.ModalTextContent — 아이콘 + 텍스트 확인/경고 모달
```typescript
<Modal.Content>
  <Modal.ModalTextContent
    icon={<IcModalCheck />}           // IcModalCheck | IcModalWarning | IcLogout
    title="정말 삭제하시겠습니까?"
    description="삭제 후 복구할 수 없습니다."
  />
</Modal.Content>
```

---

## 5. useModal — 간단한 확인 모달

URL 변경 없이 인라인으로 확인/경고 모달을 띄울 때 사용.

```typescript
import { useModal } from '@repo/ui/hooks';

const { confirm } = useModal();

// 기본 사용
confirm({
  type: 'warning',              // 'info' | 'warning' | 'logout'
  title: '정말 삭제하시겠어요?',
  description: '삭제 후 복구할 수 없습니다.',
  cancelText: '취소',
  confirmText: '삭제',
  onConfirm: () => handleDelete(),
});

// 확인 버튼만 (취소 없음)
confirm({
  type: 'info',
  title: '저장 완료',
  description: '성공적으로 저장되었습니다.',
  hideCancel: true,
  onConfirm: () => router.push('/'),
});
```

---

## 6. 어떤 방식을 선택할까?

| 상황 | 방식 |
|------|------|
| 폼 입력, 검색, 복잡한 UI | Parallel + Intercepting Route |
| 확인/경고 다이얼로그 (간단) | `useModal()` |
| URL에 모달 상태가 반영돼야 함 | Parallel + Intercepting Route |
| URL 변경 없이 빠르게 | `useModal()` |

---

## 7. 실제 구현 예시 — 파일 위치 참고

| 모달 | 경로 |
|------|------|
| 소속 추가 | `app/(main)/@modal/(.)affiliation-add/page.tsx` |
| 멤버 초대 | `app/(main)/organization/@modal/(.)invite/page.tsx` |
| 파트 배정 | `app/(main)/organization/@modal/(.)part/page.tsx` |
| 담당자 배정 | `app/(main)/apply-management/[tab]/@modal/(.)assign-manager/page.tsx` |

---

## 8. 체크리스트 (새 모달 추가 시)

- [ ] 해당 레벨 레이아웃에 `modal` prop 추가 + `{modal}` 렌더링
- [ ] `@modal/default.tsx` 생성 (null 반환)
- [ ] `@modal/(.)modal-name/page.tsx` 생성
- [ ] 모달 page 최상단에 `'use client'` 추가
- [ ] `close = () => router.back()` 로 닫기 구현
- [ ] `Modal.Overlay`의 `onClose`에 `close` 연결
