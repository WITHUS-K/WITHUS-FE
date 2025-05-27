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
import { useAdminApplicationsQuery } from '@web/store/query/useAdminApplicationsQuery';

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

  const recruitmentIdStr = search.get('recruitmentId') ?? '';
  const recruitmentId = Number(recruitmentIdStr);

  const { data: recs = [] } = useRecruitmentsQuery();

  const options = recs.map((r) => ({
    id: String(r.recruitmentId),
    name: r.title,
  }));

  const { data: adminData } = useAdminApplicationsQuery({
    recruitmentId,
    stage: 'DOCUMENT', // 이 값은 counts 전체를 반환해 주기 때문에, 아무 stage나 넣어도 OK
    page: 0,
    size: 1, // 리스트는 필요 없으니 size 최소로
  });

  const counts = {
    documents: adminData?.counts.document ?? 0,
    interviews: adminData?.counts.interview ?? 0,
    final: adminData?.counts.finalPass ?? 0,
    rejected: adminData?.counts.fail ?? 0,
  };

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
    options.find((o) => o.id === recruitmentIdStr)?.name ?? names[0] ?? '';

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
                counts={counts}
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
