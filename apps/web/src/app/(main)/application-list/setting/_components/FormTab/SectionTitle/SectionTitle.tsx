'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { BaseInput } from '@repo/ui/BaseInput';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';

export default function SectionTitle() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Flex direction="column" align="flexStart" width="100%" gap="1.6rem">
      <Text variant="md1_text_semibold" color="grayscale70">
        공고명 <span style={{ color: 'red' }}>*</span>
      </Text>
      <BaseInput
        inputProps={{
          placeholder: '공고명을 입력해주세요.',
          ...register('title', { required: '필수 입력입니다.' }),
        }}
        hasError={!!errors.title}
      />
    </Flex>
  );
}
