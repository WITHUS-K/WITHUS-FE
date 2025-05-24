'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { documentEvaluationDummyDataForUser } from '@web/constants/document-evaluation';
import ApplicantDetail from '@web/app/(main)/apply-management/[tab]/[id]/_components/ApplicantDetail/ApplicantDetail';
import { EvaluationCommentCard } from '@web/app/(main)/apply-management/[tab]/[id]/_components/EvaluationCommentCard/EvaluationCommentCard';
import { Flex } from '@repo/ui/Flex';
import { DocsDetailHeader } from '@web/app/(main)/docs-evaluation/(tabs)/[tab]/[id]/_components/DocsDetailHeader/DocsDetailHeader';
import { DocsEvaluation } from '@web/app/(main)/docs-evaluation/(tabs)/[tab]/[id]/_components/DocsEvaluation/DocsEvaluation';
import * as styles from './page.css';

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const tab = params.tab as string;
  const id = params.id as string;

  const evaluation = documentEvaluationDummyDataForUser;
  const applicant = evaluation.applicantList.find((a) => a.id === Number(id));

  const [isRelation, setIsRelation] = useState(false);

  if (!applicant) {
    router.push('/404');
    return null;
  }

  const [scores, setScores] = useState<number[]>(() =>
    Array(applicant.documentEvaluationList.evaluationList.length).fill(5)
  );

  const handleScoreChange = (name: string, next: number) => {
    const idx = parseInt(name.split('-')[1] as string, 10);
    setScores((prev) => {
      const copy = [...prev];
      copy[idx] = next;
      return copy;
    });
  };

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <DocsDetailHeader
        isChecked={isRelation}
        onToggle={() => setIsRelation((prev) => !prev)}
        name={applicant.basicInfo.name}
      />

      <Flex gap="2rem">
        <ApplicantDetail evaluation={evaluation} applicant={applicant} />

        <div className={styles.rightSection}>
          <EvaluationCommentCard comments={applicant.comments} />
        </div>
      </Flex>

      {/* 문서 평가 스코어링 */}
      <DocsEvaluation
        evaluationList={applicant.documentEvaluationList}
        scores={scores}
        onScoreChange={handleScoreChange}
      />
    </div>
  );
}
