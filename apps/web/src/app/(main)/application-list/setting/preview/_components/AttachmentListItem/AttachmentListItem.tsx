'use client';
import React from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { IcDeleteCircle } from '@repo/ui/icons/colored';
import * as styles from './AttachmentListItem.css';

export interface AttachmentListItemProps {
  name: string;
  size: string;
  extension: string;
  onRemove: () => void;
}

export function AttachmentListItem({
  name,
  size,
  extension,
  onRemove,
}: AttachmentListItemProps) {
  return (
    <div className={styles.wrapper}>
      <Flex align="center" gap="1.5rem">
        <div className={styles.icon}>{extension.toUpperCase()}</div>
        <Flex direction="column" align="flexStart">
          <Text variant="md2_text_semibold" color="grayscale90">
            {name}
          </Text>
          <Text variant="sm_caption_medium" color="grayscale50">
            {size}
          </Text>
        </Flex>
      </Flex>

      <button onClick={onRemove} aria-label="파일 삭제">
        <IcDeleteCircle width={24} height={24} />
      </button>
    </div>
  );
}
