'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Flex } from '@repo/ui';
import { TabBar } from '@repo/ui/TabBar';

const TABS = ['interviewer', 'guide'];

export default function TimetableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname()!;

  const active = TABS.find((t) => pathname.endsWith(`/${t}`)) ?? 'interviewer';

  return (
    <Flex
      direction="column"
      width="100%"
      height="100%"
      align="center"
      gap="4rem"
      marginTop="3.2rem"
    >
      <TabBar
        tabs={TABS}
        active={active}
        onChange={(tab) =>
          router.push(`/interview-evaluation/timetable/${tab}`)
        }
      />
      {children}
    </Flex>
  );
}
