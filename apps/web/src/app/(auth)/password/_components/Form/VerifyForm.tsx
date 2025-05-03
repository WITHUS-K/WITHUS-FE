'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Flex } from '@repo/ui/Flex';
import { TextField } from '@repo/ui/TextField';
import { Button } from '@repo/ui/Button';
import { Text } from '@repo/ui/Text';
import { buttonStyle } from '../../../join/_components/Step1/Step1.css';
import { useEmailConfirmMutation } from '@web/store/mutation/useEmailConfirmMutation';
import { useEmailVerifyMutation } from '@web/store/mutation/useEmailVerifyMutation';

interface VerifyFormProps {
  searchParams: URLSearchParams;
}

interface VerifyFormValues {
  code: string;
}

export default function VerifyForm({ searchParams }: VerifyFormProps) {
  const router = useRouter();
  const name = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';
  const [isVerified, setIsVerified] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<VerifyFormValues>({
    mode: 'onBlur',
    defaultValues: { code: '' },
  });

  const { mutate: confirmCode, isError: confirmError } =
    useEmailConfirmMutation();

  const { mutate: resendCode } = useEmailVerifyMutation();

  const onConfirm = ({ code }: VerifyFormValues) => {
    confirmCode(
      { email, code },
      {
        onSuccess: () => setIsVerified(true),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onConfirm)}>
      <Flex direction="column" gap="2.4rem" width="43.4rem">
        <Flex gap="1.2rem">
          <Controller
            name="code"
            control={control}
            rules={{ required: '인증코드를 입력해주세요.' }}
            render={({ field, fieldState }) => (
              <TextField
                title="이메일로 받은 인증코드를 입력해주세요."
                inputProps={{
                  ...field,
                  placeholder: '인증코드 6자리',
                }}
                size="auth"
                width="34.4rem"
                errorMessage={
                  confirmError
                    ? '인증번호가 일치하지 않습니다. 다시 입력해주세요.'
                    : fieldState.error?.message
                }
                success={isVerified}
                successMessage="인증이 완료되었습니다."
              />
            )}
          />
          <Button
            type="submit"
            variant="sub"
            size="56"
            width="6.4rem"
            style={{ marginTop: '3.3rem' }}
            disabled={!isValid}
          >
            확인
          </Button>
        </Flex>

        <Flex
          direction="column"
          gap="1.6rem"
          className={buttonStyle}
          align="center"
          width="43.4rem"
        >
          <Button
            type="button"
            variant="main"
            size="64"
            disabled={!isVerified}
            onClick={() =>
              router.push(
                `/password/reset?name=${encodeURIComponent(name)}&email=${encodeURIComponent(
                  email
                )}`
              )
            }
          >
            비밀번호 재설정하기
          </Button>
          <Text
            variant="md2_text_medium"
            color="grayscale60"
            style={{
              textAlign: 'center',
              cursor: 'pointer',
              textDecorationLine: 'underline',
            }}
            onClick={() => resendCode({ name, email })}
          >
            이메일로 인증코드 다시 받기
          </Text>
        </Flex>
      </Flex>
    </form>
  );
}
