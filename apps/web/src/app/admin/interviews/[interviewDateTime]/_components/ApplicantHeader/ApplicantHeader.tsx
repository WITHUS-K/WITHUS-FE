'use client';
import React from 'react';
import { Text, Button, Flex } from '@repo/ui';
import * as styles from './ApplicantHeader.css';
import { DataController } from '@web/app/admin/interviews/[interviewDateTime]/_components/DataController/DataController';
import { Divider } from 'node_modules/@repo/ui/src/components/Divider/Divider';

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
      <Flex direction="row" justify="spaceBetween" grow="grow1" align="center">
        <Flex align="center" gap="1.6rem" justify="center">
          <Flex align="center" gap="1.2rem" justify="center">
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
          <Button size="32" variant="main" onClick={onViewApplication}>
            지원서 바로가기
          </Button>
        </Flex>

        <DataController
          current={current}
          total={total}
          onPrev={onPrev}
          onNext={onNext}
        />
      </Flex>
    </div>
  );
};
