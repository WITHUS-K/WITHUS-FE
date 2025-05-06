// components/StageTab/panels/DocumentPanel.tsx
'use client';

import React from 'react';
import CommonSectionPanel from './CommonSectionPanel';
import { IcPanalPass } from '@repo/ui/icons/colored';

interface DocumentPanelProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
}

export default function DocumentPanel({
  selectedDate,
  onSelect,
}: DocumentPanelProps) {
  return (
    <CommonSectionPanel
      title="서류 합격 발표"
      selectedDate={selectedDate}
      onSelect={onSelect}
      icon={<IcPanalPass width={48} height={48} />}
      helperText={`단체 메일과 문자를 통해\n최종 합격을 안내합니다.`}
    />
  );
}
