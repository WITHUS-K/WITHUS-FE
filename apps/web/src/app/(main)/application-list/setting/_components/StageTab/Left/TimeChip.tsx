'use client';

import React from 'react';
import * as s from '../StageTab.css';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';

interface Props {
  /** 'HH:mm' 형식 문자열, 없으면 플레이스홀더 */
  start?: string;
  end?: string;
  /** 토글 OFF 상태 */
  disabled?: boolean;
}

export function TimeChip({ start, end, disabled = false }: Props) {
  // 값이 없으면 HH:MM 플레이스홀더
  const dispStart = start || 'HH:MM';
  const dispEnd = end || 'HH:MM';

  return (
    <Flex width="100%" align="center" gap="1.2rem">
      {/* 시작 박스 */}
      <div className={`${s.timeBox} ${disabled ? s.timeBoxDisabled : ''}`}>
        {dispStart}
      </div>

      {/* 구분자 */}
      <Text variant="md2_text_medium" color="grayscale40">
        -
      </Text>

      {/* 종료 박스 */}
      <div className={`${s.timeBox} ${disabled ? s.timeBoxDisabled : ''}`}>
        {dispEnd}
      </div>
    </Flex>
  );
}
