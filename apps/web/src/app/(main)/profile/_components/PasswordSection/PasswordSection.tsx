'use client';

import LabeledField from '../LabeledField/LabeledField';
import { Text } from '@repo/ui/Text';
import { Flex } from '@repo/ui/Flex';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { ProfileFormValues } from '../../ProfilePage';
import { useEffect } from 'react';

export default function PasswordSection() {
  const {
    control,
    register,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  const [cur, p1, p2] = watch([
    'currentPassword',
    'newPassword1',
    'newPassword2',
  ]);

  // 하나만 입력된 상태라면, 나머지 필드도 “필수”로 재검증
  useEffect(() => {
    if (cur || p1 || p2) {
      trigger(['currentPassword', 'newPassword1', 'newPassword2']);
    }
  }, [cur, p1, p2, trigger]);

  return (
    <Flex direction="column" width="100%" gap="2rem" align="flexStart">
      <Text variant="lg_subtitle_semibold" color="grayscale90">
        비밀번호 변경
      </Text>

      <Flex direction="column" width="100%" gap="3.2rem">
        <LabeledField
          label="현재 비밀번호"
          inputProps={{
            ...register('currentPassword'),
            type: 'password',
            placeholder: '현재 비밀번호를 입력해주세요',
          }}
          errorMessage={errors.currentPassword?.message}
        />

        <LabeledField
          label="새 비밀번호"
          inputProps={{
            ...register('newPassword1'),
            type: 'password',
            placeholder: '새 비밀번호를 입력해주세요',
          }}
        />

        <Controller
          name="newPassword2"
          control={control}
          rules={{
            validate: (v) =>
              !cur && !p1 ? true : v === p1 || '비밀번호가 일치하지 않습니다',
          }}
          render={({ field }) => (
            <LabeledField
              label="새 비밀번호 확인"
              inputProps={{
                ...field,
                type: 'password',
                placeholder: '새 비밀번호를 다시 입력해주세요',
              }}
              errorMessage={errors.newPassword2?.message}
            />
          )}
        />
      </Flex>
    </Flex>
  );
}
