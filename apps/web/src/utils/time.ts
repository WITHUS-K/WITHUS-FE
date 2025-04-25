// 인덱스를 시:분 문자열로 변환
export function rowToTime(
  row: number,
  startHour: number,
  interval: number
): string {
  const totalMinutes = startHour * 60 + row * interval;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

// 선택된 row 범위를 시:분 시작/끝 문자열로 변환
export function rangeToTimeRange(
  range: { start: number; end: number },
  startHour: number,
  interval: number
): { startTime: string; endTime: string } {
  const startTime = rowToTime(range.start, startHour, interval);

  const endTime = rowToTime(range.end + 1, startHour, interval);
  return { startTime, endTime };
}

/**
 * "HH:MM" 문자열을 분 단위 숫자로 변환
 */
export function parseToMin(time: string): number {
  const [hStr = '0', mStr = '0'] = time.split(':');
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  return (isNaN(h) ? 0 : h) * 60 + (isNaN(m) ? 0 : m);
}

/**
 * row 인덱스에 따라 baseHour 시점부터 interval 분 단위의 시:분 문자열을 반환
 */
export function formatTimeByRow(
  row: number,
  baseHour = 10,
  interval = 30
): string {
  const totalMinutes = baseHour * 60 + row * interval;
  const hh = Math.floor(totalMinutes / 60);
  const mm = totalMinutes % 60;
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}
