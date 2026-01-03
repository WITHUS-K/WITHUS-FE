import { InputField, SearchInput } from '@repo/ui/InputField';
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
  searchResult: User | null;
  onToggle: (user: User) => void;
  isSearching: boolean;
  isLoading: boolean;
};

export default function InviteContent({
  search,
  onSearchChange,
  onSearchKeyDown,
  selected,
  onRemove,
  searchResult,
  onToggle,
  isSearching,
  isLoading,
}: InviteContentProps) {
  return (
    <Flex direction="column" gap="1.2rem" width="100%">
      <SearchInput
        placeholder="초대 코드 전송하려는 이메일 주소 입력해주세요."
        value={search}
        onChange={onSearchChange}
        onKeyDown={onSearchKeyDown}
        width="100%"
        isLoading={isLoading}
      />

      <div className={styles.listContainer}>
        {isSearching
          ? searchResult && (
              <SelectedUserItem
                user={searchResult}
                onRemove={onRemove}
                showCheckbox={true}
                isChecked={selected.some((u) => u.email === searchResult.email)}
                onToggle={() => onToggle(searchResult)}
              />
            )
          : selected.map((user) => (
              <SelectedUserItem key={user.id} user={user} onRemove={onRemove} />
            ))}
      </div>
    </Flex>
  );
}
