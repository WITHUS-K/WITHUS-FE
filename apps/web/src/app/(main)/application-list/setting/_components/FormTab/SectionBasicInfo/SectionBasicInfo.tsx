'use client';

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Option } from '@repo/ui/Option';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';

const LABELS = [
  { key: 'profile', label: '사진' },
  { key: 'birthDate', label: '생년월일' },
  { key: 'gender', label: '성별' },
  { key: 'address', label: '주소' },
  { key: 'school', label: '학교' },
  { key: 'major', label: '전공' },
  { key: 'academicStatus', label: '학적 상태' },
] as const;

const REQUIRED = ['이름 (필수)', '전화번호 (필수)', '이메일 (필수)'] as const;

export default function SectionBasicInfo() {
  const { control } = useFormContext();

  return (
    <Flex direction="column" align="flexStart" width="100%" gap="0.4rem">
      <Text variant="md1_text_semibold" color="grayscale70">
        기본 정보 <span style={{ color: 'red' }}>*</span>
      </Text>
      <Text variant="sm_caption_medium" color="grayscale40">
        아래 3가지 항목은 필수 항목입니다. 지원자들에게 추가로 제출받을 항목을
        선택해주세요.
      </Text>

      <Flex wrap="wrap" gap="2.3rem" marginTop="1.2rem">
        {REQUIRED.map((label) => (
          <Option key={label} type="highlight" label={label} width="21.2rem" />
        ))}

        {LABELS.map(({ key, label }) => (
          <Controller
            key={key}
            name={`basicInfo.${key}` as const}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Option
                type="checkbox"
                label={label}
                isChecked={value}
                onChange={() => onChange(!value)}
                width="21.2rem"
              />
            )}
          />
        ))}
      </Flex>
    </Flex>
  );
}
