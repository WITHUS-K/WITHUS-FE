'use client';

import React, { useState, useEffect } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { Button } from '@repo/ui/Button';
import { DatePicker } from '@repo/ui/DatePicker';
import * as s from '../../StageTab.css';

interface Props {
  title: string;
  /** 아직 폼에 반영되지 않은, 패널이 열릴 때 기본 보여줄 날짜 */
  selectedDate?: Date;
  /** 등록 버튼 클릭 시 부모(RightPanel)에 호출 */
  onSelect: (d: Date) => void;
  icon: React.ReactNode;
  helperText: string;
}

export default function CommonSectionPanel({
  title,
  selectedDate,
  onSelect,
  icon,
  helperText,
}: Props) {
  // 로컬 상태로 실제 DatePicker가 조작할 날짜를 관리
  const [localDate, setLocalDate] = useState<Date | undefined>(selectedDate);

  // 패널이 열릴 때 prop.selectedDate 가 바뀌면 로컬에도 동기화
  useEffect(() => {
    setLocalDate(selectedDate);
  }, [selectedDate]);

  return (
    <Flex align="stretch" width="100%" gap="2rem">
      {/* 왼쪽: 제목 + 달력 */}
      <Flex direction="column" align="flexStart" gap="1.6rem">
        <Text variant="md1_text_semibold" color="grayscale70">
          {title}
        </Text>
        <DatePicker
          selectedDate={localDate ?? new Date()}
          onSelect={(d) => setLocalDate(d)}
        />
      </Flex>

      {/* 오른쪽: 아이콘, 도움말, 등록 버튼 */}
      <Flex
        direction="column"
        align="center"
        justify="spaceBetween"
        width="100%"
        height="100%"
        gap="13.6rem"
        paddingTop="16.2rem"
      >
        <Flex direction="column" align="center" gap="2rem">
          {icon}
          <Text
            variant="lg_subtitle_medium"
            color="grayscale30"
            style={{ whiteSpace: 'pre-line' }}
          >
            {helperText}
          </Text>
        </Flex>

        {/* 등록 버튼: localDate 가 있을 때만 활성화 */}
        <Button
          type="button"
          variant="main"
          size="40"
          disabled={!localDate}
          width="100%"
          onClick={() => {
            if (localDate) {
              onSelect(localDate);
            }
          }}
        >
          등록
        </Button>
      </Flex>
    </Flex>
  );
}
