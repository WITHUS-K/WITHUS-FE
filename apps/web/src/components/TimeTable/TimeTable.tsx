// components/TimeTable.tsx
'use client';
import React from 'react';
import { Text } from '@repo/ui/Text';
import * as styles from './TimeTable.css';
import { Flex } from '@repo/ui/Flex';

export interface TimeTableProps {
  title: string;
  headers?: string[];
  interval: number;
  startHour: number;
  endHour: number;
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
  renderCell,
  className,
  width,
}: TimeTableProps) {
  const totalRows = ((endHour - startHour) * 60) / interval;

  const labels = Array.from({ length: totalRows + 1 }).map((_, row) => {
    const totalMin = startHour * 60 + row * interval;
    const hour = Math.floor(totalMin / 60);
    const minute = totalMin % 60;
    return minute === 0 ? String(hour) : '';
  });

  return (
    <div
      className={className}
      style={{ width, display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <Flex direction="column" align="center" gap="1.6rem">
        {/* 1) 제목 */}
        <Text variant="md2_text_semibold" color="grayscale90">
          {title}
        </Text>

        {/* 2) 헤더 Row */}
        {headers && (
          <div
            className={styles.headerRow}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div className={styles.headerSpacer} />
            {headers.map((h, i) => (
              <Text
                key={i}
                variant="sm_caption_medium"
                color="grayscale70"
                style={{ flex: 1, textAlign: 'center' }}
              >
                {h}
              </Text>
            ))}
          </div>
        )}
      </Flex>

      {/* 3) 본문 */}
      <div style={{ display: 'flex', width: '100%' }}>
        {/* 3-1) 시간 라벨 */}
        <div
          className={styles.labelColumn}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          {labels.map((label, idx) => (
            <div key={idx} className={styles.timeLabel}>
              {label}
            </div>
          ))}
        </div>

        {/* 3-2) 셀 컬럼 */}
        <div
          className={styles.cellsWrapper}
          style={{ display: 'flex', flexDirection: 'column', width }}
        >
          {Array.from({ length: totalRows }).map((_, row) => {
            const isFullHour = (row * interval) % 60 === 0;
            const isLast = row === totalRows - 1;

            return (
              <div
                key={row}
                className={[
                  styles.cell,
                  isFullHour && styles.fullHour,
                  isLast && styles.lastRow,
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {renderCell(row)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
