// app/(main)/interview-management/_components/InviteModalContent/InviteModalContent.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { TabBar } from '@repo/ui/TabBar';
import { InputField } from '@repo/ui/InputField';
import { Button } from '@repo/ui/Button';
import ProfileChip from './ProfileChip/ProfileChip';
import ProfileListItem from './ProfileListItem/ProfileListItem';
import { ProfileItem } from '@web/components/ProfileGroup/ProfileGroup';
import * as styles from './InviteModalContent.css';
import { useTimeSlotUsersQuery } from '@web/store/query/useTimeSlotUsersQuery';
import { useAddTimeSlotUsersMutation } from '@web/store/mutation/useAddTimeSlotUsersMutation';
import { useOrganizationUsersQuery } from '@web/store/query/useOrganizationUsersQuery';
import { IcInputSearch } from '@repo/ui/icons/colored';

const TABS = ['interviewer', 'guide'];

export default function InviteModalContent() {
  const searchParams = useSearchParams();
  const timeSlotId = Number(searchParams.get('timeSlotId') ?? NaN);
  const interviewId = Number(searchParams.get('interviewId'));
  // 탭, 입력, 실제 검색어 분리
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]>('interviewer');
  const [inputKeyword, setInputKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  // 1) 이미 배정된 사용자 조회
  const { data: assignedRaw = [] } = useTimeSlotUsersQuery(timeSlotId);
  const [assignedInterviewers, setAssignedInterviewers] = useState<
    ProfileItem[]
  >([]);
  const [assignedGuides, setAssignedGuides] = useState<ProfileItem[]>([]);

  useEffect(() => {
    const mapped = assignedRaw.map((u) => ({
      name: u.name,
      src: '',
      userId: u.userId,
    }));
    setAssignedInterviewers(mapped);
    setAssignedGuides(mapped);
  }, [assignedRaw]);

  // 2) 서버 검색
  // TODO: 실제 organizationId로 바꿔주세요
  const organizationId = 5;
  const roleId = activeTab === 'interviewer' ? 1 : 2;
  const { data: candidates = [], isFetching } = useOrganizationUsersQuery(
    organizationId,
    roleId,
    searchKeyword
  );

  // 3) 추가 / 제거
  const addMutation = useAddTimeSlotUsersMutation(timeSlotId, interviewId);
  const handleAdd = (p: ProfileItem) =>
    addMutation.mutate({
      userIds: [p.userId!],
      role: activeTab === 'interviewer' ? 'INTERVIEWER' : 'ASSISTANT',
    });

  const handleRemove = (p: ProfileItem) => {
    if (activeTab === 'interviewer') {
      setAssignedInterviewers((prev) =>
        prev.filter((a) => a.userId !== p.userId)
      );
    } else {
      setAssignedGuides((prev) => prev.filter((a) => a.userId !== p.userId));
    }
  };

  const assigned =
    activeTab === 'interviewer' ? assignedInterviewers : assignedGuides;

  return (
    <Flex direction="column" gap="1.5rem">
      {/* 탭 */}
      <TabBar
        tabs={TABS}
        active={activeTab}
        onChange={(tab) => setActiveTab(tab as any)}
      />

      {/* 배정 현황 */}
      <Flex
        direction="column"
        gap="1.2rem"
        width="100%"
        className={styles.gridContainer}
      >
        <Text variant="sm_caption_semibold" color="grayscale90">
          배정 현황
        </Text>
        <div className={styles.assignedGrid}>
          {assigned.map((p) => (
            <ProfileChip
              key={p.userId}
              person={p}
              onRemove={() => handleRemove(p)}
            />
          ))}
        </div>
      </Flex>

      {/* 검색창 */}
      <Flex gap="1.2rem" width="100%" align="center">
        <InputField
          placeholder="검색"
          value={inputKeyword}
          onChange={(e) => setInputKeyword(e.currentTarget.value)}
          icon={<IcInputSearch width={22} height={22} />}
          size="search"
          width="100%"
        />
        <Button
          size="40"
          variant="sub"
          width="6.8rem"
          onClick={() => setSearchKeyword(inputKeyword.trim())}
          disabled={!inputKeyword.trim()}
        >
          검색
        </Button>
      </Flex>

      {/* 검색 결과 */}
      <Flex direction="column" width="100%" style={{ minHeight: '25rem' }}>
        {candidates.map((p) => (
          <ProfileListItem
            key={p.userId}
            person={{ name: p.name, src: p.imageUrl ?? '', userId: p.userId }}
            onAdd={() =>
              handleAdd({
                name: p.name,
                src: p.imageUrl ?? '',
                userId: p.userId,
              })
            }
            added={assigned.some((a) => a.userId === p.userId)}
          />
        ))}
      </Flex>
    </Flex>
  );
}
