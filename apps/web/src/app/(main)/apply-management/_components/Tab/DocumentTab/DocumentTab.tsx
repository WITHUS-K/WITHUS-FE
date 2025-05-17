'use client';

import React from 'react';
import { Evaluator } from '../../EvalBubbles/EvalBubbles';
import { MemberWithEval } from '../../ApplyListItem/ApplyListItem';
import { HeaderMeta } from '../../ApplyListHeader/ApplyListHeader';
import { Flex } from '@repo/ui/Flex';
import ActionToolbar from '../../ActionToolbar/ActionToolbar';
import TableContainer from '../../TableContainer/TableContainer';

const DOC_HEADER: HeaderMeta[] = [
  { key: 'checkbox', label: '', width: '4.7rem' },
  { key: 'id', label: '순번', width: '5rem' },
  { key: 'name', label: '이름', width: '8.9rem', sortable: true },
  { key: 'fieldTags', label: '지원 분야', width: '16.8rem' },
  {
    key: 'evalStatus',
    label: '서류 평가 현황',
    width: '12.6rem',
    sortable: true,
  },
  { key: 'score', label: '서류 점수', width: '10.5rem', sortable: true },
  { key: 'evaluators', label: '평가 담당자', width: '27rem' },
  { key: 'status', label: '상태', width: '11rem', sortable: true },
  { key: 'smsSent', label: '문자 발송', width: '10.2rem' },
  { key: 'mailSent', label: '메일 발송' },
];

export const MOCK_DATA: MemberWithEval[] = Array.from(
  { length: 38 },
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
    status: i % 3 === 0 ? '선택' : i % 3 === 1 ? '서류 합격' : '서류 불합격',
    smsSent: i % 2 === 0,
    mailSent: i % 4 === 0,
    evaluators: [],
  })
);

const AVAILABLE_EVALS: Evaluator[] = [
  { name: '장수정' },
  { name: '윤수빈' },
  { name: '김현호' },
  { name: '설정원' },
  { name: '이채원' },
  { name: '서유빈' },
];

interface DocumentTabProps {
  clubId: string;
}

export default function DocumentTab({ clubId }: DocumentTabProps) {
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
      />

      <TableContainer
        headerMeta={DOC_HEADER}
        data={MOCK_DATA}
        availableEvals={AVAILABLE_EVALS}
      />
    </Flex>
  );
}
