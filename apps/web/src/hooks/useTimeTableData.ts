import { useMemo } from 'react';
import { parseToMin } from '@web/utils/time';
import { SlotItem } from '@web/constants/timetable';

export function useTimeTableData(
  slots: SlotItem[],
  startHour: number,
  endHour: number,
  interval: number
) {
  const totalRows = ((endHour - startHour) * 60) / interval;

  const slotsMin = slots.map((s) => ({
    startMin: parseToMin(s.startTime),
    endMin: parseToMin(s.endTime),
    color: s.color,
  }));

  const rowBgColors = useMemo(() => {
    const colors: (string | undefined)[] = Array(totalRows).fill(undefined);
    for (const { startMin, endMin, color } of slotsMin) {
      const startIdx = Math.max(
        0,
        Math.floor((startMin - startHour * 60) / interval)
      );
      const endIdx = Math.min(
        totalRows,
        Math.ceil((endMin - startHour * 60) / interval)
      );
      for (let i = startIdx; i < endIdx; i++) {
        colors[i] = color;
      }
    }
    return colors;
  }, [slotsMin, totalRows, startHour, interval]);

  const labels = Array.from({ length: totalRows + 1 }).map((_, i) => {
    const totalMin = startHour * 60 + i * interval;
    const hour = Math.floor(totalMin / 60);
    return totalMin % 60 === 0 ? String(hour) : '';
  });

  return { totalRows, rowBgColors, labels };
}
