'use client';

import React, { useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import DocumentTab from '../_components/Tab/DocumentTab/DocumentTab';
import FinalTab from '../_components/Tab/FinalTab/FinalTab';
import RejectedTab from '../_components/Tab/RejectedTab/RejectedTab';
import InterviewTab from '../_components/Tab/InterViewTab/InterviewTab';
import { useRecruitmentPositionsQuery } from '@web/store/query/useRecruitmentPositionsQuery';
import { AdminApplicationStage } from '@web/store/query/useAdminApplicationsQuery';

export const stageMap: Record<string, AdminApplicationStage> = {
  documents: 'DOCUMENT',
  interviews: 'INTERVIEW',
  final: 'FINAL_PASS',
  rejected: 'FAIL',
};

// sortKey → API sortBy 맵핑
export const sortByMap: Record<string, string> = {
  name: 'NAME',
  fieldTags: 'POSITION_NAME',
  evalStatus: 'DOCUMENT_EVALUATION_STATUS',
  score: 'DOCUMENT_SCORE',
  status: 'STATUS',
  smsSent: 'IS_SMS_SENT',
  mailSent: 'IS_MAIL_SENT',
};

export default function TabClient() {
  const params = useParams();
  const search = useSearchParams();

  // 탭 path-param으로 가져오기
  const tab = Array.isArray(params.tab) ? params.tab[0] : params.tab!;

  // recruitmentId를 query-param에서 읽기
  const recIdStr = search.get('recruitmentId');
  if (!recIdStr) {
    // 아직 recruitmentId가 없으면 아무것도 렌더하지 않음
    return null;
  }

  const recruitmentId = Number(recIdStr);
  if (isNaN(recruitmentId)) {
    return <div>잘못된 모집 ID입니다: {recIdStr}</div>;
  }

  // 이제 안전하게 positions 쿼리 호출
  const { data: positions = [] } = useRecruitmentPositionsQuery(recruitmentId);

  const posColorMap = useMemo(
    () => Object.fromEntries(positions.map((p) => [p.name, p.color])),
    [positions]
  );

  const commonProps = { recruitmentId, posColorMap };

  switch (tab) {
    case 'documents':
      return <DocumentTab {...commonProps} />;
    case 'interviews':
      return <InterviewTab {...commonProps} />;
    case 'final':
      return <FinalTab {...commonProps} />;
    case 'rejected':
      return <RejectedTab {...commonProps} />;
    default:
      return <div>잘못된 탭입니다: {tab}</div>;
  }
}
