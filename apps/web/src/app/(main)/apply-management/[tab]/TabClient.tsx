'use client';

import React, { useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import DocumentTab from '../_components/Tab/DocumentTab/DocumentTab';
import FinalTab from '../_components/Tab/FinalTab/FinalTab';
import RejectedTab from '../_components/Tab/RejectedTab/RejectedTab';
import { useRecruitmentPositionsQuery } from '@web/store/query/useRecruitmentPositionsQuery';
import InterviewTab from '../_components/Tab/InterViewTab/InterviewTab';
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
  const tab = Array.isArray(params.tab) ? params.tab[0] : params.tab!;
  const recruitmentId = Number(search.get('recruitmentId'));

  // 공통: 파트 목록 + 컬러 매핑
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
