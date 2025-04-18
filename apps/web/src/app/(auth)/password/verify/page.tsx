'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { Flex } from '@repo/ui/Flex';
import { TextField } from '@repo/ui/TextField';
import { Button } from '@repo/ui/Button';
import { Text } from '@repo/ui/Text';
import { buttonStyle } from '../../join/_components/Step1/Step1.css';
interface Form {
  code: string;
}

export default function VerifyPage() {
  const router = useRouter();
  const params = useSearchParams();
  const name = params.get('name') || '';
  const email = params.get('email') || '';

  const [isVerified, setIsVerified] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<Form>({
    mode: 'onBlur',
    defaultValues: { code: '' },
  });

  // 인증코드 확인
  const onConfirm = ({ code }: Form) => {
    setIsVerified(true);
  };

  // 비밀번호 재설정 페이지로 이동
  const onReset = () => {
    router.push(
      `/password/reset?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`
    );
  };

  // 인증코드 재전송
  const onResend = () => {};

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
                inputProps={{ ...field, placeholder: '인증코드 6자리' }}
                errorMessage={fieldState.error?.message}
                size="auth"
                width="34.4rem"
              />
            )}
          />
          <Button
            type="submit"
            variant="sub"
            size="56"
            width="6.4rem"
            style={{ marginTop: '2.8rem' }}
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
            onClick={onReset}
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
            onClick={onResend}
          >
            이메일로 인증코드 다시 받기
          </Text>
        </Flex>
      </Flex>
    </form>
  );
}
