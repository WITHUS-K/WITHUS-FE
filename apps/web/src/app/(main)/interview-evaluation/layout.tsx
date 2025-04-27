'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Flex } from '@repo/ui';
import {
  EvaluationHeader,
  EvaluationStage,
} from './_components/EvaluationHeader/EvaluationHeader';

export default function EvaluationLayout({
  children,
}: {
  children: ReactNode;
}) {
  const path = usePathname()!;
  // URL에 따라 현재 단계를 결정
  const stage = ((): EvaluationStage | undefined => {
    if (path.startsWith('/interview-evaluation/schedule')) return 'schedule';
    if (path.startsWith('/interview-evaluation/timetable')) return 'timetable';
    return undefined;
  })();

  return (
    <Flex direction="column" width="100%" height="100%" padding="2.4rem">
      {/* 단계가 식별되면 헤더를 렌더 */}
      {stage && <EvaluationHeader stage={stage} />}

      {/* 본문 */}
      <div style={{ width: '100%' }}>{children}</div>
    </Flex>
  );
}
