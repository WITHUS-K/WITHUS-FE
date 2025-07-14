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
import { useUserStore } from '@web/store/state/userStore';
import { useUpdateTimeSlotUsersMutation } from '@web/store/mutation/useUpdateTimeSlotUsersMutation';

const TABS = ['interviewer', 'guide'];
type TabKey = (typeof TABS)[number];

export default function InviteModalContent() {
  const sp = useSearchParams();
  const timeSlotId = Number(sp.get('timeSlotId') ?? NaN);
  const interviewId = Number(sp.get('interviewId'));

  const [activeTab, setActiveTab] = useState<TabKey>('interviewer');
  const [inputKeyword, setInputKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  // 1) 이미 배정된 사용자 조회
  const { data: assignedRaw = [] } = useTimeSlotUsersQuery(timeSlotId);

  // 2) 서버 검색
  const organizationId = useUserStore.getState().organizationId!;
  const roleId = activeTab === 'interviewer' ? 1 : 2;
  const { data: candidates = [], isFetching } = useOrganizationUsersQuery({
    organizationId,
    roleId,
    keyword: searchKeyword,
  });

  // 3) 전체 수정 훅
  const updateUsers = useUpdateTimeSlotUsersMutation(timeSlotId, interviewId);
  const role = activeTab === 'interviewer' ? 'INTERVIEWER' : 'ASSISTANT';

  // 현재 탭에 배정된 userId 배열
  const assignedIds = assignedRaw
    .filter((u) => u.role === role)
    .map((u) => u.userId);

  const assigned: ProfileItem[] = assignedRaw
    .filter((u) => u.role === role)
    .map((u) => ({
      name: u.name,
      src: u.profileImageUrl ?? '',
      userId: u.userId,
    }));

  const handleAdd = (p: ProfileItem) => {
    updateUsers.mutate({
      userIds: [...assignedIds, p.userId!],
      role,
    });
  };

  const handleRemove = (p: ProfileItem) => {
    updateUsers.mutate({
      userIds: assignedIds.filter((id) => id !== p.userId),
      role,
    });
  };

  // 검색어 적용
  useEffect(() => {
    if (inputKeyword.trim() === '') {
      setSearchKeyword('');
    }
  }, [inputKeyword]);
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
            added={assignedIds.includes(p.userId!)}
          />
        ))}
      </Flex>
    </Flex>
  );
}
