'use client';
import React, { useState, useEffect } from 'react';
import { Text, Flex } from '@repo/ui';
import { notFound, useParams, useRouter } from 'next/navigation';
import { timetableMock, SlotItem, Applicant } from '@web/constants/timetable';
import { ApplicantSliderHeader } from '@web/app/(main)/interview-management/_components/ApplicantHeader/ApplicantHeader';
import { ApplicantDetailContent } from '@web/app/(main)/interview-management/_components/ApplicantDetailContent/ApplicantDetailContent';
import { pageContainer } from '@web/app/(main)/interview-management/timetable/[tab]/[date]/[time]/page.css';

export default function ApplicantDetailPage() {
  const router = useRouter();
  const params = useParams();
  const tab = params.tab as string;
  const date = params.date as string;

  const rawTime = decodeURIComponent(params.time as string);
  const [startTime, endTime] = rawTime.split('-');

  const [current, setCurrent] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  useEffect(() => {
    setCurrent(0);
    setOpenIdx(null);
  }, [tab, date, startTime, endTime]);

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
  if (applicants.length === 0) {
    return (
      <Text variant="xl_title_semibold" color="black">
        이 회차에 지원자가 없습니다.
      </Text>
    );
  }

  const applicant = applicants[current]!;
  const introCount = applicant.selfIntroductionContent.content.length;

  return (
    <div className={pageContainer}>
      <Text variant="xl_title_semibold" color="black">
        {date.slice(5).replace('-', '/')} | {slot.startTime}~{slot.endTime} |{' '}
        {applicants.map((a) => a.name).join(' ')}
      </Text>

      <Flex
        direction="column"
        align="center"
        gap="2.4rem"
        justify="center"
        width="100%"
      >
        <ApplicantSliderHeader
          name={applicant.name}
          total={applicants.length}
          current={current + 1}
          onPrev={() => setCurrent((i) => Math.max(i - 1, 0))}
          onNext={() =>
            setCurrent((i) => Math.min(i + 1, applicants.length - 1))
          }
          onViewApplication={() => router.push(`/`)}
        />

        <ApplicantDetailContent
          detail={applicant}
          introCount={introCount}
          openIdx={openIdx}
          toggle={(idx) => setOpenIdx(idx)}
        />
      </Flex>
    </div>
  );
}
