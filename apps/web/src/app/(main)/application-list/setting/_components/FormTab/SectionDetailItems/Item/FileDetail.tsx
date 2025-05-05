'use client';

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { BaseInput } from '@repo/ui/BaseInput';
import { Flex } from '@repo/ui/Flex';
import BorderlessInput from './BorderlessInput';

interface Props {
  index: number;
}

export default function FileDetail({ index }: Props) {
  const { control, register } = useFormContext();

  return (
    <Flex direction="column" gap="1.6rem" width="100%">
      {/* 제목 입력: Controller + BaseInput */}
      <Controller
        name={`detailItems.${index}.description` as const}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <BaseInput
            size="auth"
            showClear={!!field.value}
            onClear={() => field.onChange('')}
            inputProps={{
              ...field,
              placeholder: '제목을 입력해주세요.',
            }}
          />
        )}
      />

      {/* 추가 설명: borderless */}
      <BorderlessInput
        {...register(`detailItems.${index}.addDescription` as const)}
        placeholder="추가적인 설명을 작성해주세요."
      />
    </Flex>
  );
}
