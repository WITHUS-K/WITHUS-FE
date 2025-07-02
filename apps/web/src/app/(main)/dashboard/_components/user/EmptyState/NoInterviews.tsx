import React from 'react';
import * as styles from './EmptyState.css';
import { IcHomeInterview } from '@repo/ui/icons/colored';
import { Text } from '@repo/ui/Text';
import { Flex } from '@repo/ui/Flex';
import clsx from 'clsx';
import { Button } from '@repo/ui/Button';
import { IcArrowRight } from '@repo/ui/icons/mono';

export const NoInterview = () => (
  <div className={clsx(styles.container, styles.docsContainer)}>
    <div className={styles.header}>
      <Text variant="md1_text_semibold" color="grayscale90">
        면접 평가
      </Text>
      <Button
        variant="sub"
        size="32"
        width="15.2rem"
        onClick={() => {}}
        disabled
        rightIcon={<IcArrowRight width={16} height={16} />}
      >
        면접 평가 바로가기
      </Button>
    </div>
    <div className={styles.detailWrapper}>
      <Flex direction="column" gap="1.2rem" align="center" marginTop="9.4rem">
        <IcHomeInterview width={40} height={40} />
        <Text variant="md2_text_medium" color="grayscale70">
          현재 진행하고 있는 면접 평가가 없어요.
        </Text>
      </Flex>
    </div>
  </div>
);
