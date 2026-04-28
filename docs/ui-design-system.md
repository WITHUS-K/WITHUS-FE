# UI 마크업 가이드 — 디자인 시스템 활용

마크업 작업 시 raw HTML/CSS 대신 `@repo/ui` 컴포넌트와 `@repo/theme` 토큰을 우선 사용한다.

---

## 핵심 원칙

1. **컴포넌트 먼저**: `div + style` 대신 `Flex`, `Text` 등 기존 컴포넌트 사용
2. **토큰 기반 스타일**: hardcode 금지 — 색상은 `vars.colors.*`, 폰트는 `vars.typography.*`
3. **rem 단위**: 치수는 항상 `rem` (1rem = 10px 기준, 예: `1.6rem` = 16px)
4. **커스텀 CSS는 `.css.ts`**: 인라인 style에 레이아웃 외 스타일 작성 금지

---

## 컴포넌트 Import 경로

```typescript
import { Button }      from '@repo/ui/Button';
import { Text }        from '@repo/ui/Text';
import { Flex }        from '@repo/ui/Flex';
import { TextField }   from '@repo/ui/TextField';
import { CheckBox }    from '@repo/ui/CheckBox';
import { Radio }       from '@repo/ui/Radio';
import { Option }      from '@repo/ui/Option';
import { Divider }     from '@repo/ui/Divider';
import { Spinner }     from '@repo/ui/Spinner';
import { Modal }       from '@repo/ui/Modal';
import { Tag }         from '@repo/ui/Tag';
import { Chip }        from '@repo/ui/Chips/Chip';
import TabBar          from '@repo/ui/TabBar';
import Dropdown        from '@repo/ui/DropDown';
import { Stepper }     from '@repo/ui/Stepper';
import { useModal }    from '@repo/ui/hooks';
import { useToast }    from '@repo/ui/hooks';
```

---

## 1. Flex — 레이아웃

`div` + flexbox CSS 대신 `Flex` 컴포넌트를 쓴다.

```typescript
<Flex
  direction="column"        // 'row' | 'column'
  align="center"            // 'flexStart' | 'flexEnd' | 'center' | 'stretch' | 'baseline'
  justify="spaceBetween"    // 'flexStart' | 'flexEnd' | 'center' | 'spaceBetween' | ...
  gap="1.6rem"
  width="100%"
  height="100%"
  padding="2.4rem"
  paddingTop="1.6rem"
  paddingBottom="1.6rem"
  paddingLeft="2rem"
  paddingRight="2rem"
  wrap="wrap"
  tag="section"             // 기본값 'div', 시맨틱 태그 변경 가능
>
  ...
</Flex>
```

---

## 2. Text — 타이포그래피

텍스트는 `<p>`, `<span>` 대신 `Text`를 쓴다. `variant`로 사이즈+굵기를 동시에 지정.

```typescript
<Text variant="md1_text_semibold" color="grayscale70">
  라벨 텍스트
</Text>
```

### variant 목록 (사이즈_타입_굵기)

| variant | 크기 | 굵기 |
|---------|------|------|
| `xxl_title_bold` | 28px | 700 |
| `xxl_title_semibold` | 28px | 600 |
| `xl_title_bold` | 24px | 700 |
| `xl_title_semibold` | 24px | 600 |
| `lg_subtitle_bold` | 20px | 700 |
| `lg_subtitle_semibold` | 20px | 600 |
| `lg_subtitle_medium` | 20px | 500 |
| `md1_text_bold` | 18px | 700 |
| `md1_text_semibold` | 18px | 600 |
| `md1_text_medium` | 18px | 500 |
| `md1_text_regular` | 18px | 400 |
| `md2_text_bold` | 16px | 700 |
| `md2_text_semibold` | 16px | 600 |
| `md2_text_medium` | 16px | 500 |
| `md2_text_regular` | 16px | 400 |
| `sm_caption_semibold` | 14px | 600 |
| `sm_caption_medium` | 14px | 500 |
| `sm_caption_regular` | 14px | 400 |
| `xs_caption_semibold` | 12px | 600 |
| `xs_caption_medium` | 12px | 500 |
| `xs_caption_regular` | 12px | 400 |

### color 목록 (주요)

| color 값 | 설명 |
|----------|------|
| `grayscale90` | 가장 진한 회색 (거의 검정) |
| `grayscale70` | 진한 회색 |
| `grayscale60` | 중간 회색 |
| `grayscale50` | 보통 회색 |
| `grayscale30` | 연한 회색 |
| `primary5` ~ `primary90` | 브랜드 블루 계열 |
| `mint5` ~ `mint90` | 민트 계열 |
| `violet5` ~ `violet90` | 바이올렛 계열 |
| `pink5` ~ `pink90` | 핑크 계열 |
| `success` | 초록 (#22D363) |
| `error` | 빨강 (#FF3232) |
| `white` / `black` | 흰색/검정 |
| `inherit` | 부모 색상 상속 |

---

## 3. Button

```typescript
<Button
  variant="main"          // 'main' | 'sub' | 'basic' | 'stroke' | 'white'
  size="48"               // '32' | '40' | '48'(기본) | '56' | '64'
  width="100%"            // 기본값: 100%
  disabled={!isValid}
  isLoading={isPending}
  loadingText="저장 중..."
  leftIcon={<IcSomething />}
  onClick={handleClick}
>
  버튼 텍스트
</Button>
```

| variant | 용도 |
|---------|------|
| `main` | 주요 CTA (파란색) |
| `sub` | 보조 액션 (옅은 파란색) |
| `basic` | 일반 액션 (회색) |
| `stroke` | 테두리만 |
| `white` | 흰색 배경, 테두리 있음 |

---

## 4. Input

### TextField — 라벨 + 에러 메시지 포함

```typescript
<TextField
  title="이메일"
  description="로그인에 사용할 이메일을 입력하세요."
  errorMessage={errors.email?.message}  // 있으면 자동으로 에러 스타일
  successMessage="사용 가능한 이메일입니다."
  inputProps={{
    placeholder: 'example@email.com',
    value,
    onChange,
    type: 'email',
  }}
/>
```

### BaseInput — 라벨 없는 단순 입력

```typescript
<BaseInput
  hasError={!!error}
  icon={<IcSearch />}
  showClear={!!value}
  onClear={() => setValue('')}
  size="auth"             // 'search' | 'club' | 'auth'(기본)
  inputProps={{ placeholder: '검색', value, onChange }}
/>
```

---

## 5. CheckBox / Radio / Option

단독 체크박스/라디오:
```typescript
<CheckBox isChecked={checked} onChange={() => setChecked(!checked)} size="2.4rem" />
<Radio isChecked={selected} onChange={() => setSelected(true)} size="1.8rem" />
```

라벨과 함께 (권장):
```typescript
// checkbox with label
<Option
  type="checkbox"
  label="전체 동의"
  isChecked={allChecked}
  onChange={handleToggleAll}
  width="100%"
/>

// radio with label
<Option
  type="radio"
  label="관리자"
  isSelected={role === 'ADMIN'}
  onChange={() => setRole('ADMIN')}
/>
```

---

## 6. Divider

```typescript
<Divider direction="row" length="100%" borderColor="grayscale10" />  // 가로선
<Divider direction="column" length="1.6rem" borderColor="grayscale30" />  // 세로선
```

---

## 7. Spinner

```typescript
// 전체 화면 로딩
<Flex width="100%" height="100vh" justify="center" align="center">
  <Spinner />
</Flex>

// 인라인 로딩
<Spinner size="2rem" color="#5B8FF9" />
```

---

## 8. Tag / Chip

```typescript
// Tag: 상태/분류 배지
<Tag color="primary" withCircle>서류</Tag>
<Tag color="success">합격</Tag>

// Chip: 작은 배지
<Chip bg="primary5" color="primary70">프론트엔드</Chip>
```

---

## 9. Toast — 피드백 메시지

`useToast()` 훅으로 어디서든 토스트 메시지를 띄운다. 별도 상태 관리 불필요.

```typescript
import { useToast } from '@repo/ui/hooks';

const toast = useToast();

// 성공
toast.success('저장되었습니다.');

// 에러
toast.error('저장에 실패했습니다. 다시 시도해주세요.');

// 기본 (아이콘 없음)
toast.default('처리 중입니다.');
```

### 옵션

```typescript
// duration 지정 (ms, 기본값 3000)
toast.error('잠시 후 다시 시도해주세요.', 5000);

// variant: 'solid'(기본) | 'outline'
toast.success('복사되었습니다.', { variant: 'outline' });

// duration + variant 동시
toast.success('저장 완료!', { variant: 'outline', duration: 2000 });
```

| variant | 용도 |
| --- | --- |
| `solid` | 기본 — 색상 배경 (성공=초록, 에러=빨강) |
| `outline` | 테두리만 — 덜 강조할 때 |

### 주의

- `OverlayProvider`가 루트 레이아웃(`Providers.tsx`)에 이미 설정되어 있어서 별도 설정 불필요
- 서버 컴포넌트에서 사용 불가 (`'use client'` 컴포넌트에서만)

---

## 10. TabBar

```typescript
<TabBar
  tabs={['전체', '지원자', '합격자']}
  active={activeTab}
  onChange={setActiveTab}
  counts={{ '전체': 42, '지원자': 30, '합격자': 12 }}
/>
```

---

## 10. vanilla-extract `.css.ts` 작성법

컴포넌트별 커스텀 스타일은 같은 폴더에 `ComponentName.css.ts` 파일로 작성.

```typescript
// SomePage.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4rem',
  padding: '2.4rem',
  backgroundColor: vars.colors.white,
  borderRadius: vars.borderRadius[12],
});

export const title = style({
  fontSize: vars.typography.fontSize[20],
  fontWeight: vars.typography.fontWeight.semibold,
  color: vars.colors.grayscale90,
});
```

```typescript
// SomePage.tsx
import * as styles from './SomePage.css';

export function SomePage() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>제목</p>
    </div>
  );
}
```

### vars 구조

```typescript
vars.colors.primary50          // 색상
vars.colors.grayscale70
vars.colors.error
vars.borderRadius[8]           // '0.8rem'
vars.borderRadius[16]
vars.typography.fontSize[16]   // '1.6rem'
vars.typography.fontSize[20]
vars.typography.fontWeight.bold      // '700'
vars.typography.fontWeight.semibold  // '600'
vars.typography.fontWeight.medium    // '500'
vars.typography.fontWeight.regular   // '400'
```

---

## 11. 자주 쓰는 패턴

### 섹션 카드
```typescript
<Flex direction="column" gap="1.6rem" padding="2.4rem" width="100%">
  <Text variant="lg_subtitle_semibold" color="grayscale90">섹션 제목</Text>
  {/* 내용 */}
</Flex>
```

### 라벨 + 값
```typescript
<Flex align="center" gap="1.2rem">
  <Text variant="sm_caption_medium" color="grayscale50">이름</Text>
  <Text variant="md2_text_regular" color="grayscale90">이채원</Text>
</Flex>
```

### 버튼 그룹
```typescript
<Flex gap="0.8rem" width="100%">
  <Button variant="stroke" size="40" onClick={onCancel}>취소</Button>
  <Button variant="main" size="40" disabled={!isValid} onClick={onConfirm}>저장</Button>
</Flex>
```

### 빈 상태 (Empty State)
```typescript
<Flex direction="column" align="center" justify="center" gap="1.2rem" height="100%">
  <Text variant="md1_text_medium" color="grayscale50">데이터가 없습니다.</Text>
</Flex>
```

---

## 12. 금지 사항

```typescript
// ❌ hardcode 색상
<div style={{ color: '#5B8FF9' }} />
<p style={{ fontSize: '16px' }} />

// ✅ 토큰 사용
<Text color="primary50" variant="md2_text_regular" />

// ❌ raw div + flex
<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} />

// ✅ Flex 컴포넌트
<Flex direction="column" gap="1.6rem" />

// ❌ px 단위
gap: '16px', padding: '24px'

// ✅ rem 단위 (10px = 1rem)
gap: '1.6rem', padding: '2.4rem'

// ❌ 인라인 style에 복잡한 스타일
<div style={{ borderRadius: '8px', backgroundColor: '#fff', boxShadow: '...' }} />

// ✅ .css.ts 파일로 분리
<div className={styles.card} />
```
