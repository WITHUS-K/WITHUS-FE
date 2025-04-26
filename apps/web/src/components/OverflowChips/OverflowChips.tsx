'use client';

import React from 'react';
import { Flex, FlexProps } from '@repo/ui/Flex';
import { Chip } from '@repo/ui/Chips';
import { Callout } from '@repo/ui/Callout';
import { Text } from '@repo/ui/Text';

export interface OverflowChipsProps<T> extends FlexProps {
  items: T[];
  renderLabel: (item: T) => string;
  maxVisible: number;
}

export function OverflowChips<T>({
  items,
  renderLabel,
  maxVisible,
  ...flexProps
}: OverflowChipsProps<T>) {
  const visible = items.slice(0, maxVisible);
  const overflow = items.slice(maxVisible);

  return (
    <Flex align="center" gap="0.8rem" {...flexProps}>
      {visible.map((item, i) => (
        <Chip key={i} color="grayscale70" bg="grayscale5">
          {renderLabel(item)}
        </Chip>
      ))}
      {overflow.length > 0 && (
        <Callout
          trigger={
            <Text variant="xs_caption_medium" color="grayscale70">
              +{overflow.length}
            </Text>
          }
          texts={overflow.map(renderLabel)}
          position="bottom"
          offsetX="0.2rem"
        />
      )}
    </Flex>
  );
}
