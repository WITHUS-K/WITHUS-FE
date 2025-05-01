import { redirect } from 'next/navigation';
import { timetableDates } from '@web/constants/timetable';

export default function TimetableDatePage() {
  const firstDate = timetableDates[0];
  redirect(`/interview-evaluation/timetable/interviewer/${firstDate}`);
}
