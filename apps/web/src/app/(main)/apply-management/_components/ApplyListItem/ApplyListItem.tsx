'use client';

import React, { useEffect, useState } from 'react';
import { Member } from '@web/types/organization';
import { CheckBox } from '@repo/ui/CheckBox';
import { Tag } from '@repo/ui/Tag';
import { Text } from '@repo/ui/Text';
import * as styles from './ApplyListItem.css';
import EvalBubbles from '../EvalBubbles/EvalBubbles';
import { TagColor } from '@repo/utils';
import { Flex } from '@repo/ui/Flex';
import StatusBadge, { Status } from '../StatusBadge/StatusBadge';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { IcPlusRole } from '@repo/ui/icons/mono';
import { StatusDropdown } from '@repo/ui/StatusDropdown';
import {
  AdminApplicationStage,
  UpdateStatusSimple,
  useUpdateApplicationsStatus,
} from '@web/store/mutation/useUpdateApplicationsStatus';
import { stageMap } from '../../[tab]/TabClient';
import { useEvaluatorStore } from '@web/store/state/evaluatorStore';

export interface Evaluator {
  userId: number;
  name: string;
  profileImageUrl?: string;
  profileColor: string;
}

export interface MemberWithEval {
  id: string;
  name: string;
  fieldTags: { label: string; color: TagColor }[];
  evalStatus: string;
  documentScore?: number;
  interviewScore?: number;
  evaluators: Evaluator[];
  status: string;
  smsSent: boolean;
  mailSent: boolean;
  applicationId?: number;
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
  const searchParams = useSearchParams();

  const rawTab = params.tab;
  const activeTab = Array.isArray(rawTab) ? rawTab[0] : rawTab;
  const recruitmentIdParam = searchParams.get('recruitmentId');
  const recruitmentId = recruitmentIdParam ? Number(recruitmentIdParam) : 0;

  const [status, setStatus] = useState<Status>(member.status as Status);
  const stageEnum = stageMap[activeTab!];

  const updateStatus = useUpdateApplicationsStatus(
    recruitmentId,
    activeTab as AdminApplicationStage
  );

  console.log("파트 태그", member.fieldTags)
  const isInterviewStatus =
    status === '면접 보류' ||
    status === '면접 합격' ||
    status === '면접 불합격';

  const handleStatusChange = (newStatus: Status) => {
    setStatus(newStatus);

    // API 호출
    const simple: UpdateStatusSimple =
      newStatus === '보류'
        ? 'HOLD'
        : newStatus.includes('불합격')
          ? 'FAIL'
          : newStatus.includes('합격')
            ? 'PASS'
            : 'FAIL';

    updateStatus.mutate({
      applicationIds: [Number(member.applicationId)],
      stage: stageEnum!,
      status: simple,
    });
  };

  useEffect(() => {
    setStatus(member.status as Status);
  }, [member.status]);

  const tabKey =
    activeTab === 'documents' || activeTab === 'interviews'
      ? activeTab
      : 'documents';

  const setSelectedEvaluators = useEvaluatorStore(
    (s) => s.setSelectedEvaluators
  );

  // charge 모달 페이지로 이동
  const openChargeModal = () => {
    setSelectedEvaluators(member.evaluators);
    router.push(
      `/apply-management/${activeTab}/charge?recruitmentId=${recruitmentId}&applicationId=${member.applicationId}`
    );
  };

  const goDetailPage = () => {
    console.log(member.applicationId);
    router.push(
      `/apply-management/${activeTab}/${member.applicationId}?recruitmentId=${recruitmentId}`
    );
  };

  return (
    <div
      className={styles.row}
      data-selected={isSelected}
      onClick={goDetailPage}
    >
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

      <Flex
        align="center"
        gap="1rem"
        marginRight="3.8rem"
        onClick={(e) => e.stopPropagation()}
      >
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

      <div
        style={{ width: '7.5rem', marginRight: '3.8rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        {activeTab === 'documents' && isInterviewStatus ? (
          // 문서 탭에서 면접 관련 상태면 Badge 로만 표시
          <StatusBadge status={member.status as Status} />
        ) : (
          // 그 외엔 기존대로 Dropdown
          <StatusDropdown
            key={status}
            status={status}
            onChange={handleStatusChange}
            tab={tabKey}
          />
        )}
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
