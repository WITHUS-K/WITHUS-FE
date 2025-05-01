'use client';

import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@repo/ui/TextField';
import { Button } from '@repo/ui/Button';
import { Flex } from '@repo/ui/Flex';
import { HTTPError } from 'ky';
import { useLoginMutation } from '@web/store/mutation/useLoginMutation';
import { LoginRequest } from '@web/types/auth';

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<LoginRequest>({
    mode: 'onBlur',
    defaultValues: { email: '', password: '' },
  });

  const { mutate } = useLoginMutation();

  // 에러 로직 처리 - 서버랑 이야기 후 처리하기!! 임시로 해놓음!
  const onSubmit = (data: LoginRequest) => {
    console.log('📝 onSubmit 호출됨', data);
    mutate(data, {
      onError: (error) => {
        if (error instanceof HTTPError && error.response.status === 401) {
          // 인증 실패: 이메일/비번 불일치
          setError('password', {
            type: 'manual',
            message: '비밀번호가 일치하지 않습니다. 다시 입력해주세요.',
          });
          setError('email', {
            type: 'manual',
            message: '가입된 이메일이 존재하지 않습니다. 다시 입력해주세요.',
          });
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
          name="password"
          control={control}
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
