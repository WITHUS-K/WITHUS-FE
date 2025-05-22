'use client';
import {
  useRouter,
  usePathname,
  useParams,
  useSearchParams,
} from 'next/navigation';
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
  const id = params.id as string | undefined;
  const router = useRouter();
  const pathname = usePathname()!;
  const sp = useSearchParams();
  const qs = sp.toString(); // 기존 ?interviewId=xxx 등

  const active = TABS.find((t) => pathname.endsWith(`/${t}`)) ?? 'interviewer';

  return (
    <Flex
      direction="column"
      width="100%"
      height="100%"
      align={!id ? 'center' : 'flexStart'}
      gap={!id ? '4rem' : '0'}
      marginTop={!id ? '3.2rem' : '0'}
    >
      {!id && (
        <TabBar
          tabs={TABS}
          active={active}
          onChange={(t) => {
            const base = `/interview-evaluation/timetable/${t}`;
            // 쿼리스트링이 있으면 붙여주고, 없으면 그대로
            router.push(qs ? `${base}?${qs}` : base);
          }}
        />
      )}
      {children}
    </Flex>
  );
}
