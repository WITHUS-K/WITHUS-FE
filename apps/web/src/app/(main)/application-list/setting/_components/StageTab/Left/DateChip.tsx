'use client';

import React from 'react';
import { IcCalendar, IcPlus } from '@repo/ui/icons/mono';
import { Flex } from '@repo/ui/Flex';
import { format } from 'date-fns';
import * as s from '../StageTab.css';

interface Props {
  date?: string;
  placeholder?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function DateChip({
  date,
  placeholder = 'YYYY/MM/DD',
  selected = false,
  disabled = false,
  onClick,
}: Props) {
  const label = date ? format(new Date(date), 'yyyy/MM/dd') : placeholder;
  return (
    <button
      className={`${s.dateChip} ${selected ? s.dateChipSelected : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      <Flex align="center" gap="1.2rem">
        <IcCalendar width={24} height={24} />
        <span>{label}</span>
      </Flex>
      <IcPlus width={24} height={24} />
    </button>
  );
}
