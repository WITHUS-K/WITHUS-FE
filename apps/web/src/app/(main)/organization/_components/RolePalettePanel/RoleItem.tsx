'use client';
import React from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import type { PaletteColor } from '@repo/utils';
import * as styles from './RolePalettePanel.css';
import { IcDelete } from '@repo/ui/icons/mono';

interface RoleItemProps {
  label: string;
  color: PaletteColor;
  search: string;
  isSelected: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
  count?: number;
  onDelete?: () => void;
}

export function RoleItem({
  label,
  color,
  search,
  isSelected,
  onClick,
  onDoubleClick,
  count,
  onDelete,
}: RoleItemProps) {
  const parts = search ? label.split(new RegExp(`(${search})`, 'gi')) : [label];

  return (
    <Flex
      align="center"
      justify="spaceBetween"
      className={
        isSelected ? `${styles.item} ${styles.selectedItem}` : styles.item
      }
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <Flex align="center" gap="0.8rem">
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

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.();
        }}
        className={`${styles.deleteBtn} ${isSelected ? styles.alwaysShow : styles.showOnHover}`}
        aria-label="역할 삭제"
      >
        <IcDelete width={24} height={24} />
      </button>
    </Flex>
  );
}
