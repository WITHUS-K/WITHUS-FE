'use client';

import React, { useState } from 'react';
import {
  useRouter,
  useParams,
  useSearchParams,
  usePathname,
} from 'next/navigation';
import { MemberWithEval } from '../../ApplyListItem/ApplyListItem';
import { HeaderMeta } from '../../ApplyListHeader/ApplyListHeader';
import { Flex } from '@repo/ui/Flex';
import ActionToolbar from '../../ActionToolbar/ActionToolbar';
import TableContainer from '../../TableContainer/TableContainer';
import { Template } from '../../SideTabs/TemplatesAccordion/TemplatesAccordion';
import { SmsSideTab } from '../../SideTabs/SmsSideTab/SmsSideTab';
import { MailSideTab } from '../../SideTabs/MailSideTab/MailSideTab';

const HEADER: HeaderMeta[] = [
  { key: 'checkbox', label: '', width: '4.7rem' },
  { key: 'id', label: '순번', width: '5rem' },
  { key: 'name', label: '이름', width: '13.3rem', sortable: true },
  { key: 'fieldTags', label: '지원 분야', width: '22rem' },
  {
    key: 'documentScore',
    label: '서류 점수',
    width: '17.2rem',
    sortable: true,
  },
  {
    key: 'InterviewScore',
    label: '면접 점수',
    width: '15.5rem',
    sortable: true,
  },
  { key: 'status', label: '상태', width: '16rem', sortable: true },
  { key: 'smsSent', label: '문자 발송', width: '15rem' },
  { key: 'mailSent', label: '메일 발송' },
];

export const MOCK_DATA: MemberWithEval[] = Array.from(
  { length: 3 },
  (_, i) => ({
    id: String(i + 1).padStart(3, '0'),
    name: `지원자`,
    email: `user${i + 1}@example.com`,
    roles: [{ label: '프론트엔드', color: '#E2A500' }],
    gender: '남',
    dob: '2001.01.01',
    phone: '010-1234-5678',
    joined: '2025.05.12',
    profileUrl: 'https://…jpg',

    fieldTags: [{ label: '기획', color: '#FF2A3A' }],
    evalStatus: `${(i % 12) + 1}/12`,
    documentScore: (i * 7) % 100,
    interviewScore: (i * 7) % 100,

    status: '최종 합격',
    smsSent: i % 2 === 0,
    mailSent: i % 4 === 0,
    evaluators: [],
  })
);

interface FinalTabProps {
  clubId: string;
}

export default function FinalTab({ clubId }: FinalTabProps) {
  const router = useRouter();
  const params = useParams() as { tab: string };
  const pathname = usePathname();
  const activeTab = params.tab;
  const searchParams = useSearchParams();
  const side = searchParams.get('sideTab');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const sideTab = side === 'sms' ? 'sms' : side === 'mail' ? 'mail' : null;

  const templates: Template[] = [
    { id: 't1', title: '템플릿 1', body: '안녕하세요, 지원자님…' },
    { id: 't2', title: '템플릿 2', body: '감사합니다.' },
  ];

  const recipients = MOCK_DATA.filter((m) => selectedIds.includes(m.id)).map(
    (m) => m.name
  );

  const setModalParam = (value: string | null) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) params.set('sideTab', value);
    else params.delete('sideTab');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Flex direction="column" width="100%" height="100%" gap="1.2rem">
      <ActionToolbar
        hasSelection={selectedIds.length > 0}
        onSms={() => setModalParam('sms')}
        onMail={() => setModalParam('mail')}
        onDistribute={() => {}}
        onAdd={() => {}}
        onFail={() => {}}
        onPass={() => {}}
        communicationOnly={true}
      />

      <TableContainer
        headerMeta={HEADER}
        data={MOCK_DATA}
        selectedIds={selectedIds}
        onToggleAll={(c) => setSelectedIds(c ? MOCK_DATA.map((m) => m.id) : [])}
        onToggleOne={(id, checked) =>
          setSelectedIds((prev) =>
            checked ? [...prev, id] : prev.filter((x) => x !== id)
          )
        }
      />

      {sideTab === 'sms' && (
        <SmsSideTab
          recipients={recipients}
          templates={templates}
          onClose={() => setModalParam(null)}
          onSend={(data) => {
            console.log('문자 전송:', data);
            setModalParam(null);
          }}
        />
      )}

      {sideTab === 'mail' && (
        <MailSideTab
          recipients={recipients}
          templates={templates}
          onClose={() => setModalParam(null)}
          onSend={(data) => {
            console.log('메일 전송:', data);
            setModalParam(null);
          }}
        />
      )}
    </Flex>
  );
}
