'use client';

import { SlotItem } from '@web/constants/timetable';

import InterviewerCell from './InterviewerCell';
import GuideCell from './GuideCell';

export type Tab = 'interviewer' | 'guide';

export interface CellRendererProps {
  row: number;
  tab: Tab;
  slotData: SlotItem[];
}

export function CellRenderer({ row, tab, slotData }: CellRendererProps) {
  const minutes = 10 * 60 + row * 30;
  const hh = Math.floor(minutes / 60);
  const mm = minutes % 60;
  const time = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;

  const slot = slotData.find((s) => s.startTime === time);
  if (!slot) return null;

  if (tab === 'interviewer') {
    return <InterviewerCell slot={slot} />;
  }

  // guide 탭
  return <GuideCell slot={slot} />;
}
