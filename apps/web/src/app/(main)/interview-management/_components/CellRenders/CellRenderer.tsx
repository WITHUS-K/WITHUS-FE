'use client';
import { SlotItem } from '@web/constants/timetable';

import AllCell from './AllCell';
import InterviewerCell from './InterviewerCell';
import ApplicantCell from './ApplicantCell';
import GuideCell from './GuideCell';
import { formatTimeByRow } from '@web/utils/time';

type Tab = 'all' | 'interviewer' | 'applicant' | 'guide';

interface CellRendererProps {
  row: number;
  tab: Tab;
  slotData: SlotItem[];
}

const componentMap = {
  all: AllCell,
  interviewer: InterviewerCell,
  applicant: ApplicantCell,
  guide: GuideCell,
};

export function CellRenderer({ row, tab, slotData }: CellRendererProps) {
  const time = formatTimeByRow(row);
  const slot = slotData.find((s) => s.startTime === time);
  if (!slot) return null;

  const Component = componentMap[tab];
  return <Component slot={slot} />;
}
