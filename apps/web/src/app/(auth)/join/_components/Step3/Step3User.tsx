'use client';

import React, { useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@repo/ui/TextField';
import { SelectDropdown } from '@repo/ui/DropDown';
import { Button } from '@repo/ui/Button';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { IcInputError, IcInputSuccess } from '@repo/ui/icons/colored';

import { useEmailCheckQuery } from '@web/store/query/useEmailCheckQuery';
import { useEmailVerifyMutation } from '@web/store/mutation/useEmailVerifyMutation';
import { useEmailConfirmMutation } from '@web/store/mutation/useEmailConfirmMutation';
import { useOrganizationVerifyQuery } from '@web/store/query/useOrganizationVerifyQuery';
import { useUserJoinMutation } from '@web/store/mutation/useUserJoinMutation';
import type { UserJoinRequest } from '@web/types/auth';
import { useClub } from '../../_context/ClubContext';
import { useModal } from '@repo/ui/hooks';

interface Step3UserProps {
  onBack: () => void;
}

interface FormValues {
  name: string;
  birth: string;
  clubCode: string;
  emailLocal: string;
  emailDomain: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  authCode: string;
}

export default function Step3User({ onBack }: Step3UserProps) {
  const { club } = useClub();
  const { confirm } = useModal();
  const [clubCodeTried, setClubCodeTried] = useState(false);
  const [clubCodeLocked, setClubCodeLocked] = useState(false);
  const [clubId, setClubId] = useState<number>(0);

  const {
    control,
    handleSubmit,
    watch,
    setError,
    setValue,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      birth: '',
      clubCode: '',
      emailLocal: '',
      emailDomain: '',
      password: '',
      passwordConfirm: '',
      phone: '',
      authCode: '',
    },
  });

  const emailLocal = watch('emailLocal');
  const emailDomain = watch('emailDomain');
  const phone = watch('phone');
  const authCode = watch('authCode');
  const clubCode = watch('clubCode');
  const canCheckEmail = Boolean(emailLocal && emailDomain);

  const email = useMemo(
    () => (canCheckEmail ? `${emailLocal}@${emailDomain}` : ''),
    [canCheckEmail, emailLocal, emailDomain]
  );

  const {
    data: emailCheckData,
    isSuccess: isEmailChecked,
    refetch: refetchEmailCheck,
    isFetching: isCheckingEmail,
  } = useEmailCheckQuery(['user', 'emailCheck', email], email, {
    enabled: false,
  });

  const { mutate: sendEmailCode, isSuccess: isVerifySent } =
    useEmailVerifyMutation(false);

  const {
    mutate: confirmEmailCode,
    isSuccess: isEmailConfirmed,
    isError: isEmailConfirmError,
  } = useEmailConfirmMutation();

  const { refetch: refetchOrganizationVerify } = useOrganizationVerifyQuery(
    ['organization', 'verify', clubCode],
    clubCode ?? '',
    {
      enabled: false,
    }
  );

  const { mutate: joinUser } = useUserJoinMutation();

  const onSubmit = async (data: FormValues) => {
    const payload: UserJoinRequest = {
      name: data.name,
      birthDate: data.birth.replace(/\//g, '-'),
      gender: 'NONE',
      organizationId: clubId,
      email: `${data.emailLocal}@${data.emailDomain}`,
      password: data.password,
      phoneNumber: data.phone.replace(/-/g, ''),
    };
    joinUser(payload, {
      onError: async (error) => {
        const errData = (await error.response.json()) as { code: string };
        if (errData.code === 'ORGANIZATION404') {
          setError('clubCode', {
            type: 'manual',
            message: '해당하는 조직이 존재하지 않습니다.',
          });
        } else if (errData.code === 'USER400') {
          setError('name', {
            type: 'manual',
            message: '이미 회원가입된 유저입니다.',
          });
        } else if (errData.code === 'COMMON401') {
          setError('authCode', {
            type: 'manual',
            message: '인증에 실패했습니다.',
          });
        }
      },
    });
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
          rules={{
            required: '생년월일을 입력해주세요.',
            pattern: {
              value: /^\d{4}\/\d{2}\/\d{2}$/,
              message: 'YYYY/MM/DD 형식으로 입력해주세요.',
            },
          }}
          render={({ field }) => (
            <TextField
              title="생년월일"
              size="auth"
              errorMessage={errors.birth?.message}
              inputProps={{
                placeholder: 'YYYY/MM/DD',
                type: 'text',
                maxLength: 10,
                name: field.name,
                onBlur: field.onBlur,
                value: field.value ?? '',
                onChange: (e) => {
                  let v = e.target.value.replace(/\D/g, '');
                  if (v.length > 4 && v.length <= 6) {
                    v = v.slice(0, 4) + '/' + v.slice(4);
                  } else if (v.length > 6) {
                    v =
                      v.slice(0, 4) + '/' + v.slice(4, 6) + '/' + v.slice(6, 8);
                  }
                  field.onChange(v);
                },
              }}
            />
          )}
        />

        {/* 핸드폰 번호 */}
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
                placeholder: '핸드폰 번호 -없이 입력',
                type: 'text',
                maxLength: 13,
                name: field.name,
                onBlur: field.onBlur,
                value: field.value ?? '',
                onChange: (e) => {
                  let v = e.target.value.replace(/\D/g, '');
                  if (v.length > 3 && v.length <= 7) {
                    v = v.slice(0, 3) + '-' + v.slice(3);
                  } else if (v.length > 7) {
                    v =
                      v.slice(0, 3) +
                      '-' +
                      v.slice(3, 7) +
                      '-' +
                      v.slice(7, 11);
                  }
                  field.onChange(v);
                },
              }}
              errorMessage={errors.phone?.message}
              size="auth"
            />
          )}
        />

        {/* 단체 코드 */}
        <Flex gap="1.2rem">
          <Controller
            control={control}
            name="clubCode"
            rules={{ required: '단체 코드를 입력해주세요.' }}
            render={({ field }) => (
              <TextField
                title="단체 코드"
                inputProps={{
                  ...field,
                  placeholder: clubCodeLocked
                    ? (club?.name ?? '조직명')
                    : '단체 코드 6자리',
                  type: 'text',
                  value: field.value ?? '',
                  ...(clubCodeLocked
                    ? {}
                    : {
                        maxLength: 6,
                        inputMode: 'text',
                        onChange: field.onChange,
                      }),
                }}
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
            disabled={clubCodeLocked || clubCode.length !== 6}
            style={{ marginTop: '3.4rem' }}
            onClick={async () => {
              const clubCode = watch('clubCode') || '';
              if (clubCode.length !== 6) return;

              setClubCodeTried(true);

              const { data, error } = await refetchOrganizationVerify();

              if (!data || error) {
                confirm({
                  type: 'warning',
                  description: '해당하는 조직이 존재하지 않습니다',
                  confirmText: '확인',
                  hideCancel: true,
                });
                return;
              }

              confirm({
                type: 'info',
                description: `${
                  data.name ?? club?.name ?? '위더스'
                } 조직에 추가됩니다.`,
                cancelText: '취소',
                confirmText: '확인',
                onConfirm: () => {
                  setValue('clubCode', data.name ?? club?.name ?? '위더스', {
                    shouldValidate: false,
                  });
                  setClubId(data.id);
                  setClubCodeLocked(true);
                },
              });
            }}
          >
            {clubCodeLocked
              ? '인증 완료'
              : clubCodeTried
                ? '코드 재인증'
                : '확인'}
          </Button>
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
                  inputProps={{
                    ...field,
                    placeholder: '이메일',
                    onChange: (e) => {
                      clearErrors('emailLocal');     
                      field.onChange(e);
                    },
                  }}
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
                  onSelect={(v) => {
                    clearErrors('emailLocal');
                    field.onChange(v);
                  }}
                  style={{ marginTop: '3.35rem' }}
                  hasError={!!errors.emailLocal}
                />
              )}
            />
          </Flex>

          {!isVerifySent && (
            <Button
              type="button"
              variant="sub"
              size="56"
              disabled={!canCheckEmail || isCheckingEmail}
              onClick={async () => {
                if (!canCheckEmail || !email) return;
            
                const { data } = await refetchEmailCheck();
                if (!data) return;
            
                if (data.isDuplicated) {
                  setError('emailLocal', {
                    type: 'manual',
                    message: '이미 가입된 이메일입니다.',
                  });
                  return; 
                }
            
                clearErrors('emailLocal');
                sendEmailCode({ name: watch('name'), email });
              }}
            >
              인증번호 받기
            </Button>
          )}

          {emailCheckData?.isDuplicated === false && isVerifySent && (
            <Flex gap="1.2rem">
              <Controller
                control={control}
                name="authCode"
                rules={{ required: '인증번호를 입력해주세요.' }}
                render={({ field }) => (
                  <TextField
                    inputProps={{
                      ...field,
                      placeholder: '인증코드 6자리',
                      type: 'text',
                    }}
                    errorMessage={
                      isEmailConfirmError
                        ? '인증번호가 일치하지 않습니다. 다시 입력해주세요.'
                        : errors.authCode?.message
                    }
                    success={isEmailConfirmed}
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
                disabled={!authCode || isEmailConfirmed}
                onClick={() =>
                  confirmEmailCode({
                    email,
                    code: authCode,
                  })
                }
              >
                인증번호 확인
              </Button>
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
            validate: (v: string) => {
              if (/[^A-Za-z\d!@#$%^&*()_+\-=\[\]{};':\|,\.<>\/\?]/.test(v)) {
                return '지원하지 않는 특수기호입니다.';
              }
              if (
                !/[A-Za-z]/.test(v) ||
                !/\d/.test(v) ||
                !/[!@#$%^&*()_+\-=\[\]{};':\|,\.<>\/\?]/.test(v)
              ) {
                return '영문, 숫자, 특수문자를 포함해야 합니다.';
              }
              return true;
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

        {/* 뒤로/완료 버튼 */}
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
            disabled={!isValid || emailCheckData?.isDuplicated !== false}
          >
            완료
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}
