import { useMemo } from 'react';
import { parseToMin } from '@web/utils/time';
import type { SlotItem } from '@web/constants/timetable';

export function useTimeTableData(
  slots: SlotItem[],
  startHour: number,
  endHour: number,
  interval: number
) {
  const rowsPerHour = 60 / interval;
  const totalRows = (endHour - startHour) * rowsPerHour;

  // slot.startTime ~ slot.endTime 의 row 구간 모두 Map 에 기록
  const slotMap = useMemo(() => {
    const m = new Map<number, SlotItem>();
    for (const slot of slots) {
      const startMin = parseToMin(slot.startTime);
      const endMin = parseToMin(slot.endTime);
      // 시작 row, 끝 row 계산
      const startRow = Math.floor((startMin - startHour * 60) / interval);
      const endRow = Math.ceil((endMin - startHour * 60) / interval);
      // 범위 내 모든 row 에 slot 기록
      for (let r = startRow; r < endRow; r++) {
        if (r >= 0 && r < totalRows) m.set(r, slot);
      }
    }
    return m;
  }, [slots, startHour, interval, totalRows]);

  // rowBgColors: slotMap 에 있으면 slot.color, 없으면 투명
  const rowBgColors = useMemo(
    () =>
      Array.from({ length: totalRows }, (_, i) => {
        const slot = slotMap.get(i);
        return slot?.color ?? 'transparent';
      }),
    [slotMap, totalRows]
  );

  // labels: 오직 풀아워에만 "HH" 로 표시
  const labels = useMemo(
    () =>
      Array.from({ length: totalRows }, (_, i) =>
        i % rowsPerHour === 0 ? String(startHour + i / rowsPerHour) : ''
      ),
    [startHour, rowsPerHour, totalRows]
  );

  return { totalRows, rowsPerHour, rowBgColors, labels };
}
