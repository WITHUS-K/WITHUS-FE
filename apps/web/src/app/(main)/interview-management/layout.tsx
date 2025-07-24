// app/(main)/interview-management/InterviewLayout.tsx
'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Filters from './_components/Filters/Filters';
import { Flex } from '@repo/ui/Flex';
import { IcCalendar } from '@repo/ui/icons/colored';
import { Text } from '@repo/ui/Text';
import { useInterviewConfigQuery } from '@web/store/query/useInterviewConfigQuery';

export default function InterviewLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  //timetable 경로인지 확인
  const isTimetable = pathname.includes('/interview-management/timetable/');
  //URL 에 interviewId 가 있는지
  const ivParam = searchParams.get('interviewId');
  const interviewId = ivParam ? Number(ivParam) : undefined;
  const ridParam = searchParams.get('recruitmentId');

  // 리셋 후 config 가 모두 초기값일 때(true)만큼, 리다이렉트 스킵
  const { data: config } = useInterviewConfigQuery(interviewId ?? 0);
  const isConfigEmpty =
    config &&
    config.roomNames.length === 0 &&
    config.interviewerCount === 0 &&
    config.applicantCount === 0 &&
    config.assistantCount === 0;

  useEffect(() => {
    // 인터뷰 ID 없고, config 가 “리셋 직후” 상태가 아닐 때만 튕겨내기
    if (isTimetable && !interviewId && ridParam && !isConfigEmpty) {
      router.replace(`/interview-management?recruitmentId=${ridParam}`);
    }
  }, [isTimetable, interviewId, ridParam, router, isConfigEmpty]);

  // 기본 detail 페이지 구분은 그대로
  const isDetail = pathname.includes('/application/');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: '2.4rem',
      }}
    >
      {!isDetail && <Filters />}

      {/*
        timetable 경로 + interviewId 없으면 placeholder,
           그렇지 않으면 자식 렌더
      */}
      {!interviewId || isConfigEmpty ? (
        <Flex
          direction="column"
          align="center"
          justify="center"
          width="100%"
          height="100%"
          gap="2rem"
        >
          <IcCalendar width={48} height={48} />
          <Text variant="lg_subtitle_medium" color="grayscale30">
            동아리와 면접 조건을 설정한 후,
            <br />
            타임테이블을 생성하면 이곳에 표시됩니다.
          </Text>
        </Flex>
      ) : (
        children
      )}
    </div>
  );
}
