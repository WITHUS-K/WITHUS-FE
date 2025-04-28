'use client';
import React from 'react';
import { Text } from '@repo/ui/Text';
import { Flex } from '@repo/ui/Flex';
import { Divider } from '@repo/ui/Divider';
import * as styles from './ApplicantHeader.css';
import { DataController } from '@web/app/(main)/interview-management/_components/DataController/DataController';

export interface ApplicantSliderHeaderProps {
  name: string;
  total: number;
  current: number;
  onPrev: () => void;
  onNext: () => void;
  onViewApplication: () => void;
}

export const ApplicantSliderHeader = ({
  name,
  total,
  current,
  onPrev,
  onNext,
  onViewApplication,
}: ApplicantSliderHeaderProps) => {
  return (
    <div className={styles.container}>
      <Flex align="center" gap="1.6rem" width="26rem">
        <Flex align="center" gap="1.2rem">
          <Text variant="md1_text_medium" color="grayscale50">
            지원자{current}
          </Text>
          <Divider
            direction="column"
            length="2.8rem"
            borderColor="grayscale10"
          />
          <Text variant="md1_text_medium" color="black">
            {name}
          </Text>
        </Flex>

        <button
          className={styles.applicationButton}
          onClick={onViewApplication}
        >
          지원서 바로가기
        </button>
      </Flex>

      <DataController
        current={current - 1}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      />
    </div>
  );
};
