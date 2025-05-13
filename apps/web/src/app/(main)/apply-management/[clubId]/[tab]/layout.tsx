'use client';

import { useParams, useRouter } from 'next/navigation';
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
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();

  const rawClubId = params.clubId;
  const rawTab = params.tab;

  const fallbackClubId = clubs[0]!.id;
  const fallbackTab = TAB_KEYS[0];

  const clubId =
    (Array.isArray(rawClubId) ? rawClubId[0] : rawClubId) ?? fallbackClubId;

  const activeTab = (Array.isArray(rawTab) ? rawTab[0] : rawTab) ?? fallbackTab;

  // 탭별 카운트: 실제 API 호출로 교체
  const counts = {
    documents: 12,
    interviews: 8,
    final: 3,
    rejected: 5,
  };

  const selectedClub =
    clubs.find((c) => c.id === clubId)?.name ?? clubs[0]!.name;

  // 클럽 변경
  const onClubChange = (newName: string) => {
    const found = clubs.find((c) => c.name === newName);
    if (found) {
      router.push(`/apply-management/${found.id}/${activeTab}`);
    }
  };

  // 탭 변경
  const onTabChange = (newTab: string) => {
    router.push(`/apply-management/${clubId}/${newTab}`);
  };

  // 평가 기준 설정 클릭
  const goToCriteria = () => {};

  return (
    <>
      <Flex direction="column" width="100%" height="100%" padding="2.4rem">
        {/* 1. 브레드스크럼 + 버튼 */}
        <Flex direction="column" width="100%" gap="0.4rem" align="flexStart">
          <Breadcrumb>
            <Breadcrumb.Item>지원 현황 관리</Breadcrumb.Item>
          </Breadcrumb>

          <Flex width="100%" justify="spaceBetween">
            <ClubDropdown
              value={selectedClub}
              clubs={clubs.map((c) => c.name)}
              onSelect={onClubChange}
            />
            <Button
              variant="white"
              size="40"
              width="16.3rem"
              onClick={goToCriteria}
              leftIcon={<IcCriteriaBtn />}
            >
              평가 기준 설정
            </Button>
          </Flex>

          {/* 3. 탭바 */}
          <div style={{ width: '100%', marginTop: '0.8rem' }}>
            <TabBar
              tabs={TAB_KEYS as unknown as string[]}
              active={activeTab}
              counts={counts}
              onChange={onTabChange}
            />
          </div>
        </Flex>

        {/* 4. 탭별 화면 */}
        <Flex width="100%" marginTop="2.4rem">
          {children}
        </Flex>
      </Flex>
      {modal}
    </>
  );
}
