'use client';

import React, {
  useMemo,
  useState,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
} from 'react';
import { Flex, Button, Text, Spinner } from '@repo/ui';
import { InputField } from '@repo/ui/InputField';
import { IcClubModalError } from '@repo/ui/icons/colored';
import ClubItem from './ClubItem';
import { useOrganizationByInviteCodeQuery } from '@web/store/query/useOrganizationByInviteCodeQuery';
import { vars } from '@repo/theme';

export type Org = { id: number; name: string };

export default function AffiliationContent({
  onSelectChange,
}: {
  onSelectChange?: (org: Org | null) => void;
}) {
  const [code, setCode] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onSubmit = () => setSubmitted(code.trim());
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && code.trim()) onSubmit();
  };

  const { data, isFetching, isError, isFetched, isSuccess } =
    useOrganizationByInviteCodeQuery(submitted);

  const result: Org | null = useMemo(() => {
    if (!submitted) return null;
    return data ? { id: data.id, name: data.name } : null;
  }, [submitted, data]);

  useEffect(() => {
    onSelectChange?.(selectedId && result ? result : null);
  }, [selectedId, result, onSelectChange]);

  return (
    <Flex direction="column" gap="2rem" marginBottom="2.8rem">
      {/* 입력 */}
      <Flex gap="1.2rem">
        <InputField
          placeholder="초대 코드를 입력하세요"
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

      {submitted && isFetched && !isFetching && !result && (
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

      {submitted && isFetching && (
        <Flex
          align="center"
          justify="center"
          height="100%"
          width="100%"
          marginTop="2.8rem"
        >
          <Spinner size={32} strokeWidth={1} color={vars.colors.grayscale60} />
        </Flex>
      )}

      {submitted && !!result && !isFetching && (
        <Flex direction="column" width="100%">
          <ClubItem
            org={result}
            selectedId={selectedId}
            onSelect={(id) => setSelectedId(id)}
          />
        </Flex>
      )}
    </Flex>
  );
}
