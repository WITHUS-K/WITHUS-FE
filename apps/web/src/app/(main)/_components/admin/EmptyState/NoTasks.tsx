import React from 'react';
import * as styles from './EmptyState.css';
import { IcHomeDocs } from '@repo/ui/icons/colored';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import clsx from 'clsx';

export const NoTasks = () => (
  <div className={clsx(styles.container, styles.taskContainer)}>
    <div className={styles.title}>전체 업무 진행 상황</div>
    <div className={styles.detailWrapper}>
      <Flex direction="column" gap="1.2rem" align="center">
        <IcHomeDocs width={40} height={40} />
        <Text variant="md2_text_medium" color="grayscale70">
          현재 진행하고 있는 업무가 없어요.
        </Text>
      </Flex>
    </div>
  </div>
);
