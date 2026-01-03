// app/(main)/interview-management/timetable/[tab]/[date]/application/[time]/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Text, Flex } from '@repo/ui';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { pageContainer } from './page.css';
import { useTimeSlotApplicationsQuery } from '@web/store/query/useTimeSlotApplicationsQuery';
import { ApplicantSliderHeader } from '@web/app/(main)/interview-management/_components/ApplicantHeader/ApplicantHeader';
import { ApplicantDetailContent } from '@web/app/(main)/interview-management/_components/ApplicantDetailContent/ApplicantDetailContent';
import { Applicant } from '@web/constants/timetable';
import { getOriginalFileName } from '@web/components/FileUpload/FileUpload';
import { useRecruitmentDetailQuery } from '@web/store/query/useRecruitmentDetailQuery';
import { ApplicantItem } from '@web/app/(main)/interview-management/_components/ApplicantToggle/ApplicantToggle';

export default function ApplicantDetailClient() {
  const router = useRouter();
  const params = useParams();
  const sp = useSearchParams();

  const tab = params.tab as string;
  const date = params.date as string;
  const rawTime = decodeURIComponent(params.time as string);
  const [startTime, endTime] = rawTime.split('-');

  const timeSlotId = Number(sp.get('timeSlotId'));
  const recruitmentId = Number(sp.get('recruitmentId'));
  const { data: apps } = useTimeSlotApplicationsQuery({ timeSlotId });

  const { data: recruitmentDetail } = useRecruitmentDetailQuery({
    recruitmentId,
  });

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(0);
  }, [date, rawTime, timeSlotId, apps?.length]);

  if (!apps || apps.length === 0) {
    return (
      <Text variant="xl_title_semibold" color="black">
        이 회차에 지원자가 없습니다.
      </Text>
    );
  }

  const applications = apps;
  const app = applications[current];

  if (!app) {
    return null;
  }

  const toggleApplicants: ApplicantItem[] = applications.map((a) => {
    const imgUrl =
      (a as any).profileImageUrl || 'https://via.placeholder.com/150?text=User';

    return {
      id: a.applicationId,
      name: a.name,
      imageUrl: imgUrl,
    };
  });

  const handleToggleSelect = (selectedId: number) => {
    const index = applications.findIndex((a) => a.applicationId === selectedId);
    if (index !== -1) {
      setCurrent(index);
    }
  };
  const portfolioAnswer = app.documentAnswers.find((d) => !!d.fileUrl);
  const portfolioUrl = portfolioAnswer?.fileUrl ?? '';
  const portfolioFile = portfolioUrl
    ? {
        name: getOriginalFileName(portfolioUrl, true),
        size: portfolioAnswer?.fileSize ?? 0,
        downloadUrl: portfolioUrl,
      }
    : undefined;

  const detail: Applicant = {
    id: app.applicationId.toString(),
    name: app.name,
    selfIntroductionContent: { title: '자기소개서', content: [] },
    ...(portfolioFile && { portfolioFile }),
    interviewQuestions: [],
    docsComments: [],
    interviewComments: [],
    interviewContent: { title: '면접 평가', content: [] },
  };

  return (
    <div className={pageContainer}>
      <Text variant="xl_title_semibold" color="black">
        {date.slice(5).replace('-', '/')} | {startTime}~{endTime} |{' '}
        {applications.map((a) => a.name).join(', ')}
      </Text>

      <Flex direction="column" align="center" gap="2.4rem" width="100%">
        <ApplicantSliderHeader
          name={app.name}
          current={current + 1}
          onViewApplication={() => {
            router.push(
              `/apply-management/interviews/${app.applicationId}?recruitmentId=${recruitmentId}`
            );
          }}
          applicants={toggleApplicants}
          currentId={app.applicationId}
          onSelect={handleToggleSelect}
        />
        <ApplicantDetailContent detail={detail} />
      </Flex>
    </div>
  );
}
