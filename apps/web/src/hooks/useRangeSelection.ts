import { useState, useRef, useEffect, useCallback } from 'react';

export interface Range {
  start: number;
  end: number;
}

export function useSelectableRange(
  onRangeSelect: (range: Range | null) => void
) {
  const [range, setRange] = useState<Range | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const origin = useRef<number | null>(null);
  const prevRangeRef = useRef<Range | null>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      if (isDragging) {
        if (
          range &&
          prevRangeRef.current &&
          range.start === prevRangeRef.current.start &&
          range.end === prevRangeRef.current.end
        ) {
          setRange(null);
          onRangeSelect(null);
        } else {
          onRangeSelect(range);
        }
      }

      origin.current = null;
      prevRangeRef.current = null;
      setIsDragging(false);
    };
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, range, onRangeSelect]);

  const onMouseDown = useCallback(
    (row: number) => {
      prevRangeRef.current = range;
      origin.current = row;
      setIsDragging(false);
    },
    [range]
  );

  const onMouseEnter = useCallback((row: number) => {
    if (origin.current !== null) {
      setIsDragging(true);
      const start = Math.min(origin.current, row);
      const end = Math.max(origin.current, row);
      setRange({ start, end });
    }
  }, []);

  const onClick = useCallback(
    (row: number) => {
      if (isDragging) return;
      // 클릭만 했을 때 range 가 null 이면 새로 생성
      if (!range) {
        const r = { start: row, end: row };
        setRange(r);
        onRangeSelect(r);
        return;
      }
      const { start, end } = range;
      // 토글/축소/확장/해제 로직 (이전과 동일)
      if (row === start && start === end) {
        setRange(null);
        onRangeSelect(null);
        return;
      }
      if (row === start) {
        const r2 = start === end ? null : { start: start + 1, end };
        setRange(r2);
        onRangeSelect(r2);
        return;
      }
      if (row === end) {
        const r2 = start === end ? null : { start, end: end - 1 };
        setRange(r2);
        onRangeSelect(r2);
        return;
      }
      if (row > start && row < end) {
        setRange(null);
        onRangeSelect(null);
        return;
      }
      const newRange = { start: Math.min(start, row), end: Math.max(end, row) };
      setRange(newRange);
      onRangeSelect(newRange);
    },
    [isDragging, range, onRangeSelect]
  );

  return {
    range,
    handlers: { onMouseDown, onMouseEnter, onClick },
  };
}
