'use client';

import React from 'react';
import { IcCalendar, IcPlus } from '@repo/ui/icons/mono';
import { Flex } from '@repo/ui/Flex';
import { format, parseISO } from 'date-fns';
import * as s from '../StageTab.css';
import { normalizeDateStr } from '@web/utils/convertFormToRequest';

const DRAFT_FUTURE_DATE = '2027.05.30';

interface Props {
  date?: string;
  placeholder?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function DateChip({
  date,
  placeholder = 'YYYY/MM/DD',
  selected = false,
  disabled = false,
  onClick,
}: Props) {
  const isDraft = date === DRAFT_FUTURE_DATE;

  const label =
    !date || isDraft
      ? placeholder
      : format(parseISO(normalizeDateStr(date)), 'yyyy/MM/dd');

  return (
    <button
      type="button"
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
