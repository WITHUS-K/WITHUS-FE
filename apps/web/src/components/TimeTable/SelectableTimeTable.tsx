'use client';

import React, { useCallback } from 'react';
import { TimeTable, TimeTableProps } from './TimeTable';
import {
  useSelectableRange,
  Range as RowRange,
} from '../../hooks/useRangeSelection';
import { rangeToTimeRange } from '@web/utils/time';
import * as styles from './TimeTable.css';
import clsx from 'clsx';

export interface TimeRange {
  startTime: string;
  endTime: string;
}

export interface SelectableTimeTableProps
  extends Omit<TimeTableProps, 'renderCell'> {
  onRangeSelect: (range: TimeRange | null) => void;
  renderCell?: (row: number) => React.ReactNode;
}

export function SelectableTimeTable({
  onRangeSelect,
  renderCell,
  interval,
  startHour,
  ...ttProps
}: SelectableTimeTableProps) {
  // 내부 Row 범위 → TimeRange 변환 후 콜백
  const handleInternal = useCallback(
    (rowRange: RowRange | null) => {
      if (!rowRange) {
        onRangeSelect(null);
        return;
      }
      const timeRange = rangeToTimeRange(rowRange, startHour, interval);
      onRangeSelect(timeRange);
    },
    [onRangeSelect, startHour, interval]
  );

  const { range, handlers } = useSelectableRange(handleInternal);
  const cellRenderer = renderCell ?? (() => null);

  return (
    <TimeTable
      {...ttProps}
      interval={interval}
      startHour={startHour}
      renderCell={(row) => {
        const inRange = range ? row >= range.start && row <= range.end : false;

        return (
          <div
            key={row}
            className={clsx(styles.cellWrapper, inRange && styles.selected)}
            onMouseDown={() => handlers.onMouseDown(row)}
            onMouseEnter={() => handlers.onMouseEnter(row)}
            onClick={() => handlers.onClick(row)}
          >
            {cellRenderer(row)}
          </div>
        );
      }}
    />
  );
}
