'use client';

import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { Flex } from '@repo/ui/Flex';
import { TextField } from '@repo/ui/TextField';
import { Button } from '@repo/ui/Button';
import { buttonStyle } from '../../../join/_components/Step1/Step1.css';
import { useResetPasswordMutation } from '@web/store/mutation/useResetPasswordMutation';

interface ResetFormProps {
  searchParams: URLSearchParams;
}

interface ResetFormValues {
  password: string;
  passwordConfirm: string;
}

export default function ResetForm({ searchParams }: ResetFormProps) {
  const name = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<ResetFormValues>({
    mode: 'onBlur',
    defaultValues: { password: '', passwordConfirm: '' },
  });

  // 실시간으로 입력값을 가져와 유효성 검사
  const passwordValue = watch('password');
  const passwordConfirmValue = watch('passwordConfirm');
  const isPasswordValid =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/.test(passwordValue);
  const isPasswordConfirmMatch =
    passwordConfirmValue.length > 0 && passwordValue === passwordConfirmValue;

  const { mutate: resetPassword } = useResetPasswordMutation();

  const onSubmit = ({ password }: ResetFormValues) => {
    resetPassword(
      { email, newPassword: password },
      {
        onSuccess: () => {
          router.push(`/password/complete?name=${encodeURIComponent(name)}`);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="2.8rem" width="43.4rem">
        {/* 새 비밀번호 */}
        <Controller
          name="password"
          control={control}
          rules={{
            required: '새 비밀번호를 입력해주세요.',
            minLength: {
              value: 8,
              message: '영문, 숫자, 특수문자를 조합하여 8~20자로 입력해주세요.',
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/,
              message: '영문, 숫자, 특수문자를 조합하여 8~20자로 입력해주세요.',
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              title="새 비밀번호"
              description="영문, 숫자, 특수문자를 조합하여 8~20자를 입력해주세요."
              inputProps={{
                ...field,
                placeholder: '비밀번호를 입력해주세요.',
                type: 'password',
              }}
              errorMessage={fieldState.error?.message}
              success={isPasswordValid}
              successMessage="변경 가능한 비밀번호입니다."
              size="auth"
            />
          )}
        />

        {/* 비밀번호 확인 */}
        <Controller
          name="passwordConfirm"
          control={control}
          rules={{
            required: '비밀번호 확인을 입력해주세요.',
            validate: (v) =>
              v === passwordValue ||
              '비밀번호가 일치하지 않습니다. 다시 입력해주세요.',
          }}
          render={({ field, fieldState }) => (
            <TextField
              title="새 비밀번호 확인"
              inputProps={{
                ...field,
                placeholder: '비밀번호를 다시 입력해주세요.',
                type: 'password',
              }}
              errorMessage={fieldState.error?.message}
              success={isPasswordConfirmMatch}
              successMessage="비밀번호가 일치합니다."
              size="auth"
            />
          )}
        />

        {/* 제출 버튼 */}
        <Button
          type="submit"
          variant="main"
          size="64"
          width="43.4rem"
          className={buttonStyle}
          disabled={!isValid}
        >
          변경 완료
        </Button>
      </Flex>
    </form>
  );
}
