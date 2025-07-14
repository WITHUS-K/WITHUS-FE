'use client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
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
import {
  AdminApplicationStage,
  useUpdateApplicationsStatus,
} from '@web/store/mutation/useUpdateApplicationsStatus';

interface Props {
  tab: string;
  applicationId: number;
}

const stageMap: Record<
  string,
  'DOCUMENT' | 'INTERVIEW' | 'FINAL_PASS' | 'FAIL'
> = {
  documents: 'DOCUMENT',
  interviews: 'INTERVIEW',
  final: 'FINAL_PASS',
  rejected: 'FAIL',
};

export default function ApplicationDetailClient({ tab, applicationId }: Props) {
  const search = useSearchParams();
  const recIdStr = search.get('recruitmentId') ?? '';
  const recruitmentId = Number(recIdStr);

  const { data } = useApplicationDetailQuery({
    applicationId,
  });

  const rawStage = stageMap[tab];
  // 2) 정의되지 않았다면 잘못된 탭이므로 early return
  if (!rawStage) {
    return <div>잘못된 탭입니다: {tab}</div>;
  }
  // 3) 이 시점부터 rawStage 는 AdminApplicationStage 이므로
  const stage: AdminApplicationStage = rawStage;

  const { mutate: updateStatus } = useUpdateApplicationsStatus(
    recruitmentId,
    stage
  );

  // 버튼 핸들러
  const handleAccept = () => {
    updateStatus({
      applicationIds: [applicationId],
      stage,
      status: 'PASS',
    });
  };
  const handleReject = () => {
    updateStatus({
      applicationIds: [applicationId],
      stage,
      status: 'FAIL',
    });
  };
  console.log('관리자 지원서', data);

  data.interviewComments;
  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <DetailHeader
        tab={tab}
        name={data.name}
        status={data.status}
        onAccept={handleAccept}
        onReject={handleReject}
      />
      <Flex gap="2rem" width="100%">
        <ApplicantDetail application={data} />

        <div className={styles.rightSection}>
          <EvaluationScoreCard
            evaluationType="document"
            evaluation={data.evaluations
              .filter((e) => e.criteria.type === 'DOCUMENT')
              .map((e) => ({
                evaluator: e.user.name,
                status: 'complete',
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
            comments={(tab === 'documents'
              ? data.documentComments
              : data.interviewComments
            ).map((c) => ({
              evaluator: c.user.name,
              comment: c.content,
              profileColor: c.user.profileColor,
              profileUrl: c.user.profileImageUrl,
            }))}
          />
        </div>
      </Flex>
    </div>
  );
}
