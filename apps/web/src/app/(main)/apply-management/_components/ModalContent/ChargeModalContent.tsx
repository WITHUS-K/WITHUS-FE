'use client';

import { useState } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Button } from '@repo/ui/Button';
import { Text } from '@repo/ui/Text';
import { IcInputSearch } from '@repo/ui/icons/colored';
import { InputField } from '@repo/ui/InputField';
import ProfileChip from './ProfileChip/ProfileChip';
import ProfileListItem from './ProfileListItem/ProfileListItem';
import * as styles from './ChargeModalContent.css';
import { Evaluator } from '../EvalBubbles/EvalBubbles';

const MOCK_CANDIDATES: Evaluator[] = [
  { name: '김민수' },
  { name: '이채원' },
  { name: '박영희' },
  { name: '최준호' },
  { name: '이수진' },
];

export default function ChargeModalContent() {
  const [search, setSearch] = useState('');
  const [assigned, setAssigned] = useState<Evaluator[]>([]);

  const filtered = MOCK_CANDIDATES.filter((p) => p.name.includes(search));

  const handleAdd = (p: Evaluator) => {
    if (!assigned.find((a) => a.name === p.name)) {
      setAssigned([...assigned, p]);
    }
  };
  const handleRemove = (p: Evaluator) => {
    setAssigned(assigned.filter((a) => a.name !== p.name));
  };

  return (
    <Flex direction="column" gap="1.5rem">
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
          {assigned.map((p, idx) => (
            <ProfileChip
              key={p.name}
              person={p}
              index={idx}
              onRemove={handleRemove}
            />
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
        {filtered.map((p, idx) => (
          <ProfileListItem
            key={p.name}
            person={p}
            onAdd={handleAdd}
            index={idx}
            added={!!assigned.find((a) => a.name === p.name)}
          />
        ))}
      </Flex>
    </Flex>
  );
}
