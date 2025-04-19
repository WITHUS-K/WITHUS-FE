'use client';
import { useForm, Controller } from 'react-hook-form';
import { Flex } from '@repo/ui/Flex';
import { TextField } from '@repo/ui/TextField';
import { Button } from '@repo/ui/Button';
import { buttonStyle } from '../../../join/_components/Step1/Step1.css';

interface ResetFormProps {
  router: ReturnType<typeof import('next/navigation').useRouter>;
  searchParams: URLSearchParams;
}
interface ResetFormValues {
  password: string;
  passwordConfirm: string;
}

export default function ResetForm({ router, searchParams }: ResetFormProps) {
  const name = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<ResetFormValues>({
    mode: 'onBlur',
    defaultValues: { password: '', passwordConfirm: '' },
  });
  const onSubmit = ({ password }: ResetFormValues) =>
    router.push(`/password/complete?name=${encodeURIComponent(name)}`);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="2.8rem" width="43.4rem">
        <Controller
          name="password"
          control={control}
          rules={{
            required: '새 비밀번호를 입력해주세요.',
            minLength: { value: 8, message: '8자 이상 입력해주세요.' },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/,
              message: '영문, 숫자, 특수문자를 조합해주세요.',
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
              size="auth"
            />
          )}
        />
        <Controller
          name="passwordConfirm"
          control={control}
          rules={{
            required: '비밀번호 확인을 입력해주세요.',
            validate: (v) =>
              v === watch('password') || '비밀번호가 일치하지 않습니다.',
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
              size="auth"
            />
          )}
        />
        <Button
          type="submit"
          variant="main"
          size="64"
          width="43.4rem"
          disabled={!isValid}
          className={buttonStyle}
        >
          변경 완료
        </Button>
      </Flex>
    </form>
  );
}
