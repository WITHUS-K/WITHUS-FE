'use client';

import { SlotItem } from '@web/constants/timetable';

import InterviewerCell from './InterviewerCell';
import GuideCell from './GuideCell';
import { formatTimeByRow } from '@web/utils/time';

export type Tab = 'interviewer' | 'guide';

export interface CellRendererProps {
  date: string;
  row: number;
  tab: Tab;
  slotData: SlotItem[];
  startHour: number;
  interval: number;
}

export function CellRenderer({
  date,
  row,
  tab,
  slotData,
  startHour,
  interval,
}: CellRendererProps) {
  const time = formatTimeByRow(row, startHour, interval);

  const slot = slotData.find((s) => s.startTime === time);
  if (!slot) return null;

  if (tab === 'interviewer') {
    return <InterviewerCell slot={slot} date={date} />;
  }
  return <GuideCell slot={slot} />;
}
