'use client';

import React from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { Button } from '@repo/ui/Button';
import { IcJoinStep4 } from '@repo/ui/icons/colored';
import { buttonStyle } from '../Step1/Step1.css';

interface Step4Props {
  memberName: string;
  onLogin?: () => void;
}

export default function Step4({ memberName, onLogin }: Step4Props) {
  return (
    <Flex direction="column" align="center" marginTop="3.6rem">
      <IcJoinStep4 width={161} height={148} />

      <Flex direction="column" align="center" gap="0.5rem" marginTop="2rem">
        <Text variant="xl_title_semibold" color="grayscale80">
          안녕하세요 {memberName}님,
        </Text>
        <Text variant="xl_title_semibold" color="grayscale80">
          위더스 가입이 완료됐어요!
        </Text>
      </Flex>

      <Button
        variant="main"
        size="64"
        width="43.4rem"
        className={buttonStyle}
        onClick={onLogin}
      >
        위더스 로그인하기
      </Button>
    </Flex>
  );
}
