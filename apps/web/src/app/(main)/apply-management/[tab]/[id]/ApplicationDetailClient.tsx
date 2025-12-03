'use client';
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
import { useMemo } from 'react';

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
  const {
    data: rec,
    isLoading: recLoading,
    isError: recError,
  } = useRecruitmentDetailQuery({ recruitmentId });

  const {
    data,
    isLoading: appLoading,
    isError: appError,
  } = useApplicationDetailQuery({ applicationId });

  type EvalType = 'DOCUMENT' | 'INTERVIEW';
  type EvalCardItem = {
    evaluator: string;
    status: 'complete' | 'pending';
    score: number | null;
    color: string;
    userId: number;
  };

  function buildEvalByUser(
    all: typeof data.evaluations,
    type: EvalType
  ): EvalCardItem[] {
    const byUser = new Map<
      number,
      { name: string; color: string; scores: number[]; hasAnyScore: boolean }
    >();

    for (const e of all) {
      if (e.criteria.type !== type) continue;

      const uid = e.user.userId;
      const entry = byUser.get(uid) ?? {
        name: e.user.name,
        color: e.user.profileColor,
        scores: [],
        hasAnyScore: false,
      };

      if (e.score != null) {
        entry.scores.push(e.score);
        entry.hasAnyScore = true;
      }
      byUser.set(uid, entry);
    }

    return Array.from(byUser.entries()).map(([userId, v]) => {
      const avg =
        v.scores.length > 0
          ? Number(
              (v.scores.reduce((a, b) => a + b, 0) / v.scores.length).toFixed(1)
            )
          : null;

      return {
        userId,
        evaluator: v.name,
        status: v.hasAnyScore ? 'complete' : 'pending',
        score: avg,
        color: v.color,
      };
    });
  }

  const rawStage = stageMap[tab];
  if (!rawStage) return <div>잘못된 탭입니다: {tab}</div>;
  const stage: AdminApplicationStage = rawStage;

  const { mutate: updateStatus } = useUpdateApplicationsStatus(
    recruitmentId,
    stage
  );

  console.log('지원자 디테일', data);

  const scheduleMap = useMemo<Record<string, TimeRange[]>>(() => {
    const map: Record<string, TimeRange[]> = {};
    for (const slot of rec?.availableTimeRanges ?? []) {
      const dateDot = slot.date.replace(/[/-]/g, '.');

      (map[dateDot] ??= []).push({
        startTime: slot.startTime,
        endTime: slot.endTime,
      });
    }
    return map;
  }, [rec?.availableTimeRanges]);

  const applicantMap = useMemo<Record<string, InterviewScheduleItem[]>>(() => {
    const map: Record<string, InterviewScheduleItem[]> = {};
    if (!data || !rec) return map;

    for (const dateTime of data.availableTimes ?? []) {
      if (!dateTime) continue;
      const [rawDate, startTime] = dateTime.split('/');
      if (!rawDate || !startTime) continue;

      const dateDot = rawDate.replace(/[/-]/g, '.');

      const startMin = parseToMin(startTime);
      const endMin = startMin + rec.interviewDuration;
      const hh = String(Math.floor(endMin / 60)).padStart(2, '0');
      const mm = String(endMin % 60).padStart(2, '0');
      const endTime = `${hh}:${mm}`;

      (map[dateDot] ??= []).push({ date: dateDot, startTime, endTime });
    }
    return map;
  }, [data?.availableTimes, rec?.interviewDuration]);

  if (recLoading || appLoading) {
    return <div className={styles.container}>불러오는 중…</div>;
  }
  if (recError || appError) {
    return <div className={styles.container}>데이터를 불러오지 못했어요.</div>;
  }
  if (!rec || !data) {
    return <div className={styles.container}>데이터가 비어있어요.</div>;
  }

  const handleAccept = () => {
    updateStatus({ applicationIds: [applicationId], stage, status: 'PASS' });
  };
  const handleReject = () => {
    updateStatus({ applicationIds: [applicationId], stage, status: 'FAIL' });
  };

  return (
    <div className={styles.container}>
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
          questions={rec.applicationQuestions}
        />

        <div className={styles.rightSection}>
          <EvaluationScoreCard
            evaluationType="document"
            evaluation={buildEvalByUser(data.evaluations, 'DOCUMENT')}
          />

          <EvaluationScoreCard
            evaluationType="interview"
            evaluation={buildEvalByUser(data.evaluations, 'INTERVIEW')}
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
