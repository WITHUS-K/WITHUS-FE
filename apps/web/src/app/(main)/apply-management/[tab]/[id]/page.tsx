'use client';
import { useParams, useRouter } from 'next/navigation';
import type { documentEvaluation as DocumentEvaluationType } from '@web/types/document-evaluation';
import { documentEvaluationDummyData } from '@web/constants/document-evaluation';
import ApplicantDetail from '@web/app/(main)/apply-management/[tab]/[id]/_components/ApplicantDetail/ApplicantDetail';
import * as styles from './page.css';
import { EvaluationScoreCard } from '@web/app/(main)/apply-management/[tab]/[id]/_components/EvaluationScoreCard/EvaluationScoreCard';
import { RelationCard } from '@web/app/(main)/apply-management/[tab]/[id]/_components/RelationCard/RelationCard';
import { EvaluationCommentCard } from '@web/app/(main)/apply-management/[tab]/[id]/_components/EvaluationCommentCard/EvaluationCommentCard';
import { DetailHeader } from '@web/app/(main)/apply-management/[tab]/[id]/_components/DetailHeader/DetailHeader';
import { Flex } from '@repo/ui/Flex';
import { useApplicationDetailQuery } from '@web/store/query/useApplicationDetailQuery';

export default function Page() {
  const { id, tab } = useParams() as { id: string; tab: string };
  const applicationId = Number(id);

  const { data, isLoading, isError } = useApplicationDetailQuery(applicationId);

  if (isError || !data) {
    return <div>지원서 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <DetailHeader tab={tab} name={data.name} />
      <Flex gap="2rem">
        <ApplicantDetail application={data} />

        <div className={styles.rightSection}>
          <EvaluationScoreCard
            evaluationType="document"
            evaluation={data.evaluations
              .filter((e) => e.criteria.type === 'DOCUMENT')
              .map((e) => ({
                evaluator: e.user.name,
                status: 'complete', // 예시: score가 null이면 대기중, 있으면 완료로 처리
                score: e.score ?? null,
                color: e.user.profileColor,
              }))}
          />

          <EvaluationScoreCard
            evaluationType="interview"
            evaluation={data.evaluations
              .filter((e) => e.criteria.type === 'INTERVIEW')
              .map((e) => ({
                evaluator: e.user.name,
                status: e.score != null ? 'complete' : 'pending',
                score: e.score ?? null,
                color: e.user.profileColor,
              }))}
          />
          <RelationCard relations={data.acquaintances.map((a) => a.name)} />
          <EvaluationCommentCard
            comments={data.documentComments.map((c) => ({
              evaluator: c.user.name,
              comment: c.content,
            }))}
          />
        </div>
      </Flex>
    </div>
  );
}
