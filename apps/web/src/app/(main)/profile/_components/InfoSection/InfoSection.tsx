'use client';

import { Flex } from '@repo/ui/Flex';
import LabeledField from '../LabeledField/LabeledField';
import { MyPageData } from '@web/store/query/useGetMyPageQuery';
import { useFormContext } from 'react-hook-form';
import { ProfileFormValues } from '../../ProfilePage';

interface InfoSectionProps {
  role: 'ADMIN' | 'USER';
  user: MyPageData;
}

export default function InfoSection({ role, user }: InfoSectionProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <Flex width="100%" direction="column" gap="3.2rem">
      <LabeledField
        label="이름"
        inputProps={{
          ...register('name', { required: '이름을 입력해주세요' }),
          defaultValue: user.name,
          placeholder: '이름을 입력해주세요',
          width: '100%',
        }}
        errorMessage={errors.name?.message}
      />

      {role === 'USER' && (
        <LabeledField
          label="가입 동아리"
          readOnly={true}
          inputProps={{
            defaultValue: user.organizations.map((o) => o.name).join(', '),
            type: 'text',
            width: '100%',
          }}
        />
      )}

      <LabeledField
        label="전화번호"
        inputProps={{
          ...register('phoneNumber', { required: '전화번호를 입력해주세요' }),
          defaultValue: user.phoneNumber,
          placeholder: '전화번호를 입력해주세요',
          width: '100%',
        }}
        errorMessage={errors.phoneNumber?.message}
      />
    </Flex>
  );
}
