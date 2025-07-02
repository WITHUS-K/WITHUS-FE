import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { Option } from '@repo/ui/Option';
import React from 'react';

interface Props {
  parts: string[];
  selectedIndex: number;
  onChange: (idx: number) => void;
}

export function ApplicationPartsPreview({ parts, selectedIndex, onChange }: Props) {


  return (
    <Flex gap="2.4rem" direction="column">
      <Flex gap="0.4rem" direction="column">
        <Flex gap="0.4rem" align="center">
          <Text variant="md1_text_semibold" color="grayscale70">
            지원 파트
          </Text>
          <Text variant="md2_text_semibold" color="error">
            *
          </Text>
        </Flex>
        <Text variant="sm_caption_medium" color="grayscale40">
          다른 파트에 지원할 경우, 지원서를 각각 제출해주세요.
        </Text>
      </Flex>
      <Flex gap="1rem">
      {parts.map((label, idx) => (
          <Option
            key={label}
            type="radio"
            label={label}
            isSelected={selectedIndex === idx}
            onChange={() => onChange(idx)}
            width="19.6rem"
          />
        ))}
      </Flex>
    </Flex>
  );
}
