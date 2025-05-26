'use client';
import React, { useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { TimeTable, TimeTableProps } from './TimeTable';
import {
  useSelectableRange,
  Range as RowRange,
} from '../../hooks/useRangeSelection';
import { rangeToTimeRange, parseToMin } from '@web/utils/time';
import * as styles from './TimeTable.css';
import { InterviewSchedule } from '@web/types/application';

export interface TimeRange {
  startTime: string;
  endTime: string;
}

export interface SelectableTimeTableProps
  extends Omit<TimeTableProps, 'renderCell'> {
  onRangeSelect?: (range: TimeRange | null) => void;
  renderCell?: (row: number) => React.ReactNode;
  interviewSchedule?: InterviewSchedule;

  /** 선택(클릭·드래그) 가능 여부. false 면 그냥 보여주기만 함 */
  selectable?: boolean;
}

export function SelectableTimeTable({
  selectable = true,
  onRangeSelect,
  renderCell,
  interval,
  startHour,
  endHour,
  interviewSchedule,
  ...ttProps
}: SelectableTimeTableProps) {
  const cellRenderer = renderCell ?? (() => null);

  // 선택 가능 모드일 때만 useSelectableRange
  const { range, handlers } = selectable
    ? useSelectableRange((rowRange) => {
        if (!rowRange) return onRangeSelect?.(null);
        onRangeSelect?.(rangeToTimeRange(rowRange, startHour, interval));
      })
    : {
        range: null,
        handlers: {
          onMouseDown: () => {},
          onMouseEnter: () => {},
          onClick: () => {},
        },
      };

  // 불가능한 row 인덱스 계산
  const disabledRows = useMemo(() => {
    if (!interviewSchedule)
      return new Array((endHour - startHour) * (60 / interval)).fill(false);

    const totalRows = (endHour - startHour) * (60 / interval);
    return Array.from({ length: totalRows }, (_, row) => {
      const cellStart = startHour * 60 + row * interval;
      const cellEnd = cellStart + interval;

      const ok = interviewSchedule.scheduleList.some((slot) => {
        const s = parseToMin(slot.startTime);
        const e = parseToMin(slot.endTime);
        return cellStart >= s && cellEnd <= e;
      });
      return !ok;
    });
  }, [interviewSchedule, startHour, endHour, interval]);

  const handleMouseDown = useCallback(
    (row: number) => {
      if (selectable && !disabledRows[row]) {
        handlers.onMouseDown(row);
      }
    },
    [selectable, disabledRows, handlers]
  );

  const selectedRows = useMemo(
    () =>
      selectable
        ? disabledRows.map((_, row) =>
            Boolean(range && row >= range.start && row <= range.end)
          )
        : disabledRows.map(() => false),
    [selectable, disabledRows, range]
  );

  return (
    <TimeTable
      {...ttProps}
      interval={interval}
      startHour={startHour}
      endHour={endHour}
      hideRowBorder={selectedRows.map((sel, i) => sel || disabledRows[i])}
      renderCell={(row) => {
        const inRange = selectedRows[row];
        const isDisabled = disabledRows[row];
        const boundaryMinute = (startHour * 60 + (row + 1) * interval) % 60;
        const isDotted = boundaryMinute !== 0;

        // view 모드(selectable=false) 면, inRange 절대 안 붙음
        const wrapperClass = clsx(
          styles.cellWrapper,
          // 선택 모드 & 선택된 row
          selectable &&
            inRange &&
            (isDotted ? styles.selectedDotted : styles.selectedSolid),
          // 불가능한 시간(둘 다 모드 공통)
          isDisabled &&
            (isDotted ? styles.unavailableDotted : styles.unavailableSolid)
        );

        return (
          <div
            key={row}
            className={wrapperClass}
            // selectable=true 일 때만 이벤트 연결
            onMouseDown={() => handleMouseDown(row)}
            onMouseEnter={
              !isDisabled && selectable
                ? () => handlers.onMouseEnter(row)
                : undefined
            }
            onClick={
              !isDisabled && selectable
                ? () => handlers.onClick(row)
                : undefined
            }
          >
            {cellRenderer(row)}
          </div>
        );
      }}
    />
  );
}
