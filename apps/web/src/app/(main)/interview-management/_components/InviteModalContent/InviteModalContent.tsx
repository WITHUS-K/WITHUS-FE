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
import { useTimeSlotCandidatesQuery } from '@web/store/query/useTimeSlotCandidatesQuery';
import { IcInputSearch } from '@repo/ui/icons/colored';
import { useUpdateTimeSlotUsersMutation } from '@web/store/mutation/useUpdateTimeSlotUsersMutation';
import { useUpdateTimeSlotApplicationsMutation } from '@web/store/mutation/useUpdateTimeSlotApplicationsMutation';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';

const TABS = ['applicant', 'interviewer', 'guide'] as const;
type TabKey = (typeof TABS)[number];

export default function InviteModalContent() {
  const sp = useSearchParams();
  const timeSlotId = Number(sp.get('timeSlotId') ?? NaN);
  const interviewId = Number(sp.get('interviewId'));
  const recruitmentId = Number(sp.get('recruitmentId') ?? NaN);

  const [activeTab, setActiveTab] = useState<TabKey>('applicant');
  const [inputKeyword, setInputKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  // 타임슬롯 상세 (현재 배정된 interviewer/guide/applicant)
  const { data: detail } = useTimeSlotDetailQuery(timeSlotId);
  const assignedUsersRaw = detail?.users ?? [];
  const assignedApplicantsRaw = detail?.applicants ?? [];

  // 공통: applicant의 현재 배정 id 목록
  const assignedApplicantIds = assignedApplicantsRaw.map((a) => a.id);

  // interviewer/guide 후보(조직 사용자) 검색
  const { organizationId } = getClientSideTokens();
  const roleId = activeTab === 'interviewer' ? 1 : 2; // guide=2
  const { data: userCandidates = [], isFetching: isFetchingUsers } =
    useOrganizationUsersQuery({
      organizationId,
      roleId,
      keyword: searchKeyword,
    });

  // applicant 후보 검색
  const { data: applicantCandidates = [], isFetching: isFetchingApplicants } =
    useTimeSlotCandidatesQuery({
      recruitmentId,
      timeSlotId,
      query: searchKeyword,
      excludeCurrent: true,
    });

  const updateUsers = useUpdateTimeSlotUsersMutation(timeSlotId, interviewId);
  const updateApplications = useUpdateTimeSlotApplicationsMutation(
    timeSlotId,
    interviewId
  );

  const role = activeTab === 'interviewer' ? 'INTERVIEWER' : 'ASSISTANT';

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

  const assignedApplicants: ProfileItem[] = assignedApplicantsRaw.map((a) => ({
    name: a.name,
    src: '',
    userId: a.id,
  }));

  const handleAddUser = (p: ProfileItem) => {
    updateUsers.mutate({
      userIds: Array.from(new Set([...assignedUserIds, p.userId!])),
      role,
    });
  };

  const handleRemoveUser = (p: ProfileItem) => {
    updateUsers.mutate({
      userIds: assignedUserIds.filter((id) => id !== p.userId),
      role,
    });
  };

  const handleAddApplicant = (applicationId: number) => {
    const next = Array.from(new Set([...assignedApplicantIds, applicationId]));
    updateApplications.mutate({ applicantIds: next });
  };

  const handleRemoveApplicant = (applicantId: number) => {
    const nextIds = assignedApplicantIds.filter((id) => id !== applicantId);
    updateApplications.mutate({ applicantIds: nextIds });
  };

  useEffect(() => {
    if (inputKeyword.trim() === '') setSearchKeyword('');
  }, [inputKeyword]);

  const isApplicantTab = activeTab === 'applicant';

  return (
    <Flex direction="column" gap="1.5rem">
      {/* 탭 */}
      <TabBar
        tabs={TABS as unknown as string[]}
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
          {isApplicantTab
            ? assignedApplicants.map((p) => (
                <ProfileChip
                  key={p.userId}
                  person={p}
                  onRemove={() => handleRemoveApplicant(p.userId!)}
                />
              ))
            : assignedUsers.map((p) => (
                <ProfileChip
                  key={p.userId}
                  person={p}
                  onRemove={() => handleRemoveUser(p)}
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
        {isApplicantTab
          ? (applicantCandidates ?? []).map((c) => (
              <ProfileListItem
                key={c.applicationId}
                person={{
                  name: c.name,
                  src: '',
                  userId: c.applicationId,
                }}
                onAdd={() => handleAddApplicant(c.applicationId)}
                added={assignedApplicantIds.includes(c.applicationId)}
              />
            ))
          : (userCandidates ?? []).map((p) => (
              <ProfileListItem
                key={p.userId}
                person={{
                  name: p.name,
                  src: p.imageUrl ?? '',
                  userId: p.userId,
                }}
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
