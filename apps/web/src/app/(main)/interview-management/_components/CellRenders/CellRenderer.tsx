'use client';
import { SlotItem } from '@web/constants/timetable';

import AllCell from './AllCell';
import InterviewerCell from './InterviewerCell';
import ApplicantCell from './ApplicantCell';
import GuideCell from './GuideCell';
import { formatTimeByRow } from '@web/utils/time';
import { TimeSlot } from '@web/store/query/useInterviewScheduleQuery';

type Tab = 'all' | 'interviewer' | 'applicant' | 'guide';

interface CellRendererProps {
  row: number;
  tab: Tab;
  slotData: TimeSlot[];
  startHour: number;
  interval: number;
}

const componentMap = {
  all: AllCell,
  interviewer: InterviewerCell,
  applicant: ApplicantCell,
  guide: GuideCell,
};

export function CellRenderer({
  row,
  tab,
  slotData,
  startHour,
  interval,
}: CellRendererProps) {
  // 반드시 타임테이블과 같은 startHour/interval을 넘겨주세요!
  const time = formatTimeByRow(row, startHour, interval);
  const slot = slotData.find((s) => s.startTime === time);
  if (!slot) return null;
  const Component = componentMap[tab];
  return <Component slot={slot} />;
}
