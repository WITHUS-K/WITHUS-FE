'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@repo/ui/TextField';
import { Button } from '@repo/ui/Button';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { SelectDropdown } from '@repo/ui/DropDown';
import { useAdminJoinMutation } from '@web/store/mutation/useAdminJoinMutation';
import { AdminJoinRequest } from '@web/types/auth';

interface Step3AdminProps {
  onBack: () => void;
}

interface FormValues {
  name: string;
  club: string;
  emailLocal: string;
  emailDomain: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  authCode: string;
}

export default function Step3Admin({ onBack }: Step3AdminProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      club: '',
      emailLocal: '',
      emailDomain: '',
      password: '',
      passwordConfirm: '',
      phone: '',
      authCode: '',
    },
  });

  const [showAuthInput, setShowAuthInput] = useState(false);
  const [isAuthConfirmed, setIsAuthConfirmed] = useState(false);

  const emailLocal = watch('emailLocal');
  const emailDomain = watch('emailDomain');
  const authCode = watch('authCode');
  const canCheckEmail = Boolean(emailLocal && emailDomain);

  const { mutate: joinAdmin } = useAdminJoinMutation();

  const onSubmit = (data: FormValues) => {
    const payload: AdminJoinRequest = {
      name: data.name,
      organizationName: data.club,
      email: `${data.emailLocal}@${data.emailDomain}`,
      password: data.password,
      phoneNumber: data.phone.replace(/-/g, ''),
    };
    joinAdmin(payload);
  };

  const handleConfirmAuth = () => {
    // TODO: 이메일/문자 인증 API 호출 후 검증
    setIsAuthConfirmed(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        direction="column"
        gap="4rem"
        width="100%"
        paddingBottom="7.2rem"
        marginTop="2.8rem"
      >
        {/* 이름 */}
        <Controller
          control={control}
          name="name"
          rules={{ required: '이름을 입력해주세요.' }}
          render={({ field }) => (
            <TextField
              title="이름"
              inputProps={{ ...field, placeholder: '이름을 입력해주세요.' }}
              errorMessage={errors.name?.message}
              size="auth"
            />
          )}
        />

        {/* 동아리명 */}
        <Controller
          control={control}
          name="club"
          rules={{ required: '동아리명을 입력해주세요.' }}
          render={({ field }) => (
            <TextField
              title="동아리명"
              inputProps={{ ...field, placeholder: '동아리명을 입력해주세요.' }}
              errorMessage={errors.club?.message}
              size="auth"
            />
          )}
        />

        {/* 이메일 */}
        <Flex direction="column" gap="1.2rem">
          <Flex gap="1.2rem">
            <Controller
              control={control}
              name="emailLocal"
              rules={{
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^[^\s@]+$/,
                  message: '올바른 이메일 형식을 입력해주세요.',
                },
              }}
              render={({ field }) => (
                <TextField
                  title="이메일"
                  inputProps={{ ...field, placeholder: '이메일' }}
                  errorMessage={errors.emailLocal?.message}
                  size="auth"
                  width="19.7rem"
                />
              )}
            />
            <Text
              variant="md1_text_semibold"
              color="grayscale50"
              style={{ marginTop: '4.5rem' }}
            >
              @
            </Text>
            <Controller
              control={control}
              name="emailDomain"
              rules={{ required: '도메인을 선택해주세요.' }}
              render={({ field }) => (
                <SelectDropdown
                  value={field.value}
                  onSelect={field.onChange}
                  style={{ marginTop: '2.8rem' }}
                />
              )}
            />
          </Flex>
          <Button variant="sub" size="56" disabled={!canCheckEmail}>
            중복확인
          </Button>
        </Flex>

        {/* 비밀번호 */}
        <Controller
          control={control}
          name="password"
          rules={{
            required: '비밀번호를 입력해주세요.',
            minLength: { value: 8, message: '8자 이상 입력해주세요.' },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/,
              message: '영문, 숫자, 특수문자를 조합해주세요.',
            },
          }}
          render={({ field }) => (
            <TextField
              title="비밀번호"
              description="영문, 숫자, 특수문자를 조합하여 8~20자를 입력해주세요."
              inputProps={{
                ...field,
                placeholder: '비밀번호를 입력해주세요.',
                type: 'password',
              }}
              errorMessage={errors.password?.message}
              size="auth"
            />
          )}
        />

        {/* 비밀번호 확인 */}
        <Controller
          control={control}
          name="passwordConfirm"
          rules={{
            required: '비밀번호 확인을 입력해주세요.',
            validate: (v) =>
              v === watch('password') || '비밀번호가 일치하지 않습니다.',
          }}
          render={({ field }) => (
            <TextField
              title="비밀번호 확인"
              inputProps={{
                ...field,
                placeholder: '비밀번호를 다시 입력해주세요.',
                type: 'password',
              }}
              errorMessage={errors.passwordConfirm?.message}
              size="auth"
            />
          )}
        />

        {/* 핸드폰 번호 & 인증 */}
        <Flex direction="column" gap="1.6rem">
          <Flex gap="1.2rem">
            <Controller
              control={control}
              name="phone"
              rules={{
                required: '핸드폰 번호를 입력해주세요.',
                pattern: {
                  value: /^010-?\d{4}-?\d{4}$/,
                  message: '올바른 형식으로 입력해주세요.',
                },
              }}
              render={({ field }) => (
                <TextField
                  title="핸드폰 번호"
                  inputProps={{
                    ...field,
                    placeholder: '핸드폰 번호',
                    type: 'text',
                  }}
                  errorMessage={errors.phone?.message}
                  size="auth"
                  width="29.5rem"
                />
              )}
            />
            <Button
              type="button"
              variant="sub"
              size="56"
              width="12.7rem"
              onClick={() => setShowAuthInput(true)}
              style={{ marginTop: '2.8rem' }}
            >
              인증번호 받기
            </Button>
          </Flex>
          {showAuthInput && (
            <Flex gap="1.2rem">
              <Controller
                control={control}
                name="authCode"
                rules={{ required: '인증번호를 입력해주세요.' }}
                render={({ field }) => (
                  <TextField
                    inputProps={{
                      ...field,
                      placeholder: '인증번호',
                      type: 'text',
                    }}
                    errorMessage={errors.authCode?.message}
                    size="auth"
                    width="29.5rem"
                  />
                )}
              />
              <Button
                type="button"
                variant="sub"
                size="56"
                width="12.7rem"
                disabled={!authCode}
                onClick={handleConfirmAuth}
              >
                인증번호 확인
              </Button>
            </Flex>
          )}
        </Flex>

        {/* 이전 / 완료 */}
        <Flex gap="2rem" justify="center" marginTop="3.2rem">
          <Button
            type="button"
            variant="basic"
            size="64"
            width="20.7rem"
            onClick={onBack}
          >
            이전
          </Button>
          <Button
            type="submit"
            variant="main"
            size="64"
            width="20.7rem"
            disabled={!isValid || !isAuthConfirmed}
          >
            완료
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}
