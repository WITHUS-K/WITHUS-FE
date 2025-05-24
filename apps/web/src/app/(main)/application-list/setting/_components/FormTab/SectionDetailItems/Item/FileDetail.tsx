'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { BaseInput } from '@repo/ui/BaseInput';
import type { FormValues } from '@web/types/application';
import BorderlessInput from './BorderlessInput';

interface Props {
  index: number;
}

export default function FileDetail({ index }: Props) {
  const { control } = useFormContext<FormValues>();
  console.log('des', control._formValues.detailItems);

  return (
    <>
      <Controller
        name={`detailItems.${index}.description`}
        control={control}
        defaultValue=""
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
      <BorderlessInput
        defaultValue={
          control._formValues.detailItems?.[index]?.addDescription ?? ''
        }
        {...control.register(`detailItems.${index}.addDescription`)}
        placeholder="추가적인 설명을 작성해주세요."
      />
    </>
  );
}
