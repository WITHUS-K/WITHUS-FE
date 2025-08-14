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

import { useTimeSlotDetailQuery } from '@web/store/query/useTimeSlotDetailQuery';
import { useOrganizationUsersQuery } from '@web/store/query/useOrganizationUsersQuery';
import { IcInputSearch } from '@repo/ui/icons/colored';
import { useUpdateTimeSlotUsersMutation } from '@web/store/mutation/useUpdateTimeSlotUsersMutation';
import { useUpdateTimeSlotApplicationsMutation } from '@web/store/mutation/useUpdateTimeSlotApplicationsMutation';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';

const TABS = ['applicant', 'interviewer', 'guide'];
type TabKey = (typeof TABS)[number];

export default function InviteModalContent() {
  const sp = useSearchParams();
  const timeSlotId = Number(sp.get('timeSlotId') ?? NaN);
  const interviewId = Number(sp.get('interviewId'));

  const [activeTab, setActiveTab] = useState<TabKey>('applicant');
  const [inputKeyword, setInputKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  // 1) 타임슬롯 상세 조회 (users, applicants 포함)
  const { data: detail } = useTimeSlotDetailQuery(timeSlotId);
  const assignedUsersRaw = detail?.users ?? [];
  const assignedApplicantsRaw = detail?.applicants ?? [];

  // 2) 서버 검색 (조직 사용자) — applicant 탭은 별도 로직일 수 있으나, 기존 구조 유지
  const { organizationId } = getClientSideTokens();
  const roleId = activeTab === 'interviewer' ? 1 : 2; // guide는 2로 유지
  const { data: candidates = [], isFetching } = useOrganizationUsersQuery({
    organizationId,
    roleId,
    keyword: searchKeyword,
  });

  // 3) 전체 수정 훅
  const updateUsers = useUpdateTimeSlotUsersMutation(timeSlotId, interviewId);
  const updateApplications = useUpdateTimeSlotApplicationsMutation(
    timeSlotId,
    interviewId
  );

  const role = activeTab === 'interviewer' ? 'INTERVIEWER' : 'ASSISTANT';

  // 현재 탭이 interviewer/guide일 때 배정된 userId 배열/표시 데이터
  const assignedUserIds = assignedUsersRaw
    .filter((u) => u.role === role)
    .map((u) => u.userId);

  const assignedUsers: ProfileItem[] = assignedUsersRaw
    .filter((u) => u.role === role)
    .map((u) => ({
      name: u.name,
      src: u.profileImageUrl ?? '',
      userId: u.userId,
    }));

  // applicant 탭용 표시 데이터
  const assignedApplicants: ProfileItem[] = assignedApplicantsRaw.map((a) => ({
    name: a.name,
    src: '', // applicant에는 이미지가 없으므로 빈 문자열
    userId: a.id,
  }));

  console.log('배정현황(detail.users)', assignedUsersRaw);
  console.log('배정현황(detail.applicants)', assignedApplicantsRaw);

  /** interviewer/guide 추가 */
  const handleAddUser = (p: ProfileItem) => {
    updateUsers.mutate({
      userIds: [...assignedUserIds, p.userId!],
      role,
    });
  };

  /** interviewer/guide 제거 */
  const handleRemoveUser = (p: ProfileItem) => {
    updateUsers.mutate({
      userIds: assignedUserIds.filter((id) => id !== p.userId),
      role,
    });
  };

  /** applicant 제거 */
  const handleRemoveApplicant = (applicantId: number) => {
    const nextIds = assignedApplicantsRaw
      .map((a) => a.id)
      .filter((id) => id !== applicantId);

    updateApplications.mutate({
      applicantIds: nextIds,
    });
  };

  // 검색어 초기화
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
        onChange={(tab) => setActiveTab(tab as TabKey)}
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
          {activeTab === 'applicant'
            ? assignedApplicants.map((p) => (
                <ProfileChip
                  key={p.userId}
                  person={p}
                  onRemove={() => handleRemoveApplicant(p.userId!)} // ✅ applicants 제거
                />
              ))
            : assignedUsers.map((p) => (
                <ProfileChip
                  key={p.userId}
                  person={p}
                  onRemove={() => handleRemoveUser(p)} // ✅ users 제거
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
              handleAddUser({
                name: p.name,
                src: p.imageUrl ?? '',
                userId: p.userId,
              })
            }
            added={assignedUserIds.includes(p.userId!)}
          />
        ))}
      </Flex>
    </Flex>
  );
}
