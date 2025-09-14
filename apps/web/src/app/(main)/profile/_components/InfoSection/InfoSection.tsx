'use client';

import { Flex } from '@repo/ui/Flex';
import LabeledField from '../LabeledField/LabeledField';
import { MyPageData } from '@web/store/query/useGetMyPageQuery';
import { Controller, useFormContext } from 'react-hook-form';
import { ProfileFormValues } from '../../ProfilePage';
import OrgField from '../OrgField/OrgField';

interface InfoSectionProps {
  role: 'ADMIN' | 'USER';
  user: MyPageData;
}

export default function InfoSection({ role, user }: InfoSectionProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <Flex width="100%" direction="column" gap="3.2rem">
      <Controller
        name="name"
        control={control}
        defaultValue={user.name}
        rules={{ required: '이름을 입력해주세요' }}
        render={({ field }) => (
          <LabeledField
            label="이름"
            inputProps={{
              ...field,
              placeholder: '이름을 입력해주세요',
              width: '100%',
            }}
            errorMessage={errors.name?.message}
          />
        )}
      />

      {role === 'USER' && (
        <OrgField
          label="가입 동아리"
          orgs={user.organizations.map((o) => ({ id: o.id, name: o.name }))}
          // 가입 동아리 삭제 api
          onDelete={(id) => {}}
        />
      )}

      <Controller
        name="phoneNumber"
        control={control}
        defaultValue={user.phoneNumber}
        rules={{ required: '전화번호를 입력해주세요' }}
        render={({ field }) => (
          <LabeledField
            label="전화번호"
            inputProps={{
              ...field,
              placeholder: '전화번호를 입력해주세요',
              width: '100%',
            }}
            errorMessage={errors.phoneNumber?.message}
          />
        )}
      />
    </Flex>
  );
}
