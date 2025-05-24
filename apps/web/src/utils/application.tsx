import { format, isValid, parse } from 'date-fns';
import { ko } from 'date-fns/locale';

export const TIME_STEP: Record<'15분' | '30분' | '1시간', number> = {
  '15분': 15,
  '30분': 30,
  '1시간': 60,
};

export function safeFormatDotDate(
  dotDate?: string,
  pattern = 'yyyy.MM.dd'
): string {
  if (!dotDate) return '';
  const dt = parse(dotDate, 'yyyy.MM.dd', new Date(), { locale: ko });
  if (!isValid(dt)) return '';
  return format(dt, pattern, { locale: ko });
}
