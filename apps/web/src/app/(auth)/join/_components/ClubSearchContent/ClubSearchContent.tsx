'use client';
import React, { useState, ChangeEvent } from 'react';
import { Flex, Button, Text } from '@repo/ui';
import { InputField } from '@repo/ui/InputField';
import { IcInputSearch, IcClubModalError } from '@repo/ui/icons/colored';
import { useOrgSearchMutation } from '@web/store/mutation/useOrgSearchMutation';
import ClubItem from '../ClubItem/ClubItem';
import type { Org } from '@web/types/auth';
import { useClub } from '../../_context/ClubContext';

export default function ClubSearchContent() {
  const [keyword, setKeyword] = useState('');
  const { data: results, mutate: search } = useOrgSearchMutation();
  const { club: selectedClub, setClub } = useClub();

  const handleSearch = () => {
    if (keyword.trim()) search(keyword.trim());
  };

  return (
    <Flex direction="column" gap="1.6rem" height="45.1rem">
      {/* 검색 UI */}
      <Flex gap="1.2rem">
        <InputField
          placeholder="동아리명을 입력해주세요."
          value={keyword}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setKeyword(e.target.value)
          }
          width="30rem"
          size="club"
          icon={<IcInputSearch width={24} height={24} />}
        />
        <Button
          variant="sub"
          size="56"
          onClick={handleSearch}
          disabled={!keyword.trim()}
          width="6.8rem"
        >
          검색
        </Button>
      </Flex>

      {/* 결과 없을 때 */}
      {results && results.length === 0 && (
        <Flex
          direction="column"
          align="center"
          gap="0.8rem"
          width="100%"
          justify="center"
          height="100%"
        >
          <IcClubModalError width={48} height={48} />
          <Text
            variant="md2_text_regular"
            color="grayscale60"
            style={{ whiteSpace: 'pre-wrap', textAlign: 'center' }}
          >
            해당 동아리가 존재하지 않습니다.
            {''}다시 검색해주세요.
          </Text>
        </Flex>
      )}

      {/* 결과 리스트 */}
      <Flex direction="column" width="100%">
        {results?.map((org: Org) => (
          <ClubItem
            key={org.id}
            org={org}
            selectedId={selectedClub?.id ?? null}
            onSelect={(id, name) => {
              if (id !== null && name) {
                setClub({ id, name });
              } else {
                setClub(null);
              }
            }}
          />
        ))}
      </Flex>
    </Flex>
  );
}
