'use client';

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { BaseInput } from '@repo/ui/BaseInput';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import type { FormValues } from '@web/types/application';

export default function SectionTitle() {
  const { control } = useFormContext<FormValues>();

  return (
    <Flex direction="column" align="flexStart" width="100%" gap="1.6rem">
      <Text variant="md1_text_semibold" color="grayscale70">
        공고명 <span style={{ color: 'red' }}>*</span>
      </Text>
      <Controller
        name="title"
        control={control}
        defaultValue=""
        rules={{ required: '필수 입력입니다.' }}
        render={({ field, fieldState }) => (
          <BaseInput
            inputProps={{
              ...field,
              placeholder: '공고명을 입력해주세요.',
            }}
            hasError={!!fieldState.error}
          />
        )}
      />
    </Flex>
  );
}
