'use client';

import React from 'react';
import { Member } from '@web/types/organization';
import { CheckBox } from '@repo/ui/CheckBox';
import { Tag } from '@repo/ui/Tag';
import { Text } from '@repo/ui/Text';
import * as styles from './ApplyListItem.css';
import EvalBubbles from '../EvalBubbles/EvalBubbles';
import { TagColor } from '@repo/utils';
import { Flex } from '@repo/ui/Flex';
import StatusBadge, { Status } from '../StatusBadge/StatusBadge';
import { useRouter, useParams } from 'next/navigation';
import { IcPlusRole } from '@repo/ui/icons/mono';

export interface Evaluator {
  name: string;
}

export interface MemberWithEval extends Member {
  fieldTags: { label: string; color: TagColor }[];
  evalStatus: string;
  documentScore: number;
  interviewScore: number;
  evaluators: Evaluator[];
  status: string;
  smsSent: boolean;
  mailSent: boolean;
}

interface Props {
  member: MemberWithEval;
  isSelected: boolean;
  onToggle: (c: boolean) => void;
  availableEvals: Evaluator[];
  onAddEval: (ev: Evaluator) => void;
}

export default function ApplyListItem({
  member,
  isSelected,
  onToggle,
  onAddEval,
}: Props) {
  const router = useRouter();
  const params = useParams();

  const rawClubId = params.clubId;
  const rawTab = params.tab;
  const clubId = Array.isArray(rawClubId) ? rawClubId[0] : rawClubId;
  const activeTab = Array.isArray(rawTab) ? rawTab[0] : rawTab;

  // charge 모달 페이지로 이동
  const openChargeModal = () => {
    router.push(`/apply-management/${activeTab}/charge?clubId=${clubId}`);
  };

  return (
    <div className={styles.row} data-selected={isSelected}>
      <div style={{ marginRight: '2.4rem', height: '2.4rem' }}>
        <CheckBox
          isChecked={isSelected}
          onChange={() => onToggle(!isSelected)}
        />
      </div>
      <Text
        variant="xs_caption_medium"
        color="grayscale50"
        style={{ marginRight: '2.4rem', width: '2.4rem' }}
      >
        {member.id}
      </Text>
      <Text
        variant="sm_caption_medium"
        color="grayscale70"
        style={{ marginRight: '3.7rem', width: '4.9rem' }}
      >
        {member.name}
      </Text>

      <div style={{ width: '13.4rem', marginRight: '3.8rem' }}>
        {member.fieldTags.map((t) => (
          <Tag key={t.label} color={t.color} withCircle>
            {t.label}
          </Tag>
        ))}
      </div>

      <Text
        variant="sm_caption_medium"
        color="grayscale70"
        style={{ marginRight: '4rem', width: '8.7rem' }}
      >
        {member.evalStatus}
      </Text>

      <Text
        variant="sm_caption_medium"
        color="grayscale70"
        style={{ marginRight: '4rem', width: '6.3rem' }}
      >
        {member.documentScore}
      </Text>

      <Flex align="center" gap="1rem" marginRight="3.8rem">
        <button
          type="button"
          onClick={openChargeModal}
          className={styles.buttonBase}
        >
          <IcPlusRole width={11} height={11} />
        </button>
        <div style={{ width: '19.6rem' }}>
          <EvalBubbles evaluators={member.evaluators} />
        </div>
      </Flex>

      <div style={{ width: '7.5rem', marginRight: '3.8rem' }}>
        <StatusBadge status={member.status as Status} />
      </div>

      <Text
        variant="sm_caption_medium"
        color="grayscale70"
        style={{ marginRight: '3.8rem', width: '6.3rem' }}
      >
        {member.smsSent ? 'O' : 'X'}
      </Text>
      <Text
        variant="sm_caption_medium"
        color="grayscale70"
        style={{ width: '6.3rem' }}
      >
        {member.mailSent ? 'O' : 'X'}
      </Text>
    </div>
  );
}
