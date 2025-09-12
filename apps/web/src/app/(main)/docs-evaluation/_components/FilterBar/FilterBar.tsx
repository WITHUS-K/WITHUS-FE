'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchInput } from '@repo/ui/SearchInput';
import { Button } from '@repo/ui/Button';
import { IcRefresh } from '@repo/ui/icons/mono';
import { CommonDropdown } from '@repo/ui/CommonDropdown';
import { Flex } from '@repo/ui/Flex';
import {
  RecruitmentSummary,
  useRecruitmentsQuery,
} from '@web/store/query/useRecruitmentsQuery';
import { getCookie } from 'cookies-next';
import { useMyRecruitmentsQuery } from '@web/store/query/useMyRecruitmentsQuery';

export default function FilterBar() {
  const router = useRouter();
  const sp = useSearchParams();
  const orgIdRaw = getCookie('organizationId');
  const organizationId = orgIdRaw ? Number(orgIdRaw) : /* 기본값 처리 */ 0;

  const { data: recs = [] } = useMyRecruitmentsQuery({
    organizationId,
  });

  const paramIdRaw = sp.get('recruitmentId');
  const paramId = paramIdRaw ? Number(paramIdRaw) : undefined;

  const defaultRec = recs[0] as RecruitmentSummary | undefined;
  const selectedRec =
    recs.find((r) => r.recruitmentId === paramId) ?? defaultRec;

  const [keyword, setKeyword] = useState(sp.get('keyword') ?? '');

  useEffect(() => {
    if (!paramIdRaw && defaultRec) {
      const params = new URLSearchParams(sp.toString());
      params.set('recruitmentId', String(defaultRec.recruitmentId));
      params.set('page', '1');
      router.replace(`?${params.toString()}`);
    }
  }, [defaultRec, paramIdRaw, router, sp]);

  // 드롭다운에서 타이틀 선택 시
  const updateRecruitment = (title: string) => {
    const rec = recs.find((r) => r.title === title);
    if (!rec) return;
    const params = new URLSearchParams(sp.toString());
    params.set('recruitmentId', String(rec.recruitmentId));
    // 변경 시 페이지는 1로 리셋
    params.set('page', '1');
    router.replace(`?${params.toString()}`);
  };

  // 검색 버튼 클릭 시
  const handleSearch = () => {
    const params = new URLSearchParams(sp.toString());
    if (keyword) params.set('keyword', keyword);
    else params.delete('keyword');
    params.set('page', '1');
    router.replace(`?${params.toString()}`);
  };

  // 리셋 버튼 클릭 시
  const handleReset = () => {
    if (!defaultRec) return;
    const params = new URLSearchParams(sp.toString());
    params.set('recruitmentId', String(defaultRec.recruitmentId));
    params.delete('keyword');
    params.delete('page');
    router.replace(`?${params.toString()}`);
    setKeyword('');
  };

  return (
    <Flex gap="0.8rem" align="center" marginTop="1.8rem" marginBottom="3.2rem">
      <CommonDropdown
        options={recs.map((r) => r.title)}
        value={selectedRec?.title}
        placeholder="공고 선택"
        onSelect={updateRecruitment}
        triggerHeight="4rem"
        listWidth="100%"
        itemSize="large"
      />

      <SearchInput
        placeholder="지원자 검색"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        width="30rem"
      />

      <Button variant="white" size="40" onClick={handleReset} width="4rem">
        <IcRefresh width={20} height={20} />
      </Button>

      <Button variant="main" size="40" width="8.4rem" onClick={handleSearch}>
        검색
      </Button>
    </Flex>
  );
}
