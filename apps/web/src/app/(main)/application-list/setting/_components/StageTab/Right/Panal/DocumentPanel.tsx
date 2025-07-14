'use client';

import React from 'react';
import CommonSectionPanel from './CommonSectionPanel';
import { IcPanalPass } from '@repo/ui/icons/colored';

interface DocumentPanelProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
  minDate?: Date;
}

export default function DocumentPanel({
  selectedDate,
  onSelect,
  minDate,
}: DocumentPanelProps) {
  return (
    <CommonSectionPanel
      title="서류 합격 발표"
      selectedDate={selectedDate}
      onSelect={onSelect}
      minDate={minDate}
      icon={<IcPanalPass width={48} height={48} />}
      helperText={`단체 메일과 문자를 통해\n합격발표가 가능합니다.`}
    />
  );
}
