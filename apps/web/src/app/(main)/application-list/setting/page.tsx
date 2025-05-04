'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import { Button } from '@repo/ui/Button';
import { TabBar } from '@repo/ui/TabBar';
import { IcLinkCopy, IcPreview, IcSave } from '@repo/ui/icons/mono';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';

type TabKey = 'form' | 'stages' | 'criteria';
const TAB_KEYS: TabKey[] = ['form', 'stages', 'criteria'];

export default function Setting() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeTab = (searchParams.get('tab') as TabKey) || 'form';

  const onTabChange = (tab: TabKey) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.replace(`/application-list/setting?${params.toString()}`);
  };

  const handleTabChange = (tab: string) => {
    onTabChange(tab as TabKey);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'form':
        return <p>여기에 “지원서 양식 설정” 컴포넌트를 넣으세요.</p>;
      case 'stages':
        return <p>여기에 “리크루팅 단계 구성” 컴포넌트를 넣으세요.</p>;
      case 'criteria':
        return <p>여기에 “평가 기준 설정” 컴포넌트를 넣으세요.</p>;
      default:
        return null;
    }
  };

  return (
    <Flex
      direction="column"
      padding="2.4rem"
      width="100%"
      height="100%"
      gap="1.2rem"
    >
      {/*Breadcrumb */}
      <Breadcrumb style={{ marginTop: '1.2rem' }}>
        <Breadcrumb.Item asChild>
          <Link href="/application-list">지원서 리스트</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>지원서 상세 설정</Breadcrumb.Item>
      </Breadcrumb>

      {/* 2) 헤더: 타이틀 + 버튼들 */}
      <Flex align="center" justify="spaceBetween" width="100%">
        <Text variant="xl_title_semibold" color="black">
          지원서 상세 설정
        </Text>
        <Flex align="center" gap="0.8rem">
          <Button
            variant="sub"
            leftIcon={<IcLinkCopy width={24} height={24} />}
            size="40"
            width="14.6rem"
          >
            응답자 링크
          </Button>
          <Button
            variant="sub"
            leftIcon={<IcPreview width={24} height={24} />}
            size="40"
            width="12.8rem"
          >
            미리보기
          </Button>
          <Button
            variant="sub"
            leftIcon={<IcSave width={24} height={24} />}
            size="40"
            width="13.2rem"
          >
            임시 저장
          </Button>
          <Button variant="main" size="40" disabled width="10rem">
            완료
          </Button>
        </Flex>
      </Flex>

      {/* TabBar*/}
      <TabBar
        tabs={TAB_KEYS}
        active={activeTab}
        onChange={handleTabChange}
        showIndicator={true}
      />

      {/* 탭 컨텐츠 */}
      <Flex width="100%">{renderContent()}</Flex>
    </Flex>
  );
}
