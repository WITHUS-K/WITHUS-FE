'use client';
import { useParams, useRouter } from 'next/navigation';
import type { documentEvaluation as DocumentEvaluationType } from '@web/types/document-evaluation';
import { documentEvaluationDummyData } from '@web/constants/document-evaluation';
import ApplicantDetail from '@web/app/(main)/apply-management/[tab]/[id]/_components/ApplicantDetail/ApplicantDetail';
import * as styles from './page.css';
import { EvaluationScoreCard } from '@web/app/(main)/apply-management/[tab]/[id]/_components/EvaluationScoreCard/EvaluationScoreCard';
import { RelationCard } from '@web/app/(main)/apply-management/[tab]/[id]/_components/RelationCard/RelationCard';
import { EvaluationCommentCard } from '@web/app/(main)/apply-management/[tab]/[id]/_components/EvaluationCommentCard/EvaluationCommentCard';

export default function Page() {
  const router = useRouter();

  const params = useParams();
  const tab = params.tab as string;
  const id = params.id as string;
  const evaluation = documentEvaluationDummyData as DocumentEvaluationType;
  const applicant = evaluation.applicantList.find((a) => a.id === Number(id));

  if (!applicant) {
    router.push('/404');
    return null;
  }

  return (
    <div className={styles.container}>
      <ApplicantDetail
        tab={tab}
        evaluation={evaluation}
        applicant={applicant}
      />

      <div className={styles.rightSection}>
        <EvaluationScoreCard
          evaluationType="document"
          evaluation={applicant.documentEvaluation}
        />
        <EvaluationScoreCard
          evaluationType="interview"
          evaluation={applicant.interviewEvaluation}
        />
        <RelationCard relations={applicant.relations} />
        <EvaluationCommentCard comments={applicant.comments} />
      </div>
    </div>
  );
}
