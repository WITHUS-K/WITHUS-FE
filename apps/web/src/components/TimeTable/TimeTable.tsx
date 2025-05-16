'use client';
import React from 'react';
import clsx from 'clsx';
import { Flex } from '@repo/ui/Flex';
import { useTimeTableData } from '../../hooks/useTimeTableData';
import * as styles from './TimeTable.css';
import type { SlotItem } from '@web/constants/timetable';
import { Text } from '@repo/ui/Text';
import { TimeSlot } from '@web/store/query/useInterviewScheduleQuery';

export interface TimeTableProps {
  title: string;
  headers?: string[];
  interval: number;
  startHour: number;
  endHour: number;
  slots?: TimeSlot[];
  renderCell: (row: number) => React.ReactNode;
  className?: string;
  width?: string;
  hideRowBorder?: boolean[];
}

export function TimeTable({
  title,
  headers,
  interval,
  startHour,
  endHour,
  slots = [],
  renderCell,
  className,
  hideRowBorder = [],
  width,
}: TimeTableProps) {
  const { totalRows, rowsPerHour, rowBgColors, labels } = useTimeTableData(
    slots,
    startHour,
    endHour,
    interval
  );

  return (
    <div className={clsx(className, styles.root)} style={{ width }}>
      {/* TITLE + HEADERS */}
      <Flex direction="column" align="center" gap="1.6rem">
        <Text variant="md2_text_semibold" color="grayscale90">
          {title}
        </Text>
        {headers && (
          <div className={styles.headerRow}>
            <div className={styles.headerSpacer} />
            {headers.map((h, i) => (
              <Text
                key={i}
                variant="sm_caption_medium"
                color="grayscale70"
                style={{ width: '14rem', textAlign: 'center' }}
              >
                {h}
              </Text>
            ))}
          </div>
        )}
      </Flex>

      <Flex width="100%">
        {/* 라벨 콜럼 */}
        <Flex direction="column">
          {labels.map((lbl, i) => (
            <div key={i} className={styles.timeLabel}>
              {lbl}
            </div>
          ))}
          {/* 마지막 시간 */}
          <div className={styles.timeLabel}>{String(endHour)}</div>
        </Flex>

        {/* 셀 콜럼 */}
        <div className={styles.cellsWrapper}>
          {rowBgColors.map((bgColor, row) => {
            const isLast = row === totalRows - 1;
            const boundaryMinute = (startHour * 60 + (row + 1) * interval) % 60;
            const isDotted = boundaryMinute !== 0;
            const hideBorder = Boolean(hideRowBorder[row]);

            return (
              <div
                key={row}
                role="cell"
                className={clsx(
                  styles.cell,
                  isDotted && styles.dotted,
                  isLast && styles.lastRow,
                  hideBorder && styles.noBorder
                )}
                style={{ backgroundColor: bgColor }}
              >
                {renderCell(row)}
              </div>
            );
          })}
        </div>
      </Flex>
    </div>
  );
}
