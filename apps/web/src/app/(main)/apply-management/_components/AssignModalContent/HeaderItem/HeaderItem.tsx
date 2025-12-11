'use client';

import React, { CSSProperties } from 'react';
import { Flex } from '@repo/ui/Flex';
import { IcCallout } from '@repo/ui/icons/colored';
import { Callout } from '@repo/ui/Callout';
import { Text } from '@repo/ui/Text';

interface HeaderItemProps {
  title: string;
  tooltip: string | string[];
  style?: CSSProperties;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function HeaderItem({
  title,
  tooltip,
  style,
  isOpen,
  onOpenChange,
}: HeaderItemProps) {
  return (
    <Flex align="center" gap="0.7rem" style={style} height="2.4rem">
      <Text variant="md1_text_semibold" color="grayscale90">
        {title}
      </Text>
      <div style={{ height: '2.4rem' }}>
        <Callout
          trigger={<IcCallout width={24} height={24} />}
          texts={tooltip}
          position="top"
          offsetX={0}
          open={isOpen}
          onOpenChange={onOpenChange}
        />
      </div>
    </Flex>
  );
}
