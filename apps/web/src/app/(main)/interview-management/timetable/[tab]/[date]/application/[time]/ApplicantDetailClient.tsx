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
  }); // 면접 기준 가져오기

  // Hooks는 모두 위에 호출!
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    setCurrent(0);
  }, [date, rawTime, timeSlotId]);

  // 3) 데이터가 없거나 빈 배열
  if (!apps || apps.length === 0) {
    return (
      <Text variant="xl_title_semibold" color="black">
        이 회차에 지원자가 없습니다.
      </Text>
    );
  }

  console.log('지원서', apps);

  // 이 시점부터 apps는 non-null, length ≥ 1
  const applications = apps;
  const total = applications!.length;
  const app = applications![current]!;

  const portfolioAnswer = app.documentAnswers.find((d) => !!d.fileUrl);

  console.log('파일', portfolioAnswer);
  const portfolioUrl = portfolioAnswer?.fileUrl ?? '';
  const portfolioFile = portfolioUrl
    ? {
        name: getOriginalFileName(portfolioUrl, true),
        size: portfolioAnswer?.fileSize ?? 0,
        downloadUrl: portfolioUrl,
      }
    : undefined;

  const positionName =
    recruitmentDetail?.positions?.find((p) => p.id === app.appliedPosition)
      ?.name ?? '';

  const criteriaList =
    recruitmentDetail?.interviewEvaluationCriteria?.filter(
      (c) => c.type === 'INTERVIEW' && c.positionName === positionName
    ) ?? [];

  const interviewContent = criteriaList.map((c) => {
    const reviewers = app.evaluations
      .filter((e) => e.criteria.id === c.id)
      .map((e) => ({
        name: e.user.name,
        avatar: e.user.profileImageUrl!,
        score: e.score,
      }));

    return {
      question: c.content,
      standardDetail: c.description,
      reviewers,
    };
  });

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
    ...(portfolioFile && { portfolioFile }),
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
      content: interviewContent,
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
              `/apply-management/interviews/${app.applicationId}?recruitmentId=${recruitmentId}`
            );
          }}
        />

        <ApplicantDetailContent detail={detail} />
      </Flex>
    </div>
  );
}
