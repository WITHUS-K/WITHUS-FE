'use client';

import React from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@repo/ui/TextField';
import { InputField } from '@repo/ui/InputField';
import { SelectDropdown } from '@repo/ui/DropDown';
import { Button } from '@repo/ui/Button';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import {
  IcInputSearch,
  IcInputError,
  IcInputSuccess,
} from '@repo/ui/icons/colored';

import { useEmailCheckMutation } from '@web/store/mutation/useEmailCheckMutation';
import { usePhoneVerifyMutation } from '@web/store/mutation/usePhoneVerifyMutation';
import { usePhoneConfirmMutation } from '@web/store/mutation/usePhoneConfirmMutation';
import { useUserJoinMutation } from '@web/store/mutation/useUserJoinMutation';
import type { UserJoinRequest } from '@web/types/auth';

interface Step3UserProps {
  onBack: () => void;
}

interface FormValues {
  name: string;
  birth: string;
  gender: 'female' | 'male';
  club: string; // club id as string
  emailLocal: string;
  emailDomain: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  authCode: string;
}

export default function Step3User({ onBack }: Step3UserProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      birth: '',
      gender: undefined,
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

  const emailLocal = watch('emailLocal');
  const emailDomain = watch('emailDomain');
  const phone = watch('phone');
  const authCode = watch('authCode');

  const canCheckEmail = Boolean(emailLocal && emailDomain);

  // 이메일 중복확인
  const {
    mutate: checkEmail,
    isSuccess: isEmailChecked,
    data: emailCheckData,
    isError: isEmailCheckError,
  } = useEmailCheckMutation();

  // 휴대폰 인증번호 요청
  const {
    mutate: sendVerify,
    isSuccess: isVerifySent,
    isError: isSendError,
  } = usePhoneVerifyMutation();

  // 휴대폰 인증 확인
  const {
    mutate: confirmVerify,
    isSuccess: isPhoneConfirmed,
    isError: isConfirmError,
  } = usePhoneConfirmMutation();

  // 사용자 회원가입
  const { mutate: joinUser } = useUserJoinMutation();

  const onSubmit = (data: FormValues) => {
    const payload: UserJoinRequest = {
      name: data.name,
      birthDate: data.birth,
      gender: data.gender.toUpperCase() as 'MALE' | 'FEMALE' | 'NONE',
      organizationId: Number(data.club),
      email: `${data.emailLocal}@${data.emailDomain}`,
      password: data.password,
      phoneNumber: data.phone.replace(/-/g, ''),
    };
    joinUser(payload);
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

        {/* 생년월일 */}
        <Controller
          control={control}
          name="birth"
          rules={{ required: '생년월일을 입력해주세요.' }}
          render={({ field }) => (
            <TextField
              title="생년월일"
              inputProps={{
                ...field,
                placeholder: 'YYYY-MM-DD',
                type: 'text',
              }}
              errorMessage={errors.birth?.message}
              size="auth"
            />
          )}
        />

        {/* 성별 */}
        <Flex direction="column" gap="0.8rem">
          <Text variant="md1_text_semibold" color="grayscale80">
            성별
          </Text>
          <Controller
            control={control}
            name="gender"
            rules={{ required: '성별을 선택해주세요.' }}
            render={({ field }) => (
              <Flex gap="1.6rem">
                <Button
                  variant="sub"
                  isPressed={field.value === 'female'}
                  onClick={() => field.onChange('female')}
                  size="56"
                  width="20.9rem"
                >
                  여성
                </Button>
                <Button
                  variant="sub"
                  isPressed={field.value === 'male'}
                  onClick={() => field.onChange('male')}
                  size="56"
                  width="20.9rem"
                >
                  남성
                </Button>
              </Flex>
            )}
          />
        </Flex>

        {/* 동아리 선택 (readOnly) */}
        <Flex direction="column" gap="0.8rem" width="100%">
          <Text variant="md1_text_semibold" color="grayscale80">
            동아리명
          </Text>
          <Controller
            control={control}
            name="club"
            rules={{ required: '동아리를 선택해주세요.' }}
            render={({ field }) => (
              <InputField
                placeholder="동아리명을 검색해주세요."
                value={field.value}
                onChange={field.onChange}
                readOnly
                onClick={() =>
                  (window.location.href = `/join/3/club-search?type=user`)
                }
                icon={<IcInputSearch width={24} height={24} />}
                size="club"
              />
            )}
          />
          {errors.club && (
            <Text variant="sm_caption_regular" color="error">
              {errors.club.message}
            </Text>
          )}
        </Flex>

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
                  message: '올바른 형식이 아닙니다.',
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
                  style={{ marginTop: '3.35rem' }}
                />
              )}
            />
          </Flex>
          <Button
            type="button"
            variant="sub"
            size="56"
            disabled={!canCheckEmail}
            onClick={() => checkEmail(`${emailLocal}@${emailDomain}`)}
          >
            중복확인
          </Button>

          {isEmailCheckError && (
            <Flex gap="0.8rem" align="center">
              <IcInputError width={24} height={24} />
              <Text variant="sm_caption_regular" color="error">
                이메일 확인 중 오류가 발생했습니다.
              </Text>
            </Flex>
          )}
          {isEmailChecked && (
            <Flex gap="0.8rem" align="center">
              {emailCheckData!.isDuplicated ? (
                <IcInputError width={24} height={24} />
              ) : (
                <IcInputSuccess width={24} height={24} />
              )}
              <Text
                variant="sm_caption_regular"
                color={emailCheckData!.isDuplicated ? 'error' : 'success'}
              >
                {emailCheckData!.isDuplicated
                  ? '이미 가입된 이메일입니다.'
                  : '가입 가능한 이메일입니다.'}
              </Text>
            </Flex>
          )}
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
              message: '영문, 숫자, 특수문자를 포함해야 합니다.',
            },
          }}
          render={({ field }) => (
            <TextField
              title="비밀번호"
              description="영문, 숫자, 특수문자를 조합하여 8~20자를 입력해주세요."
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
                placeholder: '비밀번호 다시 입력',
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
                    placeholder: '010-1234-5678',
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
              style={{ marginTop: '3.4rem' }}
              disabled={!phone}
              onClick={() => sendVerify(phone.replace(/-/g, ''))}
            >
              인증번호 받기
            </Button>
          </Flex>

          {isSendError && (
            <Flex gap="0.8rem" align="center">
              <IcInputError width={24} height={24} />
              <Text variant="sm_caption_regular" color="error">
                인증번호 발송 실패. 다시 시도해주세요.
              </Text>
            </Flex>
          )}
          {isVerifySent && (
            <Text variant="sm_caption_regular" color="success">
              인증번호가 발송되었습니다.
            </Text>
          )}

          {isVerifySent && (
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
                    errorMessage={
                      isConfirmError
                        ? '인증번호 불일치. 다시 입력해주세요.'
                        : errors.authCode?.message
                    }
                    success={isPhoneConfirmed}
                    successMessage="인증이 완료되었습니다."
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
                onClick={() =>
                  confirmVerify({
                    phoneNumber: phone.replace(/-/g, ''),
                    code: authCode,
                  })
                }
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
            disabled={
              !isValid ||
              emailCheckData?.isDuplicated !== false ||
              !isPhoneConfirmed
            }
          >
            완료
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}
