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
