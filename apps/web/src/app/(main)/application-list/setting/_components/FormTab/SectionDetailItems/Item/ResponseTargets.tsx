'use client';

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Flex } from '@repo/ui/Flex';
import { Option } from '@repo/ui/Option';
import { Text } from '@repo/ui/Text';
interface Props {
  index: number;
}

export default function ResponseTargets({ index }: Props) {
  const { control, watch } = useFormContext();
  const enabled = watch('applicationParts.isSelected');
  //const selectedPart = watch('application');
  const custom = watch('applicationParts.parts') || [];
  const targets = enabled ? ['공통', ...custom] : ['공통'];

  return (
    <Flex direction="column" gap="1.2rem">
      <Text variant="md1_text_semibold" color="grayscale50">
        응답 대상
      </Text>
      <Flex wrap="wrap" gap="0.8rem" width="60.2rem">
        {targets.map((label, idx) => (
          <Controller
            key={`${label}-${idx}`}
            name={`detailItems.${index}.responseTarget` as const}
            control={control}
            //defaultValue={0}
            render={({ field }) => {
              // field.value 가 number 인지, string 인지 감안해서 실제 선택된 인덱스를 계산
              const raw = field.value;
              const selectedIndex =
                typeof raw === 'number'
                  ? raw
                  : // 문자열이라면 targets 배열에서 위치를 찾아줌
                    targets.indexOf(raw as string);

              return (
                <Option
                  type="radio"
                  label={label}
                  isSelected={selectedIndex === idx}
                  onChange={() => field.onChange(idx)}
                  width="12rem"
                  height="4.4rem"
                />
              );
            }}
          />
        ))}
      </Flex>
    </Flex>
  );
}
