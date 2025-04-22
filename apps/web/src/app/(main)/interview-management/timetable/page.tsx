import { redirect } from 'next/navigation';
import { timetableDates } from '@web/constants/timetable';

export default function TimetableIndexPage() {
  const firstDate = timetableDates[0];
  redirect(`/interview-management/timetable/all/${firstDate}`);
}
