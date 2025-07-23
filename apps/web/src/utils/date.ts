export function getDDay(deadlineStr: string): number {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  // 마감일 문자열을 ISO 형식으로 변환 ("2025.07.26" → "2025-07-26")
  const formatted = deadlineStr.replace(/\./g, '-');

  // 마감일 날짜를 KST 기준 자정 끝으로 설정 (23:59:59.999)
  const deadline = new Date(`${formatted}T23:59:59.999+09:00`);

  // 현재 날짜를 KST 기준으로 가져오기
  const now = new Date();
  const nowKst = new Date(now.getTime() + 9 * 60 * 60 * 1000);

  // 현재 날짜의 연월일만 자정으로 설정
  const todayKstMidnight = new Date(
    nowKst.getFullYear(),
    nowKst.getMonth(),
    nowKst.getDate()
  );

  // 날짜 차이 계산
  const diffTime = deadline.getTime() - todayKstMidnight.getTime();
  const diffDays = Math.ceil(diffTime / MS_PER_DAY);

  // D-DAY면 0, 이미 지났으면 음수, 아니면 D-숫자
  return diffDays;
}
