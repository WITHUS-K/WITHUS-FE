'use client';

import { useForm, Controller } from 'react-hook-form';
import { Flex } from '@repo/ui/Flex';
import { TextField } from '@repo/ui/TextField';
import { Button } from '@repo/ui/Button';
import { buttonStyle } from '../../../join/_components/Step1/Step1.css';
import { useEmailVerifyMutation } from '@web/store/mutation/useEmailVerifyMutation';

interface FindFormValues {
  name: string;
  email: string;
}

export default function FindForm() {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FindFormValues>({
    mode: 'onBlur',
    defaultValues: { name: '', email: '' },
  });

  const { mutate: sendVerify } = useEmailVerifyMutation();

  const onSubmit = (data: FindFormValues) => {
    sendVerify(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="2.8rem" width="43.4rem">
        <Controller
          name="name"
          control={control}
          rules={{ required: '이름을 입력해주세요.' }}
          render={({ field, fieldState }) => (
            <TextField
              title="이름"
              inputProps={{ ...field, placeholder: '이름을 입력해주세요.' }}
              errorMessage={fieldState.error?.message}
              size="auth"
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '올바른 이메일 형식을 입력해주세요.',
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              title="이메일"
              inputProps={{ ...field, placeholder: '이메일을 입력해주세요.' }}
              errorMessage={fieldState.error?.message}
              size="auth"
            />
          )}
        />
        <Button
          type="submit"
          variant="main"
          size="64"
          width="43.4rem"
          className={buttonStyle}
          disabled={!isValid}
        >
          이메일로 인증코드 받기
        </Button>
      </Flex>
    </form>
  );
}
