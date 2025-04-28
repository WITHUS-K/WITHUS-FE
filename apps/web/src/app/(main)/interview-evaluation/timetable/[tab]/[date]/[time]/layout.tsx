'use client';
import { ReactNode } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui';
import { notFound, useParams } from 'next/navigation';
import { Applicant, SlotItem, timetableMock } from '@web/constants/timetable';
import * as styles from './layout.css';

export default function ApplicantDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  const params = useParams();
  const tab = params.tab as string;
  const date = params.date as string;

  const rawTime = decodeURIComponent(params.time as string);
  const [startTime, endTime] = rawTime.split('-');

  const day = timetableMock.find((d) => d.date === date);
  if (!day) return notFound();

  let slot: SlotItem | undefined;
  for (const room of day.rooms) {
    const found = room.slots.find((s) => s.startTime === startTime);
    if (found) {
      slot = found;
      break;
    }
  }
  if (!slot) return notFound();

  const applicants: Applicant[] = slot.applicants;

  return (
    <>
      <Text
        variant="md2_text_medium"
        color="grayscale50"
        className={styles.container}
      >
        면접 관리 &gt; 내 면접 시간 조회 &gt; {date.slice(5).replace('-', '/')}{' '}
        {slot.startTime}~{slot.endTime}{' '}
        {applicants.map((a) => a.name).join(' ')}
      </Text>
      <Flex
        direction="column"
        width="100%"
        height="100%"
        align="center"
        marginTop="0.4rem"
      >
        {children}
      </Flex>
    </>
  );
}
