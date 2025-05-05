'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { CommonDropdown } from '@repo/ui/CommonDropdown';
import * as C from '@web/constants/application';

interface Props {
  index: number;
  type: 'text' | 'file';
}

export default function TypeControls({ index, type }: Props) {
  const { control } = useFormContext();

  if (type === 'text') {
    return (
      <Flex direction="column" gap="1.2rem">
        <Text variant="md1_text_semibold" color="grayscale50">
          분량 설정
        </Text>
        <Flex gap="0.8rem" wrap="wrap">
          <Controller
            name={`detailItems.${index}.typeInfo.info` as const}
            control={control}
            defaultValue={C.BLANK_OPTIONS[0]}
            render={({ field }) => (
              <CommonDropdown
                options={C.BLANK_OPTIONS}
                value={field.value}
                onSelect={field.onChange}
              />
            )}
          />
          <Controller
            name={`detailItems.${index}.typeInfo.infoDetail` as const}
            control={control}
            defaultValue={C.CHAR_LIMITS[2]}
            render={({ field }) => (
              <CommonDropdown
                options={C.CHAR_LIMITS}
                value={field.value}
                onSelect={field.onChange}
              />
            )}
          />
        </Flex>
      </Flex>
    );
  }

  // type === 'file'
  return (
    <Flex direction="column" gap="1.2rem">
      <Flex align="center" gap="7.5rem">
        <Text variant="md1_text_semibold" color="grayscale50">
          최대 파일 수
        </Text>
        <Text variant="md1_text_semibold" color="grayscale50">
          최대 파일 용량
        </Text>
      </Flex>
      <Flex gap="0.8rem" wrap="wrap">
        <Controller
          name={`detailItems.${index}.typeInfo.info` as const}
          control={control}
          defaultValue={C.FILE_COUNTS[0]}
          render={({ field }) => (
            <CommonDropdown
              options={C.FILE_COUNTS}
              value={field.value}
              onSelect={field.onChange}
            />
          )}
        />
        <Controller
          name={`detailItems.${index}.typeInfo.infoDetail` as const}
          control={control}
          defaultValue={C.FILE_SIZES[2]}
          render={({ field }) => (
            <CommonDropdown
              options={C.FILE_SIZES}
              value={field.value}
              onSelect={field.onChange}
            />
          )}
        />
      </Flex>
    </Flex>
  );
}
