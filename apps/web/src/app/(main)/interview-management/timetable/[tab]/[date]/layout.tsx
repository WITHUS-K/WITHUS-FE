'use client';

import { ReactNode } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { TabBar } from '@repo/ui/TabBar';
import DateNav from '../../../_components/DateNav/DateNav';
import { timetableDates } from '@web/constants/timetable';
import { Flex } from '@repo/ui/Flex';

const TABS = ['all', 'interviewer', 'applicant', 'guide'];

export default function TimetableLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  const params = useParams();
  const tab = params.tab as string;
  const date = params.date as string;
  const time = params.time as string | undefined;

  const searchParams = useSearchParams();
  const router = useRouter();

  const currentTab = tab as string;
  const currentDate = date as string;
  const club = searchParams.get('club') ?? '';

  const handleTabChange = (nextTab: string) => {
    router.replace(
      `/interview-management/timetable/${nextTab}/${currentDate}?${searchParams}`
    );
  };

  const handleDateChange = (nextDate: string) => {
    router.replace(
      `/interview-management/timetable/${currentTab}/${nextDate}?${searchParams}`
    );
  };

  if (time) {
    return <div style={{ width: '100%' }}>{children}</div>;
  }

  return (
    <>
      <Flex
        direction="column"
        width="100%"
        height="100%"
        gap="4rem"
        marginTop="3.2rem"
        align="center"
      >
        <TabBar tabs={TABS} active={currentTab} onChange={handleTabChange} />
        <DateNav
          dates={timetableDates}
          active={currentDate}
          onChange={handleDateChange}
        />
      </Flex>
      <div>{children}</div>
      {modal}
    </>
  );
}
