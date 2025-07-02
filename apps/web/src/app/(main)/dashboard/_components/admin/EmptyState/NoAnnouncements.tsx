import React from 'react';
import * as styles from './EmptyState.css';
import { IcHomeAnnouncement } from '@repo/ui/icons/colored';
import { Text } from '@repo/ui/Text';
import { Flex } from '@repo/ui/Flex';
import clsx from 'clsx';

export const NoAnnouncements = () => (
  <div className={clsx(styles.container, styles.announcementContainer)}>
    <div className={styles.title}>현재 진행 중인 공고</div>
    <div className={styles.detailWrapper}>
      <Flex direction="column" gap="1.2rem" align="center">
        <IcHomeAnnouncement width={32} height={40} />
        <Text variant="md2_text_medium" color="grayscale70">
          현재 진행 중인 공고가 없어요.
        </Text>
      </Flex>
    </div>
  </div>
);
