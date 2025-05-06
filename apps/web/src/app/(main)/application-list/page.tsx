'use client';
import { Button, Flex, SearchInput, Text } from '@repo/ui';
import { IcFileUpload, IcRefresh } from '@repo/ui/icons/mono';
import { dummyRecruitmentCardList } from '@web/constants/recuritmentList';
import { ChangeEvent, useState } from 'react';
import { RecruitmentCard } from './_components/RecruitmentCard/RecruitmentCard';

export default function ApplicationList() {
  const [search, setSearch] = useState('');

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <Flex direction="column" width="100%">
      {/* 헤더 - 제목 */}
      <Text variant="xl_title_semibold" color="black">
        지원서 리스트
      </Text>
      {/* 헤더 아래 부분 */}
      <Flex align="center" justify="spaceBetween" width="100%">
        <Flex gap="0.8rem">
          <SearchInput
            placeholder="검색"
            value={search}
            onChange={onSearchChange}
            width="30rem"
          />
          <Button
            variant="white"
            size="40"
            width="4rem"
            style={{ alignSelf: 'center', paddingTop: '0.4rem' }}
            // onClick={onDelete}
          >
            <IcRefresh width={16} height={16} />
          </Button>
        </Flex>
        <Button
          variant="main"
          size="48"
          width="14.6rem"
          leftIcon={<IcFileUpload width={24} height={24} />}
        >
          <Text variant="md2_text_medium" color="white">
            지원서 생성
          </Text>
        </Button>
      </Flex>
      {/* 공고 리스트 */}
      <Flex direction="column" gap="1.2rem" marginTop="1.2rem" width="100%">
        {dummyRecruitmentCardList.map((cardProps, idx) => (
          <RecruitmentCard key={idx} {...cardProps} />
        ))}
      </Flex>
    </Flex>
  );
}
