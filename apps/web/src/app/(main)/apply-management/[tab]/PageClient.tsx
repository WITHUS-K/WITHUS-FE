'use client';

import React, { ReactNode, useEffect } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import { Flex } from '@repo/ui/Flex';
import { ClubDropdown } from '@repo/ui/DropDown';
import { TabBar } from '@repo/ui/TabBar';
import { useRecruitmentsQuery } from '@web/store/query/useRecruitmentsQuery';
import { useAdminApplicationsQuery } from '@web/store/query/useAdminApplicationsQuery';
import TabClient from './TabClient';
import { container } from './layout.css';

const TAB_KEYS = ['documents', 'interviews', 'final', 'rejected'];

export default function PageClient({
  recId,
  modal,
}: {
  recId?: number;
  modal?: string[];
}) {
  const router = useRouter();
  const params = useParams();
  const search = useSearchParams();

  const tab = Array.isArray(params.tab) ? params.tab[0] : params.tab!;

  const recIdStr =
    recId != null ? String(recId) : (search.get('recruitmentId') ?? '');
  const recruitmentId = Number(recIdStr);

  const { data: recs = [] } = useRecruitmentsQuery();
  const options = recs.map((r) => ({
    id: String(r.recruitmentId),
    name: r.title,
  }));

  const { data: adminData } = useAdminApplicationsQuery({
    recruitmentId,
    stage: 'DOCUMENT',
    page: 0,
    size: 1,
  });
  const counts = {
    documents: adminData?.counts.document ?? 0,
    interviews: adminData?.counts.interview ?? 0,
    final: adminData?.counts.finalPass ?? 0,
    rejected: adminData?.counts.fail ?? 0,
  };

  // 처음 진입 시 recruitmentId가 없으면 첫 옵션으로 리다이렉트
  useEffect(() => {
    if ((!recIdStr || isNaN(recruitmentId)) && options.length > 0) {
      router.replace(
        `/apply-management/${tab}?recruitmentId=${options[0]!.id}`
      );
    }
  }, [recIdStr, recruitmentId, options, tab, router]);

  // 드롭다운에 표시할 선택된 조직 이름
  const selectedName =
    options.find((o) => o.id === recIdStr)?.name ?? options[0]?.name ?? '';

  const onClubChange = (newName: string) => {
    const found = options.find((o) => o.name === newName);
    if (found) {
      router.push(`/apply-management/${tab}?recruitmentId=${found.id}`);
    }
  };

  const onTabChange = (newTab: string) => {
    router.push(`/apply-management/${newTab}?recruitmentId=${recruitmentId}`);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          padding: '2.4rem',
        }}
      >
        {!isNaN(recruitmentId) && (
          <Flex direction="column" gap="0.4rem" align="flexStart" width="100%">
            <Breadcrumb>
              <Breadcrumb.Item>지원 현황 관리</Breadcrumb.Item>
            </Breadcrumb>
            <Flex width="100%" justify="spaceBetween">
              <ClubDropdown
                value={selectedName}
                clubs={options.map((o) => o.name)}
                onSelect={onClubChange}
              />
            </Flex>
            <div style={{ width: '100%', marginTop: '0.8rem' }}>
              <TabBar
                tabs={[...TAB_KEYS]}
                active={tab!}
                counts={counts}
                onChange={onTabChange}
              />
            </div>
          </Flex>
        )}
        <Flex
          width="100%"
          paddingBottom="1.5rem"
          height="100%"
          marginTop={!isNaN(recruitmentId) ? '2.4rem' : '0'}
        >
          <TabClient />
        </Flex>
      </div>
    </>
  );
}
