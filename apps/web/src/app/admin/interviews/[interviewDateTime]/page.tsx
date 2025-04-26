'use client';
import React, { useState, useEffect } from 'react';
import { Text, Flex } from '@repo/ui';
import { dummyApplicants, dummySlots, dummyApplicantDetails } from '../data';
import { notFound, useRouter } from 'next/navigation';
import { ApplicantSliderHeader } from '@web/app/admin/interviews/[interviewDateTime]/_components/ApplicantHeader/ApplicantHeader';
import { ApplicantDetailContent } from '@web/app/admin/interviews/[interviewDateTime]/_components/ApplicantDetailContent/ApplicantDetailContent';
import * as styles from './page.css';

type Props = { params: { interviewDateTime: string } };

export default function ApplicantDetailPage({ params }: Props) {
  const router = useRouter();
  const slotId = params.interviewDateTime;

  const [current, setCurrent] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  useEffect(() => {
    setCurrent(0);
    setOpenIdx(null);
  }, [slotId]);

  const slot = dummySlots.find((s) => s.id === slotId);
  if (!slot) return notFound();

  const applicants = dummyApplicants[slotId] || [];
  if (applicants.length === 0) {
    return (
      <Text variant="xl_title_semibold" color="black">
        이 회차에 지원자가 없습니다.
      </Text>
    );
  }

  const detailsList = dummyApplicantDetails[slotId] || [];

  const currentApplicant = applicants[current]!;
  const currentDetail = detailsList.find((d) => d.id === currentApplicant.id);
  if (!currentDetail) {
    return (
      <Text variant="xl_title_semibold" color="black">
        지원자 상세 정보를 불러올 수 없습니다.
      </Text>
    );
  }

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);
  const introCount = currentDetail.selfIntroductionContent.content.length;

  return (
    <div className={styles.container}>
      <Text variant="xl_title_semibold" color="black">
        {slot.date.slice(5).replace('-', '/')} | {slot.start}~{slot.end} |{' '}
        {applicants.map((a) => a.name).join(' ')}
      </Text>

      <Flex direction="column" align="center" gap="2.4rem" justify="center">
        {/* 헤더 */}
        <ApplicantSliderHeader
          name={currentApplicant.name}
          total={applicants.length}
          current={current + 1}
          onPrev={() => setCurrent((i) => Math.max(i - 1, 0))}
          onNext={() =>
            setCurrent((i) => Math.min(i + 1, applicants.length - 1))
          }
          onViewApplication={() =>
            router.push(
              `/admin/interviews/${slotId}/applicant/${currentApplicant.id}`
            )
          }
        />

        {/* 내용 */}
        <ApplicantDetailContent
          detail={currentDetail}
          introCount={introCount}
          openIdx={openIdx}
          toggle={toggle}
        />
      </Flex>
    </div>
  );
}
