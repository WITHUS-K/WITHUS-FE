'use client';
import React from 'react';
import { Flex, Text } from '@repo/ui';
import * as styles from './DataController.css';
import { IcArrowLeft, IcArrowRight } from '@repo/ui/icons/mono';
import { vars } from '@repo/theme';

interface DataControllerProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export const DataController = ({
  current,
  total,
  onPrev,
  onNext,
}: DataControllerProps) => {
  const prevDisabled = current === 0;
  const nextDisabled = current === total - 1;

  return (
    <Flex gap="6.4rem" direction="row" align="center">
      <button
        onClick={onPrev}
        disabled={prevDisabled}
        className={styles.button}
        aria-label="이전 지원자"
      >
        <IcArrowLeft
          width={24}
          height={24}
          style={{
            color: prevDisabled
              ? vars.colors.grayscale30
              : vars.colors.grayscale50,
          }}
        />
        <Text
          variant="md2_text_medium"
          color={prevDisabled ? 'grayscale30' : 'grayscale70'}
        >
          이전 지원자
        </Text>
      </button>

      <button
        onClick={onNext}
        disabled={nextDisabled}
        className={styles.button}
        aria-label="다음 지원자"
      >
        <Text
          variant="md2_text_medium"
          color={nextDisabled ? 'grayscale30' : 'grayscale70'}
        >
          다음 지원자
        </Text>
        <IcArrowRight
          width={24}
          height={24}
          style={{
            color: nextDisabled
              ? vars.colors.grayscale30
              : vars.colors.grayscale50,
          }}
        />
      </button>
    </Flex>
  );
};
