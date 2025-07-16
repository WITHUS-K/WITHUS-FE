'use client';

import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@repo/ui/TextField';
import { Button } from '@repo/ui/Button';
import { Flex } from '@repo/ui/Flex';
import { useLoginMutation } from '@web/store/mutation/useLoginMutation';
import { LoginRequest } from '@web/types/auth';

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

  const onSubmit = async (data: LoginRequest) => {
    console.log('📝 onSubmit 호출됨', data);
    login(data, {
      onError: async (error) => {
        const errData = (await error.response.json()) as { code: string };
        if (errData.code === 'USER404') {
          setError('email', {
            type: 'manual',
            message: '가입된 이메일이 존재하지 않습니다. 다시 입력해주세요.',
          });
        } else if (errData.code === 'USER401') {
          setError('password', {
            type: 'manual',
            message: '비밀번호가 일치하지 않습니다. 다시 입력해주세요.',
          });
        } else if (errData.code === 'COMMON401') {
          setError('password', {
            type: 'manual',
            message: '인증에 실패했습니다.',
          });
        }
        console.log(error);
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
              inputProps={{
                ...field,
                placeholder: '이메일',
                type: 'text',
                disabled: isPending,
              }}
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
                disabled: isPending,
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
          isLoading={isPending}
          loadingText="로그인 중..."
        >
          로그인하기
        </Button>
      </Flex>
    </form>
  );
}
