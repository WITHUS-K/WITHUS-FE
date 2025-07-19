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
import { useRecruitmentDetailQuery } from '@web/store/query/useRecruitmentDetailQuery';
import { TimeRange } from '@web/components/TimeTable/SelectableTimeTable';
import { InterviewScheduleItem } from '@web/types/application';
import { parseToMin } from '@web/utils/time';

interface Props {
  tab: string;
  applicationId: number;
  recruitmentId: number;
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

export default function ApplicationDetailClient({
  tab,
  applicationId,
  recruitmentId,
}: Props) {
  const { data: rec } = useRecruitmentDetailQuery({ recruitmentId });
  //console.log('공고', rec);
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

  const scheduleMap: Record<string, TimeRange[]> = {};
  rec.availableTimeRanges.forEach((slot) => {
    (scheduleMap[slot.date] ??= []).push({
      startTime: slot.startTime,
      endTime: slot.endTime,
    });
  });

  // 2) 지원자가 앱 신청 시 선택한 **시각들** (로그의 availableTimes)
  //    e.g. app.availableTimes = ["11:00","11:15", …]
  const applicantMap: Record<string, InterviewScheduleItem[]> = {};
  (data.availableTimes ?? []).forEach((time) => {
    // 가정: 지원자는 한 날짜만 골랐거나, interviewDates[0] 이 시각들의 날짜임
    const date = data.interviewDates[0];
    // duration 만큼 더해서 endTime 만들기
    const startMin = parseToMin(time);
    const endMin = startMin + rec.interviewDuration;
    const hh = String(Math.floor(endMin / 60)).padStart(2, '0');
    const mm = String(endMin % 60).padStart(2, '0');

    (applicantMap[date!] ??= []).push({
      date,
      startTime: time,
      endTime: `${hh}:${mm}`,
    });
  });

  // console.log('공고 시간', scheduleMap);

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
        <ApplicantDetail
          application={data}
          scheduleMap={scheduleMap}
          interviewDuration={rec.interviewDuration}
          applicantMap={applicantMap}
        />

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
