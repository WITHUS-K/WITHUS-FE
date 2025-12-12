'use client';

import React from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';

interface Props {
  count: number;
}

export default function InviteHeader({ count }: Props) {
  return (
    <Flex align="flexEnd" gap="0.8rem" width='100%'>
      <Text variant="md1_text_bold" color="grayscale90">
        받는 사람 추가
      </Text>
      <Text variant="xs_caption_semibold" color="grayscale40">
        {count}명
      </Text>
    </Flex>
  );
}