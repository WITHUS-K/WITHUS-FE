'use client';

import { useState } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Button } from '@repo/ui/Button';
import { Text } from '@repo/ui/Text';
import { IcInputSearch } from '@repo/ui/icons/colored';
import { TabBar } from '@repo/ui/TabBar';
import { InputField } from '@repo/ui/InputField';
import ProfileChip from './ProfileChip/ProfileChip';
import ProfileListItem from './ProfileListItem/ProfileListItem';
import { ProfileItem } from '@web/components/ProfileGroup/ProfileGroup';
import * as styles from './InviteModalContent.css';

const ALL_INTERVIEWERS: ProfileItem[] = [
  { src: '/avatar1.jpg', name: '나하이' },
  { src: '/avatar2.jpg', name: '이하이' },
  { src: '/avatar3.jpg', name: '김하이' },
  { src: '/avatar3.jpg', name: '김하이1' },
  { src: '/avatar3.jpg', name: '김하이2' },
];
const ALL_GUIDES: ProfileItem[] = [
  { src: '/guide1.jpg', name: '장운영' },
  { src: '/guide2.jpg', name: '박운영' },
  { src: '/guide3.jpg', name: '최운영' },
  { src: '/guide3.jpg', name: '최운영1' },
];

export default function InviteModalContent() {
  const TABS = ['interviewer', 'guide'];
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]>('interviewer');
  const [search, setSearch] = useState('');
  const [assignedInterviewers, setAssignedInterviewers] = useState<
    ProfileItem[]
  >([]);
  const [assignedGuides, setAssignedGuides] = useState<ProfileItem[]>([]);

  const candidates =
    activeTab === 'interviewer' ? ALL_INTERVIEWERS : ALL_GUIDES;
  const assigned =
    activeTab === 'interviewer' ? assignedInterviewers : assignedGuides;
  const setAssigned =
    activeTab === 'interviewer' ? setAssignedInterviewers : setAssignedGuides;

  const filtered = candidates.filter((p) => p.name.includes(search));

  const handleAdd = (person: ProfileItem) => {
    if (!assigned.find((a) => a.name === person.name)) {
      setAssigned([...assigned, person]);
    }
  };
  const handleRemove = (person: ProfileItem) => {
    setAssigned(assigned.filter((a) => a.name !== person.name));
  };

  return (
    <Flex direction="column" gap="1.5rem">
      {/* 탭바 */}
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
            <ProfileChip key={p.name} person={p} onRemove={handleRemove} />
          ))}
        </div>
      </Flex>

      {/* 검색 */}
      <Flex gap="1.2rem" width="100%" align="center">
        <InputField
          placeholder="검색"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          icon={<IcInputSearch width={22} height={22} />}
          size="search"
          width="100%"
        />
        <Button size="40" variant="sub" width="6.8rem" onClick={() => {}}>
          검색
        </Button>
      </Flex>

      {/* 결과 리스트 */}
      <Flex direction="column" width="100%">
        {filtered.map((p) => (
          <ProfileListItem
            key={p.name}
            person={p}
            onAdd={handleAdd}
            added={!!assigned.find((a) => a.name === p.name)}
          />
        ))}
      </Flex>
    </Flex>
  );
}
