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
import { useApplicationDetailQuery } from '@web/store/query/useApplicationDetailQuery';
import { CompletedEvaluator } from '@web/constants/document';
import * as styles from './page.css';
import { RelationCard } from '@web/app/(main)/apply-management/[tab]/[id]/_components/RelationCard/RelationCard';
import { EvaluationCommentCard } from '@web/app/(main)/apply-management/[tab]/[id]/_components/EvaluationCommentCard/EvaluationCommentCard';
import { EvaluationScoreCard } from '@web/app/(main)/apply-management/[tab]/[id]/_components/EvaluationScoreCard/EvaluationScoreCard';
import ApplicantDetail from '@web/app/(main)/apply-management/[tab]/[id]/_components/ApplicantDetail/ApplicantDetail';

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
  const { data: applicants = [], isLoading: listLoading } =
  useTimeSlotApplicationsQuery({ timeSlotId });

const [current, setCurrent] = useState(0);

useEffect(() => {
  setCurrent(0);
}, [timeSlotId]);

const applicant = applicants[current];
if (!applicant) return null;

const applicationId = applicant.applicationId;

// 2지원서 상세
const {
  data: data,
  isLoading: detailLoading,
  isError,
} = useApplicationDetailQuery({ applicationId });

// 모집 정보
const { data: rec, isLoading: recLoading } =
  useRecruitmentDetailQuery({ recruitmentId });

if (listLoading || detailLoading || recLoading) return null;
if (!data || !rec || isError) return null;

const documentCompletedForCard: CompletedEvaluator[] =
  (data.documentCompleted ?? []).map((c) => ({
    evaluator: {
      userId: c.evaluator.userId,
      name: c.evaluator.name,
      profileColor: c.evaluator.profileColor,
      profileImageUrl: c.evaluator.profileImageUrl ?? null,
    },
    totalScore: c.totalScore,
  }));

const interviewCompletedForCard: CompletedEvaluator[] =
  (data.interviewCompleted ?? []).map((c) => ({
    evaluator: {
      userId: c.evaluator.userId,
      name: c.evaluator.name,
      profileColor: c.evaluator.profileColor,
      profileImageUrl: c.evaluator.profileImageUrl ?? null,
    },
    totalScore: c.totalScore,
  }));

const documentEvalStatus = [
  ...(data.documentPending ?? []).map((p) => ({
    evaluator: p.name,
    status: 'pending' as const,
    score: null,
    color: p.profileColor,
  })),
  ...(data.documentCompleted ?? []).map((p) => ({
    evaluator: p.evaluator.name,
    status: 'complete' as const,
    score: null,
    color: p.evaluator.profileColor,
  })),
];

const interviewEvalStatus = [
  ...(data.interviewPending ?? []).map((p) => ({
    evaluator: p.name,
    status: 'pending' as const,
    score: null,
    color: p.profileColor,
  })),
  ...(data.interviewCompleted ?? []).map((p) => ({
    evaluator: p.evaluator.name,
    status: 'complete' as const,
    score: null,
    color: p.evaluator.profileColor,
  })),
];

const handleSelectApplicant = (id: number) => {
  const index = applicants.findIndex((a) => a.applicationId === id);
  if (index !== -1) setCurrent(index);
};


  return (
    <div className={styles.container1}>
      <Text variant="xl_title_semibold" color="black">
        {date.slice(5).replace('-', '/')} | {startTime}~{endTime} |{' '}
        {applicants.map((a) => a.name).join(', ')}
      </Text>

      <ApplicantSliderHeader
        name={applicant.name}
        current={current + 1}
        isOtherUser={false}
        applicants={applicants.map((a) => ({
          id: a.applicationId,
          name: a.name,
          imageUrl: '',
        }))}
        currentId={applicant.applicationId}
        onSelect={handleSelectApplicant}
      />

      <Flex gap="2rem" width="100%" marginTop="2.4rem">
        {/* 좌측: 지원자 상세 */}
        <ApplicantDetail
          application={data}
          scheduleMap={{}}
          interviewDuration={rec.interviewDuration}
          applicantMap={{}}
          questions={rec.applicationQuestions}
        />

        {/* 우측: 카드 영역 (완전히 동일) */}
        <div className={styles.rightSection}>
          <EvaluationScoreCard
            evaluationType="document"
            averageScore={data.documentAverageScore}
            evaluation={documentEvalStatus}
            completed={documentCompletedForCard}
          />

          <EvaluationScoreCard
            evaluationType="interview"
            averageScore={data.interviewAverageScore}
            evaluation={interviewEvalStatus}
            completed={interviewCompletedForCard}
          />

          <EvaluationCommentCard
            type="DOCUMENT_COMMENT"
            comments={data.documentComments.map((c) => ({
              evaluator: c.user.name,
              comment: c.content,
              profileColor: c.user.profileColor,
              profileUrl: c.user.profileImageUrl,
            }))}
          />

          <EvaluationCommentCard
            type="INTERVIEW_COMMENT"
            comments={data.interviewComments.map((c) => ({
              evaluator: c.user.name,
              comment: c.content,
              profileColor: c.user.profileColor,
              profileUrl: c.user.profileImageUrl,
            }))}
          />

          <EvaluationCommentCard
            type="INTERVIEW_QUESTION"
            comments={data.interviewQuestions.map((q) => ({
              evaluator: q.user.name,
              comment: q.content,
              profileColor: q.user.profileColor,
              profileUrl: q.user.profileImageUrl,
            }))}
          />

          <RelationCard
            relations={data.acquaintances.map((a) => ({
              name: a.name,
              profileColor: a.profileColor,
              profileUrl: a.profileImageUrl ?? null,
            }))}
          />
        </div>
      </Flex>
    </div>
  );
}
