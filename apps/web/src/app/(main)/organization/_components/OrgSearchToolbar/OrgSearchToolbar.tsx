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
import { IcCode } from '@repo/ui/icons/mono';
import * as styles from './OrgSearchToolbar.css';
import { useToast } from '@repo/ui/hooks';

interface Props {
  search: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedCount: number;
  totalCount: number;
  onDelete: () => void;
  code?: string;
}

export default function OrgSearchToolbar({
  search,
  onSearchChange,
  selectedCount,
  totalCount,
  onDelete,
  code,
}: Props) {
  const router = useRouter();
  const toast = useToast();

  const openInviteModal = () => {
    router.push('/organization/invite');
  };

  const goSettings = () => {
    router.push('/organization/settings');
  };

  const handleCopyCode = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      toast?.success('초대코드가 복사되었습니다.');
    } catch (err) {
      toast?.error('복사에 실패했습니다. 다시 시도해주세요.');
    }
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
        <button
          type="button"
          className={styles.button}
          onClick={handleCopyCode}
        >
          <Text variant="sm_caption_medium" color="grayscale80">
            초대코드: {code ?? '-'}
          </Text>
          <IcCode width={18} height={18} />
        </button>
        <Button
          variant="sub"
          size="40"
          width="13.2rem"
          leftIcon={<IcButtonSetting />}
          onClick={goSettings}
        >
          세부 설정
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
