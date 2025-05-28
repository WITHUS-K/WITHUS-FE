// app/(main)/interview-management/timetable/[tab]/[date]/application/[time]/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Text, Flex } from '@repo/ui';
import {
  notFound,
  useParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { pageContainer } from './page.css';
import { useTimeSlotApplicationsQuery } from '@web/store/query/useTimeSlotApplicationsQuery';
import { ApplicantSliderHeader } from '@web/app/(main)/interview-management/_components/ApplicantHeader/ApplicantHeader';
import { ApplicantDetailContent } from '@web/app/(main)/interview-management/_components/ApplicantDetailContent/ApplicantDetailContent';
import { Applicant } from '@web/constants/timetable';
import { getOriginalFileName } from '@web/utils/file';

export default function ApplicantDetailPage() {
  const router = useRouter();
  const params = useParams();
  const sp = useSearchParams();

  const tab = params.tab as string;
  const date = params.date as string;
  const rawTime = decodeURIComponent(params.time as string);
  const [startTime, endTime] = rawTime.split('-');

  const timeSlotId = Number(sp.get('timeSlotId'));
  const {
    data: apps,
    isLoading,
    isError,
  } = useTimeSlotApplicationsQuery(timeSlotId);

  // Hooks는 모두 위에 호출!
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    setCurrent(0);
  }, [date, rawTime, timeSlotId]);

  // 2) 에러 발생
  if (isError) {
    return <Text>지원자 정보를 불러오는 중 오류가 발생했습니다.</Text>;
  }
  // 3) 데이터가 없거나 빈 배열
  if (!apps || apps.length === 0) {
    return (
      <Text variant="xl_title_semibold" color="black">
        이 회차에 지원자가 없습니다.
      </Text>
    );
  }

  // 이 시점부터 apps는 non-null, length ≥ 1
  const applications = apps;
  const total = applications.length;
  const app = applications[current]!;

  const portfolioUrl = apps?.[current]?.documentAnswers.find(
    (d) => d.fileUrl
  )?.fileUrl;

  const detail: Applicant = {
    id: app.applicationId.toString(),
    name: app.name,

    selfIntroductionContent: {
      title: '자기소개서',
      content: app.documentAnswers.map((d) => ({
        question: d.questionTitle,
        standardDetail: d.answerText,
        questionType: d.questionType,
      })),
    },
    portfolioFile: {
      name: getOriginalFileName(portfolioUrl!),
      size: 10 * 1024 * 1024,
      downloadUrl: portfolioUrl || '',
    },
    interviewQuestions: app.interviewQuestions.map((q) => ({
      question: q.content,
      src: q.user.profileImageUrl!,
      alt: q.user.name,
      name: q.user.name,
    })),
    docsComments: app.documentComments.map((c) => ({
      comment: c.content,
      user: {
        name: c.user.name,
        src: c.user.profileImageUrl!,
        alt: c.user.name,
      },
    })),
    interviewComments: app.interviewComments.map((c) => ({
      comment: c.content,
      user: {
        name: c.user.name,
        src: c.user.profileImageUrl!,
        alt: c.user.name,
      },
    })),
    interviewContent: {
      title: '면접 평가',
      content: app.evaluations.map((e) => ({
        question: e.criteria.content,
        standard: `점수: ${e.score}`,
        standardDetail: '', // leave empty or fill with additional info
        reviewers: [
          {
            name: e.user.name,
            avatar: e.user.profileImageUrl!,
            score: e.score,
          },
        ],
      })),
    },
  };

  return (
    <div className={pageContainer}>
      <Text variant="xl_title_semibold" color="black">
        {date.slice(5).replace('-', '/')} | {startTime}~{endTime} |{' '}
        {applications!.map((a) => a.name).join(', ')}
      </Text>

      <Flex direction="column" align="center" gap="2.4rem" width="100%">
        <ApplicantSliderHeader
          name={app.name}
          total={total}
          current={current + 1}
          onPrev={() => setCurrent((i) => Math.max(i - 1, 0))}
          onNext={() => setCurrent((i) => Math.min(i + 1, total - 1))}
          onViewApplication={() => {
            router.push(
              `/interview-management/application/${app.applicationId}`
            );
          }}
        />

        <ApplicantDetailContent detail={detail} />
      </Flex>
    </div>
  );
}
