'use client';

import { ChangeEvent } from 'react';
import { SearchInput } from '@repo/ui/SearchInput';
import { Button } from '@repo/ui/Button';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import {
  IcButtonDelete,
  IcButtonInvite,
  IcButtonSetting,
} from '@repo/ui/icons/mono';
import { useRouter } from 'next/navigation';

interface Props {
  search: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedCount: number;
  totalCount: number;
  onDelete: () => void;
}

export default function OrgSearchToolbar({
  search,
  onSearchChange,
  selectedCount,
  totalCount,
  onDelete,
}: Props) {
  const router = useRouter();

  const openInviteModal = () => {
    router.push('/organization/invite');
  };

  const goSettings = () => {
    router.push('/organization/settings');
  };

  return (
    <Flex
      align="center"
      justify="spaceBetween"
      width="100%"
      marginBottom="1.2rem"
    >
      <Flex align="center" gap="0.8rem">
        <SearchInput
          placeholder="검색"
          value={search}
          onChange={onSearchChange}
          width="30rem"
        />
        <Button
          variant="white"
          size="40"
          width="10rem"
          disabled={selectedCount === 0}
          leftIcon={<IcButtonDelete />}
          onClick={onDelete}
        >
          삭제
        </Button>
        <Text variant="sm_caption_medium" color="grayscale60">
          전체 {totalCount}건
        </Text>
      </Flex>

      <Flex align="center" gap="0.8rem">
        <Button
          variant="sub"
          size="40"
          width="16.3rem"
          leftIcon={<IcButtonSetting />}
          onClick={goSettings}
        >
          파트 세부 설정
        </Button>
        <Button
          variant="main"
          size="40"
          width="10rem"
          leftIcon={<IcButtonInvite />}
          onClick={openInviteModal}
        >
          초대
        </Button>
      </Flex>
    </Flex>
  );
}
