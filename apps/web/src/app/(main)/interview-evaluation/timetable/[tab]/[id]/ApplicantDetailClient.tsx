'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';

import ApplicantDetail from '@web/app/(main)/apply-management/[tab]/[id]/_components/ApplicantDetail/ApplicantDetail';
import { DocsDetailHeader } from '@web/app/(main)/docs-evaluation/application/[id]/_components/DocsDetailHeader/DocsDetailHeader';

import { useTimeSlotApplicationsQuery } from '@web/store/query/useTimeSlotApplicationsQuery';
import {
  Evaluation,
  useApplicationDetailQuery,
} from '@web/store/query/useApplicationDetailQuery';

import { getClientSideTokens } from '@web/utils/getClientSideTokens';
import { useToggleAcquaintanceMutation } from '@web/store/mutation/useToggleAcquaintanceMutation';
import { useToast } from '@repo/ui/hooks';

import {
  DocsEvaluation,
  EvaluationData,
} from '@web/app/(main)/docs-evaluation/application/[id]/_components/DocsEvaluation/DocsEvaluation';
import { useBulkEvaluationsMutation } from '@web/store/mutation/useBulkEvaluations';

import * as styles from './layout.css';

import { EvaluationScoreCard } from '@web/app/(main)/apply-management/[tab]/[id]/_components/EvaluationScoreCard/EvaluationScoreCard';
import { EvaluationCommentCard } from '@web/app/(main)/apply-management/[tab]/[id]/_components/EvaluationCommentCard/EvaluationCommentCard';
import { RelationCard } from '@web/app/(main)/apply-management/[tab]/[id]/_components/RelationCard/RelationCard';
import { CompletedEvaluator } from '@web/constants/document';

// ✅ 추가
import { useRecruitmentDetailQuery } from '@web/store/query/useRecruitmentDetailQuery';
import { EvaluationAddCommentCard } from '@web/app/(main)/docs-evaluation/application/[id]/_components/EvaluationAddCommentCard/EvaluationAddCommentCard';
import { EvaluationAddInterviewQuestionCard } from '../../../_components/InterviewQuestions/EvaluationAddInterviewQuestionCard';
import { EvaluationHeader } from '../../../_components/EvaluationHeader/EvaluationHeader';
import { ApplicantSliderHeader } from '@web/app/(main)/interview-management/_components/ApplicantHeader/ApplicantHeader';
import { style } from '@vanilla-extract/css';

interface Props {
  timeSlotId: number;
}

export default function ApplicantDetailClient({ timeSlotId }: Props) {
  const router = useRouter();
  const params = useParams();
  const sp = useSearchParams();

  const tab = params.tab as string;
  const recruitmentId = Number(sp.get('recruitmentId'));
  const { userId: myUserId } = getClientSideTokens();

  // 1) 타임슬롯 지원서 목록
  const { data: applicants = [], isLoading: appsLoading } =
    useTimeSlotApplicationsQuery({ timeSlotId });

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(0);
  }, [tab, timeSlotId]);

  const applicant = applicants[current];
  if (!applicant) return null;
  const applicationId = applicants[current]?.applicationId;

  // 2) 선택된 applicationId로 상세 조회
  const {
    data: application,
    isLoading: detailLoading,
    isError,
  } = useApplicationDetailQuery({ applicationId: Number(applicationId) });

  // ✅ 2-1) recruitmentDetail로 “평가기준” 가져오기 (ApplicantInterviewForm이랑 동일)
  const { data: recruitmentDetail, isLoading: recLoading } =
    useRecruitmentDetailQuery({ recruitmentId });

  const toast = useToast();

  // 3) 관계 토글
  const [isRelation, setIsRelation] = useState(false);
  useEffect(() => {
    if (!application) return;
    const rel = application.acquaintances.some((a) => a.userId === myUserId);
    setIsRelation(rel);
  }, [application, myUserId]);

  const toggleAcq = useToggleAcquaintanceMutation(Number(applicationId));
  const handleToggle = () => {
    if (!applicationId) return;
    toggleAcq.mutate(undefined, {
      onSuccess: (acquainted: boolean) => setIsRelation(acquainted),
    });
  };

  // =========================
  // ✅ 면접 평가: recruitmentDetail 기준 + application.evaluations로 내 점수 매칭
  // =========================

  // 평균(하단 카드에 보여줄 값)
  const average = application?.interviewAverageScore ?? '0';

  // 지원자 포지션(서버에서 문자열/아이디 형태면 너희 프로젝트 타입에 맞게 맞춰줘)
  const positionName = application?.appliedPosition;

  // recruitmentDetail의 positions에서 지원자의 포지션 이름 찾기 (ApplicantInterviewForm 동일)

  
  // ✅ 해당 포지션의 INTERVIEW 평가기준만
  const interviewCriteria =
    recruitmentDetail?.interviewEvaluationCriteria.filter(
      (c) => c.type === 'INTERVIEW' && c.organizationRoleName === positionName
    ) ?? [];

  // ✅ “내가 이미 준 점수”는 application.evaluations에서 찾기 (없으면 null/기본값)
  const mergedCriteria = useMemo(() => {
    const evals = application?.evaluations ?? [];
    return interviewCriteria.map((c) => {
      const existingMine = evals.find(
        (e) => e.criteria.id === c.id && e.user.userId === myUserId
      );

      return {
        id: c.id,
        content: c.content,
        description: c.description,
        score: existingMine?.score ?? null,
        rawCriteria: c,
      };
    });
  }, [interviewCriteria, application?.evaluations, myUserId]);

  // DocsEvaluation이 기대하는 Evaluation[] 형태로 변환
  const evaluationList: Evaluation[] = useMemo(() => {
    return mergedCriteria.map((c) => ({
      id: c.id,
      score: c.score ?? 5, // ✅ 초기 기본값(원하면 null/0으로)
      criteria: {
        ...c.rawCriteria,
        type: 'INTERVIEW',
      },
      user: { userId: myUserId, name: '', profileColor: '' },
    }));
  }, [mergedCriteria, myUserId]);

  const [scores, setScores] = useState<number[]>([]);
 
  useEffect(() => {
    if (!application) return;
  
    setScores(
      evaluationList.map((e) => e.score ?? 5)
    );
  }, [applicationId, evaluationList]);

  const handleScoreChange = (name: string, next: number) => {
    const idx = Number(name.split('-')[1]);
    setScores((prev) => {
      const copy = [...prev];
      copy[idx] = next;
      return copy;
    });
  };

  // ✅ 저장 API는 bulk로 쓴다고 했으니 그대로
  const mutation = useBulkEvaluationsMutation({
    applicationId: Number(applicationId),
    recruitmentId,
    page: 0,
    size: 9,
    evaluationStatus: 'ALL',
    keyword: '',
  });

  const handleSave = () => {
    if (!applicationId) return;

    const payload = {
      applicationId: Number(applicationId),
      evaluations: evaluationList.map((e, idx) => ({
        criteriaId: e.criteria.id,
        score: scores[idx] ?? 0,
      })),
    };

    mutation.mutate(payload, {
      onSuccess: () => toast.success('점수가 저장되었습니다.'),
      onError: () => toast.error('점수 저장에 실패했습니다.'),
    });
  };

  // 스케일 키도 “면접용” 사용
  console.log("인터뷰 타입", recruitmentDetail.interviewScaleType)
  const evaluationType =
    recruitmentDetail?.interviewScaleType === 'SCORE' ? 'score' : 'level';

  const interviewEvaluationData: EvaluationData = {
    evaluationType,
    evaluationList,
  };

  // =========================
  // ✅ 오른쪽 카드 데이터(기존 재사용) - 네 코드 유지
  // =========================

  const documentCompletedForCard: CompletedEvaluator[] = (application?.documentCompleted ?? []).map((c) => ({
    evaluator: {
      userId: c.evaluator.userId,
      name: c.evaluator.name,
      profileColor: c.evaluator.profileColor,
      profileImageUrl: c.evaluator.profileImageUrl ?? null,
    },
    totalScore: c.totalScore,
  }));

  const interviewCompletedForCard: CompletedEvaluator[] = (application?.interviewCompleted ?? []).map((c) => ({
    evaluator: {
      userId: c.evaluator.userId,
      name: c.evaluator.name,
      profileColor: c.evaluator.profileColor,
      profileImageUrl: c.evaluator.profileImageUrl ?? null,
    },
    totalScore: c.totalScore,
  }));

  const documentEvalStatus = [
    ...(application?.documentPending ?? []).map((p) => ({
      evaluator: p.name,
      status: 'pending' as const,
      score: null,
      color: p.profileColor,
    })),
    ...(application?.documentCompleted ?? []).map((p) => ({
      evaluator: p.evaluator.name,
      status: 'complete' as const,
      score: null,
      color: p.evaluator.profileColor,
    })),
  ];

  const interviewEvalStatus = [
    ...(application?.interviewPending ?? []).map((p) => ({
      evaluator: p.name,
      status: 'pending' as const,
      score: null,
      color: p.profileColor,
    })),
    ...(application?.interviewCompleted ?? []).map((p) => ({
      evaluator: p.evaluator.name,
      status: 'complete' as const,
      score: null,
      color: p.evaluator.profileColor,
    })),
  ];

  // 로딩/에러 처리
  if (appsLoading || detailLoading || recLoading) return null;
  if (isError || !applicationId || !application || !recruitmentDetail) return null;

  // 타임슬롯 헤더 표시(기존처럼)
  const date = applicants[current]?.date ?? '';
  const startTime = applicants[current]?.startTime ?? '';
  const endTime = applicants[current]?.endTime ?? '';
  const formattedDate = date ? date.slice(5).replace('.', '/').replace('.', '/') : '';

  const handleSelectApplicant = (id: number) => {
    const index = applicants.findIndex((a) => a.applicationId === id);
    if (index !== -1) setCurrent(index);
  };

  return (
    <div className={styles.container1}>
      <Text variant="md2_text_medium" color="grayscale50" className={styles.container}>
        면접 관리 &gt; 내 면접 시간 조회 &gt; {formattedDate} {startTime}~{endTime}
      </Text>

      <Text variant="xl_title_semibold" color="black" style={{marginTop: '0.4rem'}}>
            {date.slice(5).replace('-', '/')} | {startTime}~{endTime} |{' '}
            {applicants.map((a) => a.name).join(' ')}
          </Text>


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

         


      <Flex gap="2rem" width="100%" marginTop='2.4rem' marginBottom='2.4rem'>
        <ApplicantDetail application={application} />

        <div className={styles.rightSection}>
          <EvaluationScoreCard
            evaluationType="document"
            averageScore={application.documentAverageScore}
            evaluation={documentEvalStatus}
            completed={documentCompletedForCard}
            showStatus={false}
          />

          <EvaluationCommentCard
            type="DOCUMENT_COMMENT"
            comments={application.documentComments
              .filter((c) => c.user.userId === myUserId) // ✅ 내 코멘트만
              .map((c) => ({
                evaluator: c.user.name,
                comment: c.content,
                profileColor: c.user.profileColor,
                profileUrl: c.user.profileImageUrl,
              }))}
          />

<EvaluationAddCommentCard
    commentType="INTERVIEW"
    comments={application.interviewComments}
    myUserId={myUserId}
    onlyMine={true} 
    applicationId={Number(applicationId)}  
  />

          <EvaluationAddInterviewQuestionCard
  questions={application.interviewQuestions}
  myUserId={myUserId}
  timeSlotId={timeSlotId}
  applicationId={Number(applicationId)}  
/>

        </div>
      </Flex>

      {/* ✅ 하단: 면접 평가 스코어링 */}
      <DocsEvaluation
        kind="INTERVIEW"
        average={String(average)}
        evaluationData={interviewEvaluationData}
        scores={scores}
        onScoreChange={handleScoreChange}
        onSave={handleSave}
      />
    </div>
  );
}
