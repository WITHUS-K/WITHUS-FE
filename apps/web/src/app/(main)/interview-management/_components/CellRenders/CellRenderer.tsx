import { SlotItem } from '@web/constants/timetable';
import AllCell from './AllCell';
import InterviewerCell from './InterviewerCell';
import ApplicantCell from './ApplicantCell';
import GuideCell from './GuideCell';

type Tab = 'all' | 'interviewer' | 'applicant' | 'guide';

interface CellRendererProps {
  row: number;
  tab: Tab;
  slotData: SlotItem[];
}

export function CellRenderer({ row, tab, slotData }: CellRendererProps) {
  const minutes = 10 * 60 + row * 30;
  const time = `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(
    minutes % 60
  ).padStart(2, '0')}`;

  const slot = slotData.find((s) => s.startTime === time);
  if (!slot) return null;

  const componentMap = {
    all: AllCell,
    interviewer: InterviewerCell,
    applicant: ApplicantCell,
    guide: GuideCell,
  };

  const Component = componentMap[tab];
  return <Component slot={slot} />;
}
