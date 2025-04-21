'use client';

import React, { useCallback } from 'react';
import { TimeTable, TimeTableProps } from './TimeTable';
import {
  useSelectableRange,
  Range as RowRange,
} from '../../hooks/useRangeSelection';
import { rangeToTimeRange } from '@web/utils/time';

export interface TimeRange {
  startTime: string;
  endTime: string;
}

export interface SelectableTimeTableProps
  extends Omit<TimeTableProps, 'renderCell'> {
  onRangeSelect: (range: TimeRange | null) => void;
  renderCell?: TimeTableProps['renderCell'];
}

export function SelectableTimeTable({
  onRangeSelect,
  renderCell,
  interval,
  startHour,
  ...ttProps
}: SelectableTimeTableProps) {
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
      renderCell={(row, col) => {
        const inRange = range ? row >= range.start && row <= range.end : false;
        return (
          <div
            key={`${row}-${col}`}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: inRange ? 'rgba(80,100,255,0.3)' : undefined,
            }}
            onMouseDown={() => handlers.onMouseDown(row)}
            onMouseEnter={() => handlers.onMouseEnter(row)}
            onClick={() => handlers.onClick(row)}
          >
            {cellRenderer(row, col)}
          </div>
        );
      }}
    />
  );
}
