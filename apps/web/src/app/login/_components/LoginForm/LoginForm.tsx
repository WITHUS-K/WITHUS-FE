'use client';

import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@repo/ui/TextField';
import { Button } from '@repo/ui/Button';
import { Flex } from '@repo/ui/Flex';

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log('로그인 데이터:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="1.2rem" width="42rem">
        <Controller
          control={control}
          name="email"
          rules={{
            required: '이메일을 입력해주세요',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '올바른 이메일 형식을 입력해주세요',
            },
          }}
          render={({ field }) => (
            <TextField
              inputProps={{ ...field, placeholder: '이메일', type: 'text' }}
              errorMessage={errors.email?.message}
              size="auth"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{
            required: '비밀번호를 입력해주세요',
            minLength: {
              value: 8,
              message: '비밀번호는 최소 8자 이상이어야 합니다',
            },
          }}
          render={({ field }) => (
            <TextField
              inputProps={{
                ...field,
                placeholder: '비밀번호',
                type: 'password',
              }}
              errorMessage={errors.password?.message}
              size="auth"
            />
          )}
        />

        <Button
          type="submit"
          variant="main"
          disabled={!isValid}
          style={{ marginTop: '1.2rem' }}
          size="64"
        >
          로그인하기
        </Button>
      </Flex>
    </form>
  );
}
