import { InputField } from '@repo/ui/InputField';
import * as styles from './InviteModal.css';
import { IcInputSearch } from '@repo/ui/icons/colored';
import { Flex } from '@repo/ui/Flex';
import { ChangeEvent, KeyboardEvent } from 'react';
import SelectedUserItem from './SelectedUserItem';
import { User } from '@web/types/organization';

export type InviteContentProps = {
  search: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  selected: User[];
  onRemove: (id: string) => void;
};

export default function InviteContent({
  search,
  onSearchChange,
  selected,
  onRemove,
  onSearchKeyDown,
}: InviteContentProps) {
  return (
    <Flex direction="column" gap="1.2rem" width="100%">
      {/* 검색 */}
      <InputField
        placeholder="검색"
        value={search}
        icon={<IcInputSearch width={24} height={24} />}
        onChange={onSearchChange}
        onKeyDown={onSearchKeyDown}
        width="100%"
        size="search"
      />

      {/* 선택된 계정 리스트 */}
      <div className={styles.listContainer}>
        {selected.map((user) => (
          <SelectedUserItem key={user.id} user={user} onRemove={onRemove} />
        ))}
      </div>
    </Flex>
  );
}
