'use client';

import React, { useState, ChangeEvent } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { CheckBox } from '@repo/ui/CheckBox';
import { SearchInput } from '@repo/ui/SearchInput';
import { Profile } from '@repo/ui/Profile';
import { User } from '@web/types/organization';
import * as styles from './MemberAssignmentPanel.css';
import { vars } from '@repo/theme';
import { Button } from '@repo/ui/Button';
import { IcDeleteRight, IcPlusLeft } from '@repo/ui/icons/mono';

interface Props {
  addedMembers: User[];
  availableMembers: User[];
  onAdd: (u: User) => void;
  onRemove: (u: User) => void;
}

export default function MemberAssignmentPanel({
  addedMembers,
  availableMembers,
  onAdd,
  onRemove,
}: Props) {
  const [search, setSearch] = useState('');
  const [selAdded, setSelAdded] = useState<Set<string>>(new Set());
  const [selAvail, setSelAvail] = useState<Set<string>>(new Set());

  // 검색어에 매칭되는 항목만 보여주기
  const filteredAdded = addedMembers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredAvail = availableMembers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  // 전체선택 여부
  const allAdded =
    filteredAdded.length > 0 && filteredAdded.every((u) => selAdded.has(u.id));
  const allAvail =
    filteredAvail.length > 0 && filteredAvail.every((u) => selAvail.has(u.id));

  // 토글 함수
  const toggleAdded = (id: string) => {
    const nxt = new Set(selAdded);
    nxt.has(id) ? nxt.delete(id) : nxt.add(id);
    setSelAdded(nxt);
  };
  const toggleAvail = (id: string) => {
    const nxt = new Set(selAvail);
    nxt.has(id) ? nxt.delete(id) : nxt.add(id);
    setSelAvail(nxt);
  };

  return (
    <div className={styles.root}>
      {/* 타이틀 + 공통 검색창 */}
      <Text variant="md1_text_semibold" color="grayscale90">
        멤버 할당
      </Text>
      <div style={{ height: '4rem' }}>
        <SearchInput
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          placeholder="검색"
          width="100%"
        />
      </div>

      {/* 2개 패널 */}
      <div className={styles.panels}>
        {/* — 추가된 멤버 패널 — */}
        <div className={styles.panel}>
          <Flex align="center" gap="0.8rem">
            <Text variant="md2_text_semibold" color="grayscale70">
              추가된 멤버
            </Text>
            <Text variant="md2_text_medium" color="grayscale30">
              {addedMembers.length}
            </Text>
          </Flex>
          <Flex align="center" width="100%" gap="0.8rem" paddingLeft="0.6rem">
            <div style={{ width: '2rem', height: '2rem' }}>
              <CheckBox
                size={2}
                isChecked={allAdded}
                onChange={() => {
                  if (allAdded) setSelAdded(new Set());
                  else {
                    const all = new Set(filteredAdded.map((u) => u.id));
                    setSelAdded(all);
                  }
                }}
              />
            </div>

            <Button
              disabled={selAdded.size === 0}
              onClick={() => {
                filteredAdded.forEach((u) => {
                  if (selAdded.has(u.id)) onRemove(u);
                });
                setSelAdded(new Set());
              }}
              variant="stroke"
              size="32"
              leftIcon={<IcDeleteRight />}
            >
              제외
            </Button>
          </Flex>

          <div className={styles.list}>
            {filteredAdded.map((u) => {
              const nameParts = search
                ? u.name.split(new RegExp(`(${search})`, 'gi'))
                : [u.name];
              return (
                <Flex
                  key={u.id}
                  align="center"
                  className={`${styles.item} ${
                    selAdded.has(u.id) ? styles.selectedItem : ''
                  }`}
                  gap="0.8rem"
                >
                  <div
                    style={{
                      marginRight: '0.4rem',
                      height: '2rem',
                      width: '2rem',
                    }}
                  >
                    <CheckBox
                      size={2}
                      isChecked={selAdded.has(u.id)}
                      onChange={() => toggleAdded(u.id)}
                    />
                  </div>
                  <Profile src={u.profileUrl!} alt={u.name} size={24} />
                  <Text variant="sm_caption_regular" color="grayscale90">
                    {nameParts.map((part, idx) =>
                      search && part.toLowerCase() === search.toLowerCase() ? (
                        <span key={idx} className={styles.highlight}>
                          {part}
                        </span>
                      ) : (
                        <React.Fragment key={idx}>{part}</React.Fragment>
                      )
                    )}
                  </Text>
                  <Text variant="xs_caption_regular" color="grayscale50">
                    {u.email}
                  </Text>
                </Flex>
              );
            })}
          </div>
        </div>

        {/* — 추가하지 않은 멤버 패널 — */}
        <div className={styles.panel}>
          <Flex align="center" gap="0.8rem">
            <Text variant="md2_text_semibold" color="grayscale70">
              추가하지 않은 멤버
            </Text>
            <Text variant="md2_text_medium" color="grayscale30">
              {availableMembers.length}
            </Text>
          </Flex>

          <Flex align="center" width="100%" gap="0.8rem" paddingLeft="0.6rem">
            <div style={{ width: '2rem', height: '2rem' }}>
              <CheckBox
                size={2}
                isChecked={allAvail}
                onChange={() => {
                  if (allAvail) setSelAvail(new Set());
                  else {
                    const all = new Set(filteredAvail.map((u) => u.id));
                    setSelAvail(all);
                  }
                }}
              />
            </div>
            <Button
              disabled={selAvail.size === 0}
              onClick={() => {
                filteredAvail.forEach((u) => {
                  if (selAvail.has(u.id)) onAdd(u);
                });
                setSelAvail(new Set());
              }}
              variant="stroke"
              size="32"
              leftIcon={<IcPlusLeft />}
            >
              추가
            </Button>
          </Flex>

          <div className={styles.list}>
            {filteredAvail.map((u) => {
              const nameParts = search
                ? u.name.split(new RegExp(`(${search})`, 'gi'))
                : [u.name];
              return (
                <Flex
                  key={u.id}
                  align="center"
                  className={`${styles.item} ${
                    selAvail.has(u.id) ? styles.selectedItem : ''
                  }`}
                  gap="0.8rem"
                >
                  <div
                    style={{
                      marginRight: '0.4rem',
                      height: '2rem',
                      width: '2rem',
                    }}
                  >
                    <CheckBox
                      size={2}
                      isChecked={selAvail.has(u.id)}
                      onChange={() => toggleAvail(u.id)}
                    />
                  </div>
                  <Profile src={u.profileUrl!} alt={u.name} size={24} />
                  <Text variant="sm_caption_regular" color="grayscale90">
                    {nameParts.map((part, idx) =>
                      search && part.toLowerCase() === search.toLowerCase() ? (
                        <span key={idx} className={styles.highlight}>
                          {part}
                        </span>
                      ) : (
                        <React.Fragment key={idx}>{part}</React.Fragment>
                      )
                    )}
                  </Text>
                  <Text variant="xs_caption_regular" color="grayscale50">
                    {u.email}
                  </Text>
                </Flex>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
