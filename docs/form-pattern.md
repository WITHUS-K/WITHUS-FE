# Form 패턴 가이드 — react-hook-form + TextField

이 프로젝트의 폼은 **react-hook-form** + `Controller` + `@repo/ui/TextField` 조합으로 구현한다.

---

## 기본 구조

```typescript
'use client';

import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@repo/ui/TextField';
import { Button } from '@repo/ui/Button';
import { Flex } from '@repo/ui/Flex';

interface MyFormValues {
  email: string;
  password: string;
}

export function MyForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<MyFormValues>({
    mode: 'onTouched',                   // blur 시점에 검증
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: MyFormValues) => {
    // mutation 호출 등
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="1.2rem">
        <Controller
          name="email"
          control={control}
          rules={{
            required: '이메일을 입력해주세요',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '올바른 이메일 형식을 입력해주세요',
            },
          }}
          render={({ field }) => (
            <TextField
              inputProps={{ ...field, placeholder: '이메일', type: 'email' }}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Button type="submit" variant="main" disabled={!isValid}>
          제출
        </Button>
      </Flex>
    </form>
  );
}
```

---

## useForm 옵션

```typescript
const { control, handleSubmit, formState, setError, watch, setValue, reset } =
  useForm<FormValues>({
    mode: 'onTouched',    // 언제 검증할지: 'onTouched' | 'onChange' | 'onBlur' | 'onSubmit'
    defaultValues: {      // 초기값 (항상 지정할 것)
      email: '',
      name: '',
    },
  });
```

| mode | 검증 시점 |
| --- | --- |
| `onTouched` | 첫 blur 이후부터 변경마다 (권장) |
| `onChange` | 입력할 때마다 |
| `onBlur` | blur할 때마다 |
| `onSubmit` | submit할 때만 |

---

## Controller + TextField 연동

`TextField`는 react-hook-form과 직접 통합되지 않으므로 반드시 `Controller`로 감싼다.

```typescript
<Controller
  name="fieldName"          // FormValues의 키
  control={control}
  rules={{ required: '필수 항목입니다' }}
  render={({ field }) => (
    <TextField
      title="필드 라벨"
      inputProps={{
        ...field,             // onChange, onBlur, value, name, ref 주입
        placeholder: '입력하세요',
        type: 'text',
        disabled: isPending,  // mutation 중 입력 막기
      }}
      errorMessage={errors.fieldName?.message}  // 자동으로 에러 스타일 적용
    />
  )}
/>
```

---

## rules — 유효성 검사

```typescript
rules={{
  required: '필수 입력 항목입니다',

  minLength: {
    value: 8,
    message: '8자 이상 입력해주세요',
  },

  maxLength: {
    value: 50,
    message: '50자 이하로 입력해주세요',
  },

  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: '올바른 이메일 형식을 입력해주세요',
  },

  validate: (value) => {
    if (value.trim() === '') return '공백만 입력할 수 없습니다';
    return true;  // true 반환 시 통과
  },
}}
```

---

## 서버 에러 처리 — setError

mutation 에러 응답의 에러 코드로 특정 필드에 에러를 수동 설정.

```typescript
const { mutate, isPending } = useSomeMutation();

const onSubmit = (data: FormValues) => {
  mutate(data, {
    onError: async (error) => {
      const errData = await error.response.json() as { code: string };

      if (errData.code === 'USER404') {
        setError('email', {
          type: 'manual',
          message: '가입된 이메일이 존재하지 않습니다.',
        });
      } else if (errData.code === 'USER401') {
        setError('password', {
          type: 'manual',
          message: '비밀번호가 일치하지 않습니다.',
        });
      }
    },
  });
};
```

---

## formState — 폼 상태

```typescript
const { formState: { errors, isValid, isSubmitting, isDirty } } = useForm();

// 제출 버튼 제어
<Button
  type="submit"
  disabled={!isValid || isPending}   // 검증 실패 or 로딩 중 비활성화
  isLoading={isPending}
  loadingText="저장 중..."
>
  저장
</Button>
```

| 상태 | 설명 |
| --- | --- |
| `errors` | 각 필드의 에러 객체 (`errors.email?.message`) |
| `isValid` | 모든 필드가 유효하면 true |
| `isSubmitting` | handleSubmit 실행 중 true |
| `isDirty` | defaultValues와 다른 값이 있으면 true |

---

## 전체 예시 — 로그인 폼

```typescript
'use client';

import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@repo/ui/TextField';
import { Button } from '@repo/ui/Button';
import { Flex } from '@repo/ui/Flex';
import { useLoginMutation } from '@web/store/mutation/useLoginMutation';

interface LoginRequest {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<LoginRequest>({
    mode: 'onTouched',
    defaultValues: { email: '', password: '' },
  });

  const { mutate: login, isPending } = useLoginMutation();

  const onSubmit = (data: LoginRequest) => {
    login(data, {
      onError: async (error) => {
        const { code } = await error.response.json() as { code: string };
        if (code === 'USER404') {
          setError('email', { type: 'manual', message: '가입된 이메일이 없습니다.' });
        } else if (code === 'USER401') {
          setError('password', { type: 'manual', message: '비밀번호가 틀렸습니다.' });
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="1.2rem" width="42rem">
        <Controller
          name="email"
          control={control}
          rules={{
            required: '이메일을 입력해주세요',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '이메일 형식이 아닙니다' },
          }}
          render={({ field }) => (
            <TextField
              inputProps={{ ...field, placeholder: '이메일', type: 'email', disabled: isPending }}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: '비밀번호를 입력해주세요',
            minLength: { value: 8, message: '8자 이상 입력해주세요' },
          }}
          render={({ field }) => (
            <TextField
              inputProps={{ ...field, placeholder: '비밀번호', type: 'password', disabled: isPending }}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Button
          type="submit"
          variant="main"
          size="64"
          disabled={!isValid}
          isLoading={isPending}
          loadingText="로그인 중..."
        >
          로그인하기
        </Button>
      </Flex>
    </form>
  );
}
```

---

## 체크리스트

- [ ] `useForm`에 `mode: 'onTouched'`와 `defaultValues` 반드시 지정
- [ ] `TextField`는 반드시 `Controller`로 감싸기
- [ ] `render`의 `field`를 `inputProps`에 스프레드 (`...field`)
- [ ] `errorMessage={errors.fieldName?.message}` 연결
- [ ] 제출 버튼 `disabled={!isValid}` + `isLoading={isPending}` 설정
- [ ] 서버 에러는 `setError()`로 해당 필드에 표시
