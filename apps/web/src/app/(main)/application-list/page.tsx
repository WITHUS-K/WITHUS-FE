'use client';
import { Button, Flex, SearchInput, Text } from '@repo/ui';
import { IcFileUpload, IcRefresh } from '@repo/ui/icons/mono';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  RecruitmentCard,
  RecruitmentCardProps,
} from './_components/RecruitmentCard/RecruitmentCard';
import { dummyRecruitmentCardList } from '@web/constants/recuritmentList';
import { Breadcrumb } from '@repo/ui/Breadcrumb';

const generateId = () =>
  Math.random().toString(36).substring(2, 8).toUpperCase();

export default function ApplicationList() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [cards, setCards] = useState<RecruitmentCardProps[]>(() => [
    ...dummyRecruitmentCardList,
  ]);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleModify = (id: string) => {
    router.push(`/application-list/setting/${id}`);
  };

  const handleCopy = (id: string) => {
    setCards((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx === -1) return prev;
      const orig = prev[idx]!;
      const copy: RecruitmentCardProps = {
        ...orig,
        id: generateId(),
      };
      const next = [...prev];
      next.splice(idx + 1, 0, copy);
      return next;
    });
  };

  const handleDelete = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <Flex
      direction="column"
      paddingLeft="2.4rem"
      paddingTop="1.8rem"
      paddingRight="2.4rem"
      paddingBottom="1.8rem"
      width="100%"
    >
      <Breadcrumb style={{ marginBottom: '2.4rem' }}>
        <Breadcrumb.Item active>지원서 리스트</Breadcrumb.Item>
      </Breadcrumb>
      {/* 헤더 - 제목 */}
      <Text variant="xl_title_semibold" color="black">
        지원서 리스트
      </Text>

      <Flex
        align="center"
        justify="spaceBetween"
        width="100%"
        marginTop="1.2rem"
      >
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
        {cards
          .filter(
            (c) =>
              c.recruitTitle.includes(search) ||
              c.currentApplicantList.some((a) => a.position.includes(search))
          )
          .map((card) => (
            <RecruitmentCard
              key={card.id}
              {...card}
              onModify={() => handleModify(card.id)}
              onCopy={() => handleCopy(card.id)}
              onDelete={() => handleDelete(card.id)}
            />
          ))}
      </Flex>
    </Flex>
  );
}
