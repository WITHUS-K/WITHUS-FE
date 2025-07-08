'use client';
import React from 'react';
import { IcCalender, IcArrowDown } from '@repo/ui/icons/mono';
import { Flex } from '@repo/ui/Flex';
import { format } from 'date-fns';
import * as s from './DateChip.css';

interface Props {
  date?: string;
  placeholder?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function DateChip({
  date,
  placeholder = 'YYYY/MM/DD',
  selected = false,
  disabled = false,
  onClick,
  onFocus,
  onBlur,
}: Props) {
  const label = date ? format(new Date(date), 'yyyy/MM/dd') : placeholder;
  return (
    <button
      type="button"
      className={`${s.dateChip} ${selected ? s.dateChipSelected : ''}`}
      disabled={disabled}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <Flex align="center" gap="1.2rem">
        <IcCalender width={24} height={24} />
        <span>{label}</span>
      </Flex>
      <IcArrowDown width={24} height={24} />
    </button>
  );
}
