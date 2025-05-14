'use client';
import React from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import type { PaletteColor } from '@repo/utils';
import * as styles from './RolePalettePanel.css';

interface RoleItemProps {
  label: string;
  color: PaletteColor;
  search: string;
  isSelected: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
  count?: number;
}

export function RoleItem({
  label,
  color,
  search,
  isSelected,
  onClick,
  onDoubleClick,
  count,
}: RoleItemProps) {
  const parts = search ? label.split(new RegExp(`(${search})`, 'gi')) : [label];

  return (
    <Flex
      align="center"
      gap="0.8rem"
      className={
        isSelected ? `${styles.item} ${styles.selectedItem}` : styles.item
      }
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <div className={styles.colorBlock} style={{ backgroundColor: color }} />
      <Text
        variant="sm_caption_regular"
        color={isSelected ? 'primary50' : 'grayscale90'}
      >
        {parts.map((part, idx) =>
          search && part.toLowerCase() === search.toLowerCase() ? (
            <span key={idx} className={styles.highlight}>
              {part}
            </span>
          ) : (
            <React.Fragment key={idx}>{part}</React.Fragment>
          )
        )}
      </Text>
      <Text variant="sm_caption_regular" color="grayscale40">
        {count}
      </Text>
    </Flex>
  );
}
