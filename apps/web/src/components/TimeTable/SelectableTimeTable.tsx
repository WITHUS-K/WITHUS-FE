'use client';
import React, { useMemo } from 'react';
import clsx from 'clsx';
import { TimeTable, TimeTableProps } from './TimeTable';
import { useSelectableRanges, Range } from '../../hooks/useRangeSelection';
import { rangeToTimeRange, parseToMin } from '@web/utils/time';
import * as styles from './TimeTable.css';
import type { InterviewSchedule } from '@web/types/application';

export interface TimeRange {
  startTime: string;
  endTime: string;
}

export interface SelectableTimeTableProps
  extends Omit<TimeTableProps, 'renderCell'> {
  onSelectionChange?: (ranges: TimeRange[]) => void;
  renderCell?: (row: number) => React.ReactNode;
  interviewSchedule?: InterviewSchedule;
  selectable?: boolean;
}

export function SelectableTimeTable({
  selectable = true,
  onSelectionChange,
  renderCell,
  interval,
  startHour,
  endHour,
  interviewSchedule,
  ...ttProps
}: SelectableTimeTableProps) {
  const cellRenderer = renderCell ?? (() => null);
  const disabledRows = useMemo(() => {
    const total = (endHour - startHour) * (60 / interval);
    if (!interviewSchedule) return Array(total).fill(false);
    return Array.from({ length: total }, (_, row) => {
      const cellStart = startHour * 60 + row * interval;
      const cellEnd = cellStart + interval;
      return !interviewSchedule.scheduleList.some((slot) => {
        const s = parseToMin(slot.startTime);
        const e = parseToMin(slot.endTime);
        return cellStart >= s && cellEnd <= e;
      });
    });
  }, [interviewSchedule, startHour, endHour, interval]);

  const { ranges, current, handlers } = useSelectableRanges(
    disabledRows,
    (newRanges: Range[]) => {
      const trs = newRanges.map((r) =>
        rangeToTimeRange(r, startHour, interval)
      );
      onSelectionChange?.(trs);
    }
  );

  const selectedRows = useMemo(() => {
    const sel = Array(disabledRows.length).fill(false);
    ranges.forEach((r) => {
      for (let i = r.start; i <= r.end; i++) sel[i] = true;
    });
    if (current) {
      for (let i = current.start; i <= current.end; i++) sel[i] = true;
    }
    return sel;
  }, [ranges, current, disabledRows.length]);

  return (
    <TimeTable
      {...ttProps}
      interval={interval}
      startHour={startHour}
      endHour={endHour}
      hideRowBorder={selectedRows.map((s, i) => s || disabledRows[i])}
      renderCell={(row) => {
        const inRange = selectedRows[row];
        const isDisabled = disabledRows[row];
        const boundaryMinute = (startHour * 60 + (row + 1) * interval) % 60;
        const isDotted = boundaryMinute !== 0;

        const wrapperClass = clsx(
          styles.cellWrapper,
          selectable &&
            inRange &&
            (isDotted ? styles.selectedDotted : styles.selectedSolid),
          isDisabled &&
            (isDotted ? styles.unavailableDotted : styles.unavailableSolid)
        );

        return (
          <div
            key={row}
            className={wrapperClass}
            onMouseDown={() => selectable && handlers.onMouseDown(row)}
            onMouseEnter={() => selectable && handlers.onMouseEnter(row)}
            onClick={() => selectable && handlers.onClick(row)}
          >
            {cellRenderer(row)}
          </div>
        );
      }}
    />
  );
}
