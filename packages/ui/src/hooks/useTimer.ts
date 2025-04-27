import { useRef, useCallback, useEffect } from 'react';

type UseTimerParameters = {
  onTimerEnd?: () => void;
  timeoutSecond?: number;
};

export function useTimer({
  onTimerEnd,
  timeoutSecond = 3000,
}: UseTimerParameters) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const startCurrentTimer = useCallback(() => {
    if (!onTimerEnd) return;

    if (timerRef.current !== undefined) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(onTimerEnd, timeoutSecond);
  }, [timeoutSecond, onTimerEnd]);

  const clearCurrentTimeout = useCallback(() => {
    if (timerRef.current !== undefined) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current !== undefined) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return {
    startCurrentTimer,
    clearCurrentTimeout,
  };
}
