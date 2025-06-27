'use client';

import LabeledField from '../LabeledField/LabeledField';
import { Text } from '@repo/ui/Text';
import { Flex } from '@repo/ui/Flex';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { ProfileFormValues } from '../../ProfilePage';

export default function PasswordSection() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  const [cur, p1, p2] = useWatch({
    control,
    name: ['currentPassword', 'newPassword1', 'newPassword2'],
  });

  return (
    <Flex direction="column" width="100%" gap="2rem" align="flexStart">
      <Text variant="lg_subtitle_semibold" color="grayscale90">
        비밀번호 변경
      </Text>

      <Flex direction="column" width="100%" gap="3.2rem">
        <Controller
          name="currentPassword"
          control={control}
          defaultValue=""
          rules={{
            validate: (v) =>
              !p1 && !p2 ? true : !!v || '현재 비밀번호를 입력해주세요',
          }}
          render={({ field }) => (
            <LabeledField
              label="현재 비밀번호"
              inputProps={{
                ...field,
                type: 'password',
                placeholder: '현재 비밀번호를 입력해주세요',
              }}
              errorMessage={errors.currentPassword?.message}
            />
          )}
        />

        <Controller
          name="newPassword1"
          control={control}
          defaultValue=""
          rules={{}}
          render={({ field }) => (
            <LabeledField
              label="새 비밀번호"
              inputProps={{
                ...field,
                type: 'password',
                placeholder: '새 비밀번호를 입력해주세요',
              }}
              errorMessage={errors.newPassword1?.message}
            />
          )}
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
