'use client';

import React from 'react';
import { MemberWithEval } from '../../ApplyListItem/ApplyListItem';
import { HeaderMeta } from '../../ApplyListHeader/ApplyListHeader';
import { Flex } from '@repo/ui/Flex';
import ActionToolbar from '../../ActionToolbar/ActionToolbar';
import TableContainer from '../../TableContainer/TableContainer';

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
  { length: 5 },
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

    status: '불합격',
    smsSent: i % 2 === 0,
    mailSent: i % 4 === 0,
    evaluators: [],
  })
);

interface RejectedTabProps {
  clubId: string;
}

export default function RejectedTab({ clubId }: RejectedTabProps) {
  return (
    <Flex direction="column" width="100%" height="100%" gap="1.2rem">
      <ActionToolbar
        hasSelection={false}
        onDistribute={() => {}}
        onAdd={() => {}}
        onSms={() => {}}
        onMail={() => {}}
        onFail={() => {}}
        onPass={() => {}}
        communicationOnly={true}
      />

      <TableContainer headerMeta={HEADER} data={MOCK_DATA} />
    </Flex>
  );
}
