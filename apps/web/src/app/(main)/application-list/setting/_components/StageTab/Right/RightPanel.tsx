// components/StageTab/RightPanel.tsx
'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Flex } from '@repo/ui/Flex';
import * as s from '../StageTab.css';
import DeadlinePanel from './Panal/DeadlinePanel';
import DocumentPanel from './Panal/DocumentPanel';
import FinalPanel from './Panal/FinalPanel';
import { Text } from '@repo/ui/Text';
import { IcPanalCalendar } from '@repo/ui/icons/colored';
import InterviewPanel from './Panal/InterviewPanel';

export default function RightPanel() {
  const { watch, setValue } = useFormContext();

  const active = watch('activeSection');

  // raw 값 읽기
  const rawDeadline = watch('deadline');
  const rawDocDate = watch('documentResult.date');
  const rawFinalDate = watch('finalResultDate');

  // 선택 값이 없다면 undefined, 있으면 Date로 변환
  const deadlineDate = rawDeadline ? new Date(rawDeadline) : undefined;
  const docDate = rawDocDate ? new Date(rawDocDate) : undefined;
  const finalDate = rawFinalDate ? new Date(rawFinalDate) : undefined;

  // 패널에서 날짜 고르면 폼에 반영
  const mkOnSelect = (field: string) => (d: Date) => {
    setValue(field, d.toISOString());
    setValue('activeSection', null);
  };

  return (
    <Flex direction="column" className={s.right}>
      {!active && (
        <Flex direction="column" align="center" justify="center" gap="2rem">
          <IcPanalCalendar width={48} height={48} />
          <Text variant="lg_subtitle_medium" color="grayscale30">
            우측 패널을 클릭해 일정을 추가해주세요.
          </Text>
        </Flex>
      )}

      {active === 'deadline' && (
        <DeadlinePanel
          selectedDate={deadlineDate!}
          onSelect={mkOnSelect('deadline')}
        />
      )}

      {active === 'document' && (
        <DocumentPanel
          selectedDate={docDate!}
          onSelect={mkOnSelect('documentResult.date')}
        />
      )}

      {typeof active === 'string' && active.startsWith('interview') && (
        <InterviewPanel key={active} />
      )}

      {active === 'final' && (
        <FinalPanel
          selectedDate={finalDate!}
          onSelect={mkOnSelect('finalResultDate')}
        />
      )}
    </Flex>
  );
}
