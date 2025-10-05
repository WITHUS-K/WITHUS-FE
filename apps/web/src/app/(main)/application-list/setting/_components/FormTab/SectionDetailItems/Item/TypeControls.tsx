'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { CommonDropdown } from '@repo/ui/CommonDropdown';
import * as C from '@web/constants/application';

const TYPE_CONTROL = {
  text: {
    titles: ['분량 설정', ''],
    dropdowns: [
      {
        nameSuffix: 'info',
        options: C.BLANK_OPTIONS,
        ariaLabel: '분량 유형 선택',
      },
      {
        nameSuffix: 'infoDetail',
        options: C.CHAR_LIMITS,
        ariaLabel: '문자 제한 선택',
      },
    ],
  },
  file: {
    titles: ['최대 파일 수', '최대 파일 용량'],
    dropdowns: [
      {
        nameSuffix: 'info',
        options: C.FILE_COUNTS,
        ariaLabel: '파일 개수 선택',
      },
      {
        nameSuffix: 'infoDetail',
        options: C.FILE_SIZES,
        ariaLabel: '파일 용량 선택',
      },
    ],
  },
} as const;

type TypeKey = keyof typeof TYPE_CONTROL;

interface Props {
  index: number;
  type: TypeKey;
}

export default function TypeControls({ index, type }: Props) {
  const { control } = useFormContext();
  const { titles, dropdowns } = TYPE_CONTROL[type];

  return (
    <Flex direction="column" gap="1.2rem">
      <Flex align="center" gap="7.5rem">
        {titles.map((title, idx) =>
          title ? (
            <Text key={idx} variant="md1_text_semibold" color="grayscale50">
              {title}
            </Text>
          ) : null
        )}
      </Flex>
      <Flex gap="0.8rem" wrap="wrap">
        {dropdowns.map(({ nameSuffix, options, ariaLabel }) => (
          <Controller
            key={nameSuffix}
            name={`detailItems.${index}.typeInfo.${nameSuffix}` as const}
            control={control}
            defaultValue={options[0]}
            render={({ field }) => (
              <CommonDropdown
                listWidth="16rem"
                aria-label={ariaLabel}
                options={options}
                value={field.value}
                onSelect={field.onChange}
              />
            )}
          />
        ))}
      </Flex>
    </Flex>
  );
}
