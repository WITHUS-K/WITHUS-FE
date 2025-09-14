'use client';
import React, { useMemo, useState, ChangeEvent, KeyboardEvent } from 'react';
import { Flex, Button, Text } from '@repo/ui';
import { InputField } from '@repo/ui/InputField';
import { IcClubModalError } from '@repo/ui/icons/colored';
import ClubItem from '@web/app/(main)/_components/AffiliationModal/ClubItem';

export type Org = { id: number; name: string; inviteCode: string };

// 임시 목데이터 (초대 코드 → 단체)
const MOCK_ORGS: Org[] = [
  { id: 1, name: 'KUSITMS', inviteCode: '123456' },
  { id: 2, name: '큐시즘2', inviteCode: '234567' },
  { id: 3, name: '큐시즘3', inviteCode: '345678' },
];

export default function ClubAddContent() {
  const [code, setCode] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onSubmit = () => setSubmitted(code.trim());

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && code.trim()) onSubmit();
  };

  const result = useMemo(() => {
    if (!submitted) return null;
    return MOCK_ORGS.find((org) => org.inviteCode === submitted) ?? null;
  }, [submitted]);

  const notFound = submitted && !result;

  return (
    <Flex direction="column" gap="2rem" marginBottom="2.8rem">
      {/* 초대 코드 입력 */}
      <Flex gap="1.2rem">
        <InputField
          placeholder="검색"
          value={code}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCode(e.target.value)
          }
          onKeyDown={onKeyDown}
          width="30rem"
          size="search"
        />
        <Button
          variant="sub"
          size="40"
          onClick={onSubmit}
          disabled={!code.trim()}
          width="6.8rem"
        >
          확인
        </Button>
      </Flex>

      {/* 결과 없음 */}
      {notFound && (
        <Flex
          direction="column"
          align="center"
          gap="1.2rem"
          justify="center"
          height="100%"
          width="100%"
          marginTop="2.8rem"
        >
          <IcClubModalError width={48} height={48} />
          <Text
            variant="md2_text_regular"
            color="grayscale60"
            style={{ textAlign: 'center', whiteSpace: 'pre-line' }}
          >
            {`해당 단체가 존재하지 않습니다.\n다시 입력해주세요.`}
          </Text>
        </Flex>
      )}

      {/* 결과 있음 */}
      <Flex direction="column" width="100%">
        {result && (
          <ClubItem
            org={result}
            selectedId={selectedId}
            onSelect={(id) => setSelectedId(id)}
          />
        )}
      </Flex>
    </Flex>
  );
}
