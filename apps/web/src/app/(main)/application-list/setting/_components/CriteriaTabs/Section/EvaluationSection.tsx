'use client';

import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { IcBtnPlusCircle } from '@repo/ui/icons/colored';
import type { FormValues } from '@web/types/application';
import * as styles from '../CriteriaTab.css';
import StandardSection from './StandardSection';
import EvaluationItemCard from './EvaluationItemCard';
import { useEffect } from 'react';

interface EvaluationSectionProps {
  //standardName: 'paperEvaluateStandard' | 'interviewEvaluateStandard';
  itemsName: 'paperEvaluateItems' | 'interviewEvaluateItems';
  organizationRoleId: number;
  sectionIndex: number;
}

export default function EvaluationSection({
  itemsName,
  organizationRoleId,
  sectionIndex,
}: EvaluationSectionProps) {
  const { control } = useFormContext<FormValues>();

  // 해당 섹션의 items 배열만 관리
  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray<FormValues, `${typeof itemsName}.${number}.items`>({
    name: `${itemsName}.${sectionIndex}.items` as const,
    control,
  });

  return (
    <div className={styles.container}>
      <Flex direction="column" gap="2.4rem" width="100%" align="center">
        {/* positionName 숨겨주기 */}
        <Controller
  name={`${itemsName}.${sectionIndex}.organizationRoleId` as const}
  control={control}
  defaultValue={organizationRoleId}
  render={({ field }) => (
    <input type="hidden" {...field} value={organizationRoleId} />
  )}
/>


        {/* 실제 평가 항목 카드 (itemFields) */}
        {itemFields.map((item, idx) => (
          <div key={item.id} style={{ width: '100%' }}>
            <EvaluationItemCard
              sectionIndex={sectionIndex}
              itemIndex={idx}
              prefix={itemsName}
              onRemove={() => removeItem(idx)}
            />
          </div>
        ))}

        {/* 항목(item) 추가 버튼 하나만 */}
        <button
          type="button"
          className={styles.addButton}
          onClick={() => appendItem({ evaluate: '', evaluateDetail: '' })}
        >
          <IcBtnPlusCircle width={24} height={24} />
          <Text variant="md2_text_semibold" color="grayscale40">
            항목 추가
          </Text>
        </button>
      </Flex>
    </div>
  );
}
