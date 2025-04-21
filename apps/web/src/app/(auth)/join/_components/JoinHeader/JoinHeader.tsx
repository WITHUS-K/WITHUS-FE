'use client';

import React from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import ProgressBar from '../ProgressBar/ProgressBar';
import { dividerStyle } from './JoinHeader.css';

type JoinHeaderProps = {
  step: number;
};

export default function JoinHeader({ step }: JoinHeaderProps) {
  return (
    <Flex direction="column" width="100%" gap="2.8rem">
      <Text variant="xl_title_bold" color="grayscale90">
        회원가입
      </Text>
      <ProgressBar currentStep={step} />
      <div className={dividerStyle} />
    </Flex>
  );
}
