'use client';

import React from 'react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { BaseInput } from '@repo/ui/BaseInput';
import type { FormValues } from '@web/types/application';
import BorderlessInput from './BorderlessInput';

interface Props {
  index: number;
}

export default function TextDetail({ index }: Props) {
  const { control } = useFormContext<FormValues>();

  const addDescription = useWatch({
    control,
    name: `detailItems.${index}.addDescription`,
    defaultValue: '',
  });

  return (
    <>
      <Controller
        name={`detailItems.${index}.description`}
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <BaseInput
            inputProps={{
              ...field,
              placeholder: '제목을 입력해주세요.',
            }}
            showClear={!!field.value}
            onClear={() => field.onChange('')}
            size="auth"
          />
        )}
      />
      <Controller
        name={`detailItems.${index}.addDescription`}
        control={control}
        defaultValue={addDescription}
        render={({ field }) => (
          <BorderlessInput
            {...field}
            placeholder="(선택) 상세 설명을 입력해주세요."
          />
        )}
      />
    </>
  );
}
