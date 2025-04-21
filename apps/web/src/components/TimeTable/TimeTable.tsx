'use client';

import React from 'react';
import * as styles from './TimeTable.css';
import { Text } from '@repo/ui/Text';

export interface TimeTableProps {
  title: string;
  headers?: string[];
  columnWidths?: string[];
  interval: number;
  startHour: number;
  endHour: number;
  renderCell: (row: number, col: number) => React.ReactNode;
  className?: string;
  width?: string;
}

export function TimeTable({
  title,
  headers,
  columnWidths,
  interval,
  startHour,
  endHour,
  renderCell,
  className,
  width,
}: TimeTableProps) {
  const totalRows = ((endHour - startHour) * 60) / interval;
  const totalCols = headers?.length || 1;
  const colTemplate = columnWidths
    ? columnWidths.join(' ')
    : `repeat(${totalCols}, 1fr)`;

  return (
    <div
      className={`${styles.wrapper} ${className ?? ''}`}
      style={width ? { width } : undefined}
    >
      <Text>{title}</Text>

      {headers && (
        <div
          className={styles.headerRow}
          style={{ gridTemplateColumns: colTemplate }}
        >
          {headers.map((h, i) => (
            <div key={i} className={styles.headerCell}>
              {h}
            </div>
          ))}
        </div>
      )}

      <div className={styles.grid} style={{ gridTemplateColumns: colTemplate }}>
        {Array.from({ length: totalRows }).flatMap((_, row) =>
          Array.from({ length: totalCols }).map((_, col) => {
            const minute = (row * interval) % 60;
            const hour = startHour + Math.floor((row * interval) / 60);
            const minuteStr = String(minute).padStart(2, '0');
            const isFullHour = minute === 0;

            return (
              <div
                key={`${row}-${col}`}
                className={[styles.cell, isFullHour && styles.fullHourCell]
                  .filter(Boolean)
                  .join(' ')}
              >
                {col === 0 && (
                  <div className={styles.timeLabel}>
                    {hour}:{minuteStr}
                  </div>
                )}
                <div className={styles.cellContent}>{renderCell(row, col)}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
