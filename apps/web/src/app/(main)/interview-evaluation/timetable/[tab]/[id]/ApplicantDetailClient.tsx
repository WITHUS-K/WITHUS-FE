'use client';
import React, { useState, useEffect } from 'react';
import { Text, Flex } from '@repo/ui';
import * as styles from './layout.css';
import { useParams, useRouter } from 'next/navigation';
import { ApplicantSliderHeader } from '@web/app/(main)/interview-management/_components/ApplicantHeader/ApplicantHeader';
import { pageContainer } from '@web/app/(main)/interview-management/timetable/[tab]/[date]/application/[time]/page.css';
import { ApplicantInterviewForm } from '@web/app/(main)/interview-evaluation/_components/ApplicantInterviewForm/ApplicantInterviewForm';
import { useTimeSlotApplicationsQuery } from '@web/store/query/useTimeSlotApplicationsQuery';

interface Props {
  timeSlotId: number;
}

export default function ApplicantDetailClient({ timeSlotId }: Props) {
  const router = useRouter();
  const params = useParams();
  const tab = params.tab as string;

  const { data: applicants = [], isLoading } = useTimeSlotApplicationsQuery({
    timeSlotId,
  });

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(0);
  }, [tab, timeSlotId]);

  if (isLoading) return null;
  if (applicants.length === 0) return null;

  const applicant = applicants[current];
  if (!applicant) return null;

  const { date, startTime, endTime } = applicant;
  const formattedDate = date.slice(5).replace('.', '/').replace('.', '/');

  const handleSelectApplicant = (id: number) => {
    const index = applicants.findIndex((a) => a.applicationId === id);
    if (index !== -1) {
      setCurrent(index);
    }
  };

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
              current={current + 1}
              onViewApplication={() => router.push(`/`)}
              isOtherUser={false}
              applicants={applicants.map((a) => ({
                id: a.applicationId,
                name: a.name,
                imageUrl: '',
              }))}
              currentId={applicant.applicationId}
              onSelect={handleSelectApplicant}
            />

            <ApplicantInterviewForm detail={applicant} />
          </Flex>
        </div>
      </Flex>
    </>
  );
}
