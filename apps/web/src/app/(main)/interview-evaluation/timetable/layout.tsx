'use client';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { Flex } from '@repo/ui';
import { TabBar } from '@repo/ui/TabBar';

const TABS = ['interviewer', 'guide'];

export default function TimetableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const tab = params.tab as string;
  const date = params.date as string;
  const time = params.time as string | undefined;
  const router = useRouter();
  const pathname = usePathname()!;

  const active = TABS.find((t) => pathname.endsWith(`/${t}`)) ?? 'interviewer';

  return (
    <Flex
      direction="column"
      width="100%"
      height="100%"
      align={!time ? 'center' : 'flexStart'}
      gap={!time ? '4rem' : '0'}
      marginTop="3.2rem"
    >
      {!time && (
        <TabBar
          tabs={TABS}
          active={active}
          onChange={(tab) =>
            router.push(`/interview-evaluation/timetable/${tab}`)
          }
        />
      )}
      {children}
    </Flex>
  );
}
