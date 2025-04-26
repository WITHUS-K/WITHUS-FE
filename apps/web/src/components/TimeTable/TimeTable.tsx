'use client';
import React from 'react';
import { Text } from '@repo/ui/Text';
import clsx from 'clsx';
import * as styles from './TimeTable.css';
import { useTimeTableData } from '../../hooks/useTimeTableData';
import { SlotItem } from '@web/constants/timetable';
import { Flex } from '@repo/ui/Flex';

export interface TimeTableProps {
  title: string;
  headers?: string[];
  interval: number;
  startHour: number;
  endHour: number;
  slots?: SlotItem[];
  renderCell: (row: number) => React.ReactNode;
  className?: string;
  width?: string;
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
  width,
}: TimeTableProps) {
  const { totalRows, rowBgColors, labels } = useTimeTableData(
    slots,
    startHour,
    endHour,
    interval
  );

  const rowsPerHour = 60 / interval;

  return (
    <div className={clsx(className, styles.root)} style={{ width }}>
      {/* 제목 + 헤더 */}
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

      {/* 본문 */}
      <Flex width="100%">
        {/* 시간 라벨 */}
        <Flex direction="column">
          {labels.map((lbl, i) => (
            <div key={i} className={styles.timeLabel}>
              {lbl}
            </div>
          ))}
        </Flex>

        {/* 셀들 */}
        <div className={styles.cellsWrapper}>
          {rowBgColors.map((bgColor, row) => {
            const isFullHour = row % rowsPerHour === 0;
            const isLast = row === totalRows - 1;

            return (
              <div
                key={row}
                role="cell"
                className={clsx(
                  styles.cell,
                  isFullHour && styles.fullHour,
                  isLast && styles.lastRow
                )}
                style={{
                  backgroundColor: bgColor,
                }}
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
