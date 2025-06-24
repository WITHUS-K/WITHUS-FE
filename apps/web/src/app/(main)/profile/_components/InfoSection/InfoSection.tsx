'use client';

import { Flex } from '@repo/ui/Flex';
import LabeledField from '../LabeledField/LabeledField';

interface InfoSectionProps {
  role: 'ADMIN' | 'USER';
  isEditing: boolean;
}

export default function InfoSection({ role, isEditing }: InfoSectionProps) {
  return (
    <Flex width="100%" direction="column" gap="3.2rem">
      <LabeledField
        label="이름"
        inputProps={{
          defaultValue: '나나냥',
          placeholder: '이름을 입력해주세요',
          width: '100%',
        }}
      />

      {role === 'USER' && (
        <LabeledField
          label="가입 동아리"
          readOnly={true}
          inputProps={{
            defaultValue: 'WITHUS',
            type: 'text',
            width: '100%',
          }}
        />
      )}

      <LabeledField
        label="전화번호"
        inputProps={{
          defaultValue: '010-0000-0000',
          placeholder: '전화번호를 입력해주세요',
          width: '100%',
        }}
      />
    </Flex>
  );
}
