'use client';
import React, { useState, useEffect } from 'react';
import { Text, Flex } from '@repo/ui';
import * as styles from './layout.css';
import {
  notFound,
  useParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { ApplicantSliderHeader } from '@web/app/(main)/interview-management/_components/ApplicantHeader/ApplicantHeader';
import { pageContainer } from '@web/app/(main)/interview-management/timetable/[tab]/[date]/application/[time]/page.css';
import { ApplicantInterviewForm } from '@web/app/(main)/interview-evaluation/_components/ApplicantInterviewForm/ApplicantInterviewForm';
import { useTimeSlotApplicationsQuery } from '@web/store/query/useTimeSlotApplicationsQuery';

export default function ApplicantDetailPage() {
  const router = useRouter();
  const params = useParams();
  const tab = params.tab as string;

  const timeSlotId = Number(params.id);
  const { data: applicants = [], isLoading } = useTimeSlotApplicationsQuery({
    timeSlotId,
  });

  const [current, setCurrent] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    setCurrent(0);
    setOpenIdx(null);
  }, [tab, timeSlotId]);

  console.log('지원서', applicants);

  if (!timeSlotId || applicants.length === 0) {
    return <></>;
  }

  const applicant = applicants[current]!;
  const { date, startTime, endTime } = applicant;
  const formattedDate = date.slice(5).replace('.', '/').replace('.', '/');

  return (
    <>
      <Text
        variant="md2_text_medium"
        color="grayscale50"
        className={styles.container}
      >
        면접 관리 &gt; 내 면접 시간 조회 &gt; {formattedDate} {startTime}~
        {endTime}
      </Text>
      <Flex
        direction="column"
        width="100%"
        height="100%"
        align="center"
        marginTop="0.4rem"
        paddingBottom="10rem"
      >
        <div className={pageContainer}>
          <Text variant="xl_title_semibold" color="black">
            {date.slice(5).replace('-', '/')} | {startTime}~{endTime} |{' '}
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
              isOtherUser={false}
            />

            <ApplicantInterviewForm detail={applicant} />
          </Flex>
        </div>
      </Flex>
    </>
  );
}
