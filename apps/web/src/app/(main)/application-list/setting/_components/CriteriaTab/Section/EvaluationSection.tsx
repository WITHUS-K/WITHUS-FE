'use client';

import React, { useEffect } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { IcBtnPlusCircle } from '@repo/ui/icons/colored';
import type { FormValues } from '@web/types/application';
import * as styles from '../CriteriaTab.css';
import StandardSection from './StandardSection';
import EvaluationItemCard from './EvaluationItemCard';

interface EvaluationSectionProps {
  label: string;
  standardName: 'paperEvaluateStandard' | 'interviewEvaluateStandard';
  itemsName: 'paperEvaluateItems' | 'interviewEvaluateItems';
}

export default function EvaluationSection({
  label,
  standardName,
  itemsName,
}: EvaluationSectionProps) {
  const { control } = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray<
    FormValues,
    typeof itemsName
  >({
    control,
    name: itemsName,
  });

  // 첫 렌더링 시 필드가 비어 있으면 1개 추가
  /*useEffect(() => {
    if (fields.length === 0) {
      append({ evaluate: '', evaluateDetail: '' });
    }
  }, [append, fields.length]);*/

  return (
    <Flex width="100%" direction="column">
      <StandardSection label={label} standardName={standardName} />
      <Flex
        direction="column"
        gap="2.4rem"
        width="100%"
        marginTop="5rem"
        align="center"
      >
        {fields.map((f, idx) => (
          <EvaluationItemCard
            key={f.id}
            index={idx}
            prefix={itemsName}
            onRemove={() => remove(idx)}
          />
        ))}
        <button
          type="button"
          className={styles.addButton}
          onClick={() => append({ evaluate: '', evaluateDetail: '' })}
        >
          <IcBtnPlusCircle width={24} height={24} />
          <Text variant="md2_text_semibold" color="grayscale40">
            추가
          </Text>
        </button>
      </Flex>
    </Flex>
  );
}
