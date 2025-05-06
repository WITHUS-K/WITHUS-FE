'use client';

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Text } from '@repo/ui/Text';
import { BaseInput } from '@repo/ui/BaseInput';

import type { FormValues } from '@web/types/application';
import * as styles from '../CriteriaTab.css';
import BorderlessInput from '../../FormTab/SectionDetailItems/Item/BorderlessInput';

interface Props {
  index: number;
  prefix: 'paperEvaluateItems' | 'interviewEvaluateItems';
  onRemove?: () => void;
}

export default function EvaluationItemCard({ index, prefix, onRemove }: Props) {
  const { control, register } = useFormContext<FormValues>();

  return (
    <div className={styles.itemCard}>
      <Text variant="md1_text_semibold" color="grayscale70">
        평가 항목-{index + 1} <span style={{ color: 'red' }}>*</span>
      </Text>

      <div className={styles.itemDetailCard}>
        <Controller
          name={`${prefix}.${index}.evaluate` as const}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <BaseInput
              size="auth"
              showClear={!!field.value}
              onClear={() => field.onChange('')}
              inputProps={{
                ...field,
                placeholder: '평가 내용을 입력해주세요.',
              }}
            />
          )}
        />

        <BorderlessInput
          {...register(`${prefix}.${index}.evaluateDetail` as const)}
          placeholder="상세 설명을 작성해주세요."
        />
      </div>
    </div>
  );
}
