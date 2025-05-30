'use client';

import React from 'react';
import { Member } from '@web/types/organization';
import { CheckBox } from '@repo/ui/CheckBox';
import { Tag } from '@repo/ui/Tag';
import { Text } from '@repo/ui/Text';
import * as styles from './ApplyListItem.css';
import { TagColor } from '@repo/utils';
import StatusBadge, { Status } from '../StatusBadge/StatusBadge';

export interface Evaluator {
  name: string;
  profileColor: string;
}

export interface MemberWithEval {
  id: string;
  name: string;
  fieldTags: { label: string; color: TagColor }[];
  evalStatus: string;
  documentScore?: number;
  interviewScore?: number;
  evaluators?: Evaluator[];
  status: string;
  smsSent: boolean;
  mailSent: boolean;
}

interface Props {
  member: MemberWithEval;
  isSelected: boolean;
  onToggle: (c: boolean) => void;
}

export default function ApplyListLastItem({
  member,
  isSelected,
  onToggle,
}: Props) {
  return (
    <div className={styles.row} data-selected={isSelected}>
      <div
        style={{ marginRight: '2.4rem', height: '2.4rem' }}
        onClick={(e) => e.stopPropagation()}
      >
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
        style={{ marginRight: '8.6rem', width: '4.9rem' }}
      >
        {member.name}
      </Text>

      <div style={{ width: '13.4rem', marginRight: '8.7rem' }}>
        {member.fieldTags.map((t) => (
          <Tag key={t.label} color={t.color} withCircle>
            {t.label}
          </Tag>
        ))}
      </div>

      <Text
        variant="sm_caption_medium"
        color="grayscale70"
        style={{ marginRight: '8.9rem', width: '8.7rem' }}
      >
        {member.documentScore}
      </Text>

      <Text
        variant="sm_caption_medium"
        color="grayscale70"
        style={{ marginRight: '8.6rem', width: '6.3rem' }}
      >
        {member.interviewScore}
      </Text>

      <div style={{ width: '7.5rem', marginRight: '8.8rem' }}>
        <StatusBadge status={member.status as Status} />
      </div>

      <Text
        variant="sm_caption_medium"
        color="grayscale70"
        style={{ marginRight: '8.8rem', width: '6.3rem' }}
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
