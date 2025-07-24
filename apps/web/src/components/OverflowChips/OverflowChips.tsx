// src/components/OverflowChips/OverflowChips.tsx
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
  const totalCount = items.length;
  const visibleCount = Math.min(totalCount, maxVisible);
  const visibleItems = items.slice(0, visibleCount);

  // 총 개수 > maxVisible인 경우에만 overflowItems 생성
  const overflowItems = totalCount > maxVisible ? items.slice(maxVisible) : [];
  const overflowCount = overflowItems.length;

  return (
    <Flex align="center" gap="0.8rem" {...flexProps}>
      {visibleItems.map((item, i) => (
        <Chip key={i} color="grayscale70" bg="grayscale5">
          {renderLabel(item)}
        </Chip>
      ))}

      {overflowCount > 0 && (
        <Callout
          trigger={
            <Text variant="xs_caption_medium" color="grayscale70">
              +{overflowCount}
            </Text>
          }
          texts={overflowItems.map(renderLabel)}
          position="bottom"
          offsetX="0.2rem"
        />
      )}
    </Flex>
  );
}
