'use client';
import { useState, useRef, useEffect, useCallback } from 'react';

export interface Range {
  start: number;
  end: number;
}

export function useSelectableRanges(
  disabledRows: boolean[],
  onChange: (ranges: Range[]) => void
) {
  const [ranges, setRanges] = useState<Range[]>([]);
  const origin = useRef<number | null>(null);
  const prevRangesRef = useRef<Range[]>([]);
  const isRemovingRef = useRef<boolean>(false);
  const [isDragging, setIsDragging] = useState(false);
  const [current, setCurrent] = useState<Range | null>(null);
  const lastClick = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      if (isDragging && origin.current !== null && current) {
        const base = prevRangesRef.current;
        const { start, end } = current;

        const segments: Range[] = [];
        let segStart: number | null = null;
        for (let i = start; i <= end; i++) {
          if (!disabledRows[i]) {
            if (segStart === null) segStart = i;
          } else if (segStart !== null) {
            segments.push({ start: segStart, end: i - 1 });
            segStart = null;
          }
        }
        if (segStart !== null) segments.push({ start: segStart, end });

        let updated = [...base];
        if (isRemovingRef.current) {
          segments.forEach((seg) => {
            updated = updated.filter(
              (r) => !(r.start === seg.start && r.end === seg.end)
            );
          });
        } else {
          segments.forEach((seg) => {
            const exists = updated.some(
              (r) => r.start === seg.start && r.end === seg.end
            );
            if (!exists) updated.push(seg);
          });
        }

        setRanges(updated);
        onChange(updated);
      }

      // 상태 초기화
      origin.current = null;
      prevRangesRef.current = [];
      isRemovingRef.current = false;
      setIsDragging(false);
      setCurrent(null);
      lastClick.current = null;
    };

    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [isDragging, current, disabledRows, onChange]);

  const onMouseDown = useCallback(
    (row: number) => {
      if (disabledRows[row]) return;
      origin.current = row;
      prevRangesRef.current = ranges;
      // 시작 셀이 이미 선택된 상태면 삭제 모드
      isRemovingRef.current = ranges.some(
        (r) => row >= r.start && row <= r.end
      );
      setIsDragging(false);
      setCurrent({ start: row, end: row });
    },
    [disabledRows, ranges]
  );

  const onMouseEnter = useCallback((row: number) => {
    if (origin.current !== null) {
      setIsDragging(true);
      setCurrent({
        start: Math.min(origin.current, row),
        end: Math.max(origin.current, row),
      });
    }
  }, []);

  const onClick = useCallback(
    (row: number) => {
      if (disabledRows[row]) return;

      // 드래그 아님
      if (!isDragging) {
        // 두 번 클릭으로 range 토글
        if (lastClick.current !== null && lastClick.current !== row) {
          const s = Math.min(lastClick.current, row);
          const e = Math.max(lastClick.current, row);
          // s~e 구간을 disabledRows 제외하고 contiguous segments로 분할
          const segments: Range[] = [];
          let segStart: number | null = null;
          for (let i = s; i <= e; i++) {
            if (!disabledRows[i]) {
              if (segStart === null) segStart = i;
            } else if (segStart !== null) {
              segments.push({ start: segStart, end: i - 1 });
              segStart = null;
            }
          }
          if (segStart !== null) segments.push({ start: segStart, end: e });

          let updated = [...ranges];
          segments.forEach((seg) => {
            const idx = updated.findIndex(
              (r) => r.start === seg.start && r.end === seg.end
            );
            if (idx >= 0) {
              // 이미 있으면 삭제
              updated.splice(idx, 1);
            } else {
              // 없으면 추가
              updated.push(seg);
            }
          });

          setRanges(updated);
          onChange(updated);
          lastClick.current = null;
        }
        // 단일 클릭 토글
        else {
          const seg = { start: row, end: row };
          const idx = ranges.findIndex((r) => r.start === row && r.end === row);
          let updated = [...ranges];
          if (idx >= 0) {
            updated.splice(idx, 1);
          } else {
            updated.push(seg);
          }
          setRanges(updated);
          onChange(updated);
          lastClick.current = row;
        }
      }
    },
    [disabledRows, isDragging, ranges, onChange]
  );

  return {
    ranges,
    current,
    handlers: { onMouseDown, onMouseEnter, onClick },
  };
}
