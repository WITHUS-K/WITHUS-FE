'use client';

import React, { useMemo, useState } from 'react';
import { Text } from '@repo/ui/Text';
import * as styles from './InviteRecipientsModalContent.css';
import {
  RecipientUser,
  useRecipientsStore,
} from '@web/store/state/useRecipientsStore';
import { SearchInput } from '@repo/ui/InputField';
import { useApplicantsSearchQuery } from '@web/store/query/useApplicantsSearchQuery';
import { IcTagDelete } from '@repo/ui/icons/colored';
import SelectedUserItem from './SelectedUserItem';
import { useSearchParams } from 'next/navigation';

export default function InviteRecipientsModalContent() {
  const { recipients, addRecipient, removeRecipient } = useRecipientsStore();
  const searchParams = useSearchParams();
  const recruitmentId = Number(searchParams.get('recruitmentId') ?? 0);

  const [keyword, setKeyword] = useState('');
  const { data: items = [] } = useApplicantsSearchQuery(recruitmentId, keyword);

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    if (!k) return [];
    return items;
  }, [items, keyword]);

  const onPick = (user: RecipientUser) => addRecipient(user);

  return (
    <div className={styles.root}>
      {/* 상단 선택 태그 영역 */}
      <div className={styles.selectedArea}>
        <Text
          variant="sm_caption_semibold"
          color="grayscale70"
          style={{ width: '7.6rem' }}
        >
          받는 사람
        </Text>

        <div className={styles.tagWrap} role="list">
          {recipients.map((u) => (
            <div key={u.id} className={styles.tag}>
              {u.name}
              <button
                type="button"
                onClick={() => removeRecipient(u.id)}
                aria-label="삭제"
                style={{ height: '1.5rem' }}
              >
                <IcTagDelete width={12} height={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 검색바 */}
      <div className={styles.searchRow}>
        <SearchInput
          placeholder="메일 또는 이름을 입력해주세요."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          keepSearchIcon
        />
      </div>

      <div className={styles.selectedList}>
        {filtered.map((u) => {
          const alreadySelected = recipients.some((r) => r.id === u.id);

          return (
            <SelectedUserItem
              key={u.id}
              user={u as any}
              onRemove={removeRecipient}
              onSelect={() => onPick(u)}     
              disabled={alreadySelected}      
            />
          );
        })}
      </div>
    </div>
  );
}
