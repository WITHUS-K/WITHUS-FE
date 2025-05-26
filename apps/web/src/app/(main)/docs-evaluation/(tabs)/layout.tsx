'use client';

import { ReactNode } from 'react';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import { Text } from '@repo/ui/Text';
import FilterBar from '../_components/FilterBar/FilterBar';
import { TabBar } from '@repo/ui/TabBar';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

const TABS = ['all', 'BEFORE', 'COMPLETED'];

export default function TabsLayout({ children }: { children: ReactNode }) {
  const { tab } = useParams() as { tab?: string };
  const activeTab = tab ?? 'all';

  const router = useRouter();
  const sp = useSearchParams();
  const params = useParams();
  const qs = sp.toString();
  const id = params.id;

  const handleTabChange = (next: string) => {
    const base = `/docs-evaluation/${next}`;
    router.replace(qs ? `${base}?${qs}` : base);
  };

  return (
    <div style={{ width: '100%' }}>
      {!id && (
        <>
          <Breadcrumb>
            <Breadcrumb.Item active>서류 평가</Breadcrumb.Item>
          </Breadcrumb>
          <Text
            variant="xl_title_semibold"
            style={{ margin: '0.8rem 0 1.6rem' }}
          >
            서류 평가
          </Text>
          <FilterBar />
          <TabBar
            tabs={TABS as unknown as string[]}
            active={activeTab}
            onChange={handleTabChange}
          />
        </>
      )}

      <div style={{ marginTop: '4rem' }}>{children}</div>
    </div>
  );
}
