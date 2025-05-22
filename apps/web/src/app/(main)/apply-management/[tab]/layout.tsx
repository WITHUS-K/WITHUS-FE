'use client';

import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { ReactNode } from 'react';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import { Flex } from '@repo/ui/Flex';
import { Button } from '@repo/ui/Button';
import { ClubDropdown } from '@repo/ui/DropDown';
import { TabBar } from '@repo/ui/TabBar';
import { IcCriteriaBtn } from '@repo/ui/icons/mono';

const clubs = [
  { id: '0', name: '큐시즘 32기 학회원 리크루팅' },
  { id: '1', name: '클럽 A' },
  { id: '2', name: '클럽 B' },
];
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
  const clubId = search.get('clubId') ?? clubs[0]!.id;

  const onClubChange = (newName: string) => {
    const found = clubs.find((c) => c.name === newName);
    if (found) {
      router.push(`/apply-management/${tab}?clubId=${found.id}`);
    }
  };
  const onTabChange = (newTab: string) => {
    router.push(`/apply-management/${newTab}?clubId=${clubId}`);
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
                value={clubs.find((c) => c.id === clubId)?.name}
                clubs={clubs.map((c) => c.name)}
                onSelect={onClubChange}
              />
              <Button
                variant="white"
                size="40"
                width="16.3rem"
                leftIcon={<IcCriteriaBtn />}
              >
                평가 기준 설정
              </Button>
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
