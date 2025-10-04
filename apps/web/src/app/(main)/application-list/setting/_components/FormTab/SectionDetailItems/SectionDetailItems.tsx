'use client';

import React, { useEffect } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import * as C from '@web/constants/application';
import * as styles from './SectionDetailItems.css';
import DetailItemCard from './Item/DetailItemCard';
import { IcBtnPlusCircle } from '@repo/ui/icons/colored';
import { required } from '@web/app/[organization]/[slug]/_components/FormNavigator/FormNavigator.css';
export default function SectionDetailItems() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: 'detailItems',
    control,
  });

  return (
    <Flex direction="column" width="100%" align="flexStart" gap="1.6rem">
      <Text variant="md1_text_semibold" color="grayscale70">
        상세 내용 <span style={{ color: 'red' }}>*</span>
      </Text>

      <Flex direction="column" gap="1.6rem" align="center" width="100%">
        {fields.map((f, idx) => (
          <DetailItemCard key={f.id} index={idx} onRemove={() => remove(idx)} />
        ))}

        <button
          type="button"
          className={styles.addButton}
          onClick={() =>
            append({
              required: false,
              type: 'text',
              description: '',
              addDescription: '',
              responseTarget: 0,
              typeInfo: {
                info: C.BLANK_OPTIONS[0],
                infoDetail: C.CHAR_LIMITS[2],
              },
            })
          }
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
