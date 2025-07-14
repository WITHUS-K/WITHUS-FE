'use client';

import React from 'react';
import CommonSectionPanel from './CommonSectionPanel';
import { IcPanalPass } from '@repo/ui/icons/colored';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormValues, InterviewScheduleItem } from '@web/types/application';
import { parseISO } from 'date-fns';

interface FinalPanelProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
}

export default function FinalPanel({
  selectedDate,
  onSelect,
}: FinalPanelProps) {
  // form에서 scheduleList 읽어와 가장 늦은 날짜 계산
  const { control } = useFormContext<FormValues>();
  const scheduleList = useWatch<FormValues, 'interviewSchedule.scheduleList'>({
    control,
    name: 'interviewSchedule.scheduleList',
    defaultValue: [] as InterviewScheduleItem[],
  });
  const dates = scheduleList
    .map((s) => s.date)
    .filter(Boolean)
    .map((d) => parseISO(d));
  const maxDate = dates.length
    ? new Date(Math.max(...dates.map((d) => d.getTime())))
    : undefined;

  return (
    <CommonSectionPanel
      title="최종 합격 발표"
      selectedDate={selectedDate}
      onSelect={onSelect}
      minDate={maxDate}
      icon={<IcPanalPass width={48} height={48} />}
      helperText={`단체 메일과 문자를 통해\n최종 합격을 안내합니다.`}
    />
  );
}
