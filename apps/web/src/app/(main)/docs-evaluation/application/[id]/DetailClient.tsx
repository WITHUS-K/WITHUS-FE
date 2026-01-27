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
import { useToggleAcquaintanceMutation } from '@web/store/mutation/useToggleAcquaintanceMutation';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';
import { useToast } from '@repo/ui/hooks';

export default function DetailClient() {
  const router = useRouter();
  const params = useParams();
  const applicationId = Number(params.id);

  const searchParams = useSearchParams();
  const recruitmentId = Number(searchParams.get('recruitmentId'));

  const {
    data: application,
    isLoading,
    isError,
  } = useApplicationDetailQuery({ applicationId });
  const { userId: myUserId } = getClientSideTokens();
  console.log('사용자', application);
  const [isRelation, setIsRelation] = useState(false);
  const toast = useToast();
  
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

  const mutation = useBulkEvaluationsMutation({
    applicationId,
    recruitmentId,
    page: 0,
    size: 9,
    evaluationStatus: 'ALL',
    keyword: '',
  });

  const average = application?.documentAverageScore;

  const allCriteria = application?.documentEvaluationCriterias ?? [];

  const appliedPosition = application?.appliedPosition; // 예: "1", "2" 등

  // 지원자의 포지션과 일치하는 것만 필터
  const criteriaList = allCriteria.filter(
    (c) => c.organizationRoleName === appliedPosition
  );

  // Evaluation 리스트 생성
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
    // 보낼 페이로드 생성
    const payload = {
      applicationId,
      evaluations: evaluationList.map((e, idx) => ({
        criteriaId: e.criteria.id,
        score: scores[idx] ?? 0,
      })),
    };

    console.log('[DocsEvaluation] handleSave payload:', payload);

    mutation.mutate(payload, {
      onSuccess: () => {
        toast.success('점수가 저장되었습니다.');
      },
      onError: () => {
        toast.error('점수 저장에 실패했습니다.');
      },
    });
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
          <EvaluationAddCommentCard commentType="DOCUMENT" comments={myComments!} myUserId={myUserId}
  onlyMine/>
        </div>
      </Flex>

      {/* 문서 평가 스코어링 */}
      <DocsEvaluation
       kind="DOCUMENT"
        average={average!}
        evaluationData={documentEvaluationData}
        scores={scores}
        onScoreChange={handleScoreChange}
        onSave={handleSave}
      />
    </div>
  );
}
