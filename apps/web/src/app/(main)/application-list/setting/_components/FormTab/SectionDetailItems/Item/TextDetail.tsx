'use client';

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { BaseInput } from '@repo/ui/BaseInput';

interface Props {
  index: number;
}

export default function TextDetail({ index }: Props) {
  const { control, register } = useFormContext();
  return (
    <div style={{ width: '100%' }}>
      <Controller
        name={`detailItems.${index}.description` as const}
        control={control}
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
    </div>
  );
}
