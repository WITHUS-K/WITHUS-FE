'use client';

import React from 'react';
import { useFormContext, Controller, FieldPath } from 'react-hook-form';
import { Text } from '@repo/ui/Text';
import { BaseInput } from '@repo/ui/BaseInput';
import BorderlessInput from '../../FormTab/SectionDetailItems/Item/BorderlessInput';

import type { FormValues } from '@web/types/application';
import * as styles from '../CriteriaTab.css';
import { Flex } from '@repo/ui/Flex';

interface Props {
  sectionIndex: number;
  itemIndex: number;
  prefix: 'paperEvaluateItems' | 'interviewEvaluateItems';
  onRemove?: () => void;
}

export default function EvaluationItemCard({
  sectionIndex,
  itemIndex,
  prefix,
  onRemove,
}: Props) {
  const { control } = useFormContext<FormValues>();

  // 변경된 필드 경로
  const evalName =
    `${prefix}.${sectionIndex}.items.${itemIndex}.evaluate` as FieldPath<FormValues>;
  const detailName =
    `${prefix}.${sectionIndex}.items.${itemIndex}.evaluateDetail` as FieldPath<FormValues>;

  return (
    <div className={styles.itemCard}>
      <Flex width="100%" align="center" justify="spaceBetween">
        <Text variant="md1_text_semibold" color="grayscale70">
          평가 항목-{itemIndex + 1} <span style={{ color: 'red' }}>*</span>
        </Text>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            style={{ background: 'none', border: 'none' }}
          >
            <Text variant="md1_text_semibold" color="grayscale70">
              삭제
            </Text>
          </button>
        )}
      </Flex>

      <div className={styles.itemDetailCard}>
        <Controller
          name={evalName}
          control={control}
          rules={{ required: true }}
          render={({ field }) => {
            const value = typeof field.value === 'string' ? field.value : '';
            return (
              <BaseInput
                size="auth"
                showClear={!!value}
                onClear={() => field.onChange('')}
                inputProps={{
                  ...field,
                  value,
                  placeholder: '평가 내용을 입력해주세요.',
                }}
              />
            );
          }}
        />

        <Controller
          name={detailName}
          control={control}
          defaultValue=""
          render={({ field }) => {
            const value = typeof field.value === 'string' ? field.value : '';
            return (
              <BorderlessInput
                {...field}
                value={value}
                placeholder="(선택) 상세 설명을 작성해주세요."
              />
            );
          }}
        />
      </div>
    </div>
  );
}
