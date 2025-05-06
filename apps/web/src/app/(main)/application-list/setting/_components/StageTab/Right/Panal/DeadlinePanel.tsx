'use client';

import React from 'react';
import CommonSectionPanel from './CommonSectionPanel';
import { IcPanalEnd } from '@repo/ui/icons/colored';

interface DeadlinePanelProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
}

export default function DeadlinePanel({
  selectedDate,
  onSelect,
}: DeadlinePanelProps) {
  return (
    <CommonSectionPanel
      title="지원 마감"
      selectedDate={selectedDate}
      onSelect={onSelect}
      icon={<IcPanalEnd width={48} height={48} />}
      helperText="당일 23:59에 지원 마감됩니다."
    />
  );
}
