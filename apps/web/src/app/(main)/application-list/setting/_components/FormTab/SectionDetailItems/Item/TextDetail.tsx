'use client';

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { BaseInput } from '@repo/ui/BaseInput';
import type { FormValues } from '@web/types/application';

interface Props {
  index: number;
}

export default function TextDetail({ index }: Props) {
  const { control } = useFormContext<FormValues>();

  return (
    <Controller
      name={`detailItems.${index}.description`}
      control={control}
      defaultValue=""
      rules={{ required: true }}
      render={({ field }) => (
        <BaseInput
          inputProps={{
            ...field,
            placeholder: '내용을 입력해주세요.',
          }}
          showClear={!!field.value}
          onClear={() => field.onChange('')}
          size="auth"
        />
      )}
    />
  );
}
