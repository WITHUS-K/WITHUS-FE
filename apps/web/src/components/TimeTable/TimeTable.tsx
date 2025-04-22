'use client';
import React from 'react';
import { Text } from '@repo/ui/Text';
import * as styles from './TimeTable.css';
import { parseToMin } from '@web/utils/time';

export interface SlotItem {
  startTime: string;
  endTime: string;
  color?: string;
}

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
  const totalRows = ((endHour - startHour) * 60) / interval;

  // slots에 min 단위 프로퍼티 붙이기
  const slotsMin = slots.map((s) => ({
    ...s,
    startMin: parseToMin(s.startTime),
    endMin: parseToMin(s.endTime),
  }));

  // 각 row마다 실제 시각(분 단위)
  const rowMins = Array.from({ length: totalRows }).map(
    (_, i) => startHour * 60 + i * interval
  );

  // 시간 라벨
  const labels = Array.from({ length: totalRows + 1 }).map((_, i) => {
    const totalMin = startHour * 60 + i * interval;
    const hour = Math.floor(totalMin / 60);
    return totalMin % 60 === 0 ? String(hour) : '';
  });

  return (
    <div
      className={className}
      style={{ width, display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      {/* 제목 + 헤더 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.6rem',
        }}
      >
        <Text variant="md2_text_semibold" color="grayscale90">
          {title}
        </Text>
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
                style={{ width: '14rem', textAlign: 'center' }}
              >
                {h}
              </Text>
            ))}
          </div>
        )}
      </div>

      {/* 본문 */}
      <div style={{ display: 'flex', width: '100%' }}>
        {/* 시간 라벨 */}
        <div
          className={styles.labelColumn}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          {labels.map((lbl, i) => (
            <div key={i} className={styles.timeLabel}>
              {lbl}
            </div>
          ))}
        </div>

        {/* 셀 */}
        <div className={styles.cellsWrapper}>
          {rowMins.map((rowMin, row) => {
            const isFullHour = rowMin % 60 === 0;
            const isLast = row === totalRows - 1;

            // rowMin이 슬롯 범위 안에 있으면 color 가져오기
            const slot = slotsMin.find(
              (s) => rowMin >= s.startMin && rowMin < s.endMin
            );
            const bgColor = slot?.color;

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
                  backgroundColor: bgColor,
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
