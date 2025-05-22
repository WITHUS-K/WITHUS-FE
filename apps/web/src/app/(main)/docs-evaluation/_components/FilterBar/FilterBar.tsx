'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchInput } from '@repo/ui/SearchInput';
import { Button } from '@repo/ui/Button';
import { IcRefresh } from '@repo/ui/icons/mono';
import { CommonDropdown } from '@repo/ui/CommonDropdown';
import { Flex } from '@repo/ui/Flex';

const CLUBS = [
  '큐시즘 31기 학회원 리크루팅',
  '큐시즘 30기 학회원 리크루팅',
  '큐시즘 29기 학회원 리크루팅',
];

export default function FilterBar() {
  const router = useRouter();
  const sp = useSearchParams();

  const initialClub = sp.get('clubId') ?? CLUBS[0];
  const [club, setClub] = useState(initialClub);
  const [search, setSearch] = useState('');

  const updateClubQuery = (next: string) => {
    const nextQS = new URLSearchParams(sp.toString());
    nextQS.set('clubId', next);
    router.replace(`?${nextQS.toString()}`);
    setClub(next);
  };

  const handleReset = () => {
    setClub(CLUBS[0]);
    setSearch('');
    const nextQS = new URLSearchParams(sp.toString());
    nextQS.delete('clubId');
    router.replace(`?${nextQS.toString()}`);
  };

  return (
    <Flex gap="0.8rem" align="center" marginTop="1.8rem" marginBottom="3.2rem">
      <CommonDropdown
        options={CLUBS}
        value={club}
        placeholder="클럽 선택"
        onSelect={updateClubQuery}
        triggerHeight="4rem"
        listWidth="27.2rem"
        itemSize="large"
      />

      <SearchInput
        placeholder="지원자 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        width="30rem"
      />

      <Button variant="white" size="40" onClick={handleReset} width="4rem">
        <IcRefresh width={20} height={20} />
      </Button>

      <Button variant="main" size="40" width="8.4rem" onClick={() => {}}>
        검색
      </Button>
    </Flex>
  );
}
