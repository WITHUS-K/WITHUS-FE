'use client';

import { useParams } from 'next/navigation';
import DocumentTab from '../../_components/Tab/DocumentTab/DocumentTab';
import InterviewTab from '../../_components/Tab/InterViewTab/InterviewTab';
import FinalTab from '../../_components/Tab/FinalTab/FinalTab';
import RejectedTab from '../../_components/Tab/RejectedTab/RejectedTab';

export default function TabClient() {
  const params = useParams();

  const tab = Array.isArray(params.tab) ? params.tab[0] : params.tab;
  const clubId = Array.isArray(params.clubId)
    ? params.clubId[0]!
    : params.clubId!;

  switch (tab) {
    case 'documents':
      return <DocumentTab clubId={clubId} />;
    case 'interviews':
      return <InterviewTab clubId={clubId} />;
    case 'final':
      return <FinalTab clubId={clubId} />;
    case 'rejected':
      return <RejectedTab clubId={clubId} />;
    default:
      return <div>잘못된 탭입니다: {tab}</div>;
  }
}
