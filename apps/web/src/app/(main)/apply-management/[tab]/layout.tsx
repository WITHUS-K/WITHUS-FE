'use client';

import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import { Flex } from '@repo/ui/Flex';
import { Button } from '@repo/ui/Button';
import { ClubDropdown } from '@repo/ui/DropDown';
import { TabBar } from '@repo/ui/TabBar';
import { IcCriteriaBtn } from '@repo/ui/icons/mono';
import { useRecruitmentsQuery } from '@web/store/query/useRecruitmentsQuery';

const TAB_KEYS = ['documents', 'interviews', 'final', 'rejected'] as const;

export default function ClubLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const search = useSearchParams();

  const tab = Array.isArray(params.tab) ? params.tab[0] : params.tab!;
  const id = params.id;

  const recruitmentId = search.get('recruitmentId') ?? '';
  const { data: recs = [] } = useRecruitmentsQuery();

  const options = recs.map((r) => ({
    id: String(r.recruitmentId),
    name: r.title,
  }));

  useEffect(() => {
    if (!recruitmentId && options.length > 0) {
      router.replace(
        `/apply-management/${tab}?recruitmentId=${options[0]!.id}`
      );
    }
  }, [recruitmentId, options, tab, router]);

  // 렌더링 시엔 이미 URL 에 붙어 있을테니
  const names = options.map((o) => o.name);
  const selectedName =
    options.find((o) => o.id === recruitmentId)?.name ?? names[0] ?? '';

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
          height: '100%',
          width: '100%',
          padding: '2.4rem',
        }}
      >
        {!id && (
          <Flex direction="column" gap="0.4rem" align="flexStart" width="100%">
            <Breadcrumb>
              <Breadcrumb.Item>지원 현황 관리</Breadcrumb.Item>
            </Breadcrumb>
            <Flex width="100%" justify="spaceBetween">
              <ClubDropdown
                value={selectedName}
                clubs={names}
                onSelect={onClubChange}
              />
            </Flex>

            <div style={{ width: '100%', marginTop: '0.8rem' }}>
              <TabBar
                tabs={TAB_KEYS as unknown as string[]}
                active={tab!}
                counts={{
                  documents: 12,
                  interviews: 8,
                  final: 3,
                  rejected: 5,
                }}
                onChange={onTabChange}
              />
            </div>
          </Flex>
        )}

        <Flex width="100%" marginTop={!id ? '2.4rem' : '0'}>
          {children}
        </Flex>
      </div>
      {modal}
    </>
  );
}
