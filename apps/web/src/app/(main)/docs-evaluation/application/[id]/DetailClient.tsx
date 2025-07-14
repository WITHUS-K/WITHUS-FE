'use client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ApplicantDetail from '@web/app/(main)/apply-management/[tab]/[id]/_components/ApplicantDetail/ApplicantDetail';

import { Flex } from '@repo/ui/Flex';
import { DocsDetailHeader } from '@web/app/(main)/docs-evaluation/application/[id]/_components/DocsDetailHeader/DocsDetailHeader';
import {
  DocsEvaluation,
  EvaluationData,
} from '@web/app/(main)/docs-evaluation/application/[id]/_components/DocsEvaluation/DocsEvaluation';
import * as styles from './page.css';
import { EvaluationAddCommentCard } from './_components/EvaluationAddCommentCard/EvaluationAddCommentCard';
import {
  Evaluation,
  useApplicationDetailQuery,
} from '@web/store/query/useApplicationDetailQuery';
import { useBulkEvaluationsMutation } from '@web/store/mutation/useBulkEvaluations';
import { useUserStore } from '@web/store/state/userStore';
import { useToggleAcquaintanceMutation } from '@web/store/mutation/useToggleAcquaintanceMutation';

export default function DetailClient() {
  const router = useRouter();
  const params = useParams();
  const applicationId = Number(params.id);

  const {
    data: application,
    isLoading,
    isError,
  } = useApplicationDetailQuery({ applicationId });
  const myUserId = useUserStore.getState().userId;
  console.log('사용자', application);
  const [isRelation, setIsRelation] = useState(false);

  // 3) 서버에서 데이터 로드 완료되면 초기화
  useEffect(() => {
    if (application) {
      const rel = application.acquaintances.some((a) => a.userId === myUserId);
      setIsRelation(rel);
    }
  }, [application, myUserId]);

  const toggleAcq = useToggleAcquaintanceMutation(applicationId);

  const handleToggle = () => {
    toggleAcq.mutate(undefined, {
      onSuccess: (acquainted: boolean) => {
        console.log('API 응답 acquainted:', acquainted);
        setIsRelation(acquainted);
      },
      onError: (err) => {
        console.error('토글 실패:', err);
      },
    });
  };

  const [scores, setScores] = useState<number[]>([]);

  // 3) Bulk Mutation
  const mutation = useBulkEvaluationsMutation(applicationId);

  const average = application?.documentAverageScore;

  const allCriteria = application?.documentEvaluationCriterias ?? [];

  // 2) 지원자의 appliedPosition
  const appliedPosition = application?.appliedPosition; // 예: "1", "2" 등

  // 3) 공통(null) 또는 지원자의 포지션과 일치하는 것만 필터
  const criteriaList = allCriteria.filter(
    (c) => c.positionName === null || c.positionName === appliedPosition
  );

  // 4) Evaluation 리스트 생성
  const evaluationList: Evaluation[] = criteriaList.map((c) => ({
    id: c.id,
    score: c.score ?? 5,
    criteria: {
      ...c,
      type: c.type as 'DOCUMENT' | 'INTERVIEW',
    },
    user: { userId: 0, name: '', profileColor: '' },
  }));

  const myComments = application?.documentComments.filter(
    (c) => c.user.userId === myUserId
  );

  useEffect(() => {
    if (evaluationList.length > 0) {
      setScores(evaluationList.map((e) => e.score ?? 5));
    }
  }, [evaluationList.length]);

  const handleSave = () => {
    // 1) 보낼 페이로드 생성
    const payload = {
      applicationId,
      evaluations: evaluationList.map((e, idx) => ({
        criteriaId: e.criteria.id,
        score: scores[idx] ?? 0,
      })),
    };

    // 2) 콘솔에 찍기
    console.log('[DocsEvaluation] handleSave payload:', payload);

    // 3) 실제 호출
    mutation.mutate(payload);
  };

  //console.log('지원서 디테일', application);

  const handleScoreChange = (name: string, next: number) => {
    const idx = Number(name.split('-')[1]);
    setScores((prev) => {
      const copy = [...prev];
      copy[idx] = next;
      return copy;
    });
  };

  // 6) DocsEvaluation에 넘길 평가 리스트 포맷
  // DocsEvaluation에 넘길 데이터

  const evaluationType =
    application?.documentScaleTypeKey === '점수제 평가' ? 'score' : 'level';

  const documentEvaluationData: EvaluationData = {
    evaluationType,
    evaluationList,
  };

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <DocsDetailHeader
        isChecked={isRelation}
        onToggle={handleToggle}
        name={application.name}
      />

      <Flex gap="2rem">
        <ApplicantDetail application={application} />
        <div className={styles.rightSection}>
          <EvaluationAddCommentCard comments={myComments!} />
        </div>
      </Flex>

      {/* 문서 평가 스코어링 */}
      <DocsEvaluation
        average={average!}
        evaluationData={documentEvaluationData}
        scores={scores}
        onScoreChange={handleScoreChange}
        onSave={handleSave}
      />
    </div>
  );
}
