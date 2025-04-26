'use client';

import { Flex, Text } from '@repo/ui';
import { IcArrowRight } from '@repo/ui/icons/mono';
import { vars } from '@repo/theme';

export type EvaluationStage = 'schedule' | 'timetable';

const LABEL_MAP: Record<
  EvaluationStage,
  {
    title: string;
    desc: string; // 문자열 하나로 변경
  }
> = {
  schedule: {
    title: '면접 시간 조율',
    desc: '가능한 시간대를 모두 선택해주세요.\n제출 이후에 시간대 변경을 원하시면, 관리자에게 직접 연락 바랍니다.',
  },
  timetable: {
    title: '내 면접 시간 조회',
    desc: '시간대 변경을 원하시면, 관리자에게 직접 연락 바랍니다.',
  },
};

export function EvaluationHeader({ stage }: { stage: EvaluationStage }) {
  const { title, desc } = LABEL_MAP[stage];

  return (
    <Flex direction="column" gap="0.5rem" width="100%">
      {/* 1) Breadcrumb */}
      <Flex align="center" gap="0.5rem">
        <Text variant="md2_text_medium" color="grayscale40">
          면접 평가
        </Text>
        <IcArrowRight width={15} height={15} color={vars.colors.grayscale40} />
        <Text variant="md2_text_medium" color="grayscale90">
          {title}
        </Text>
      </Flex>

      {/* 2) Page Title */}
      <Text variant="xl_title_semibold" color="black">
        {title}
      </Text>

      {/* 3) Description (여러 줄) */}
      <Text
        variant="md1_text_regular"
        color="grayscale90"
        style={{ whiteSpace: 'pre-wrap', marginTop: '2rem' }}
      >
        {desc}
      </Text>
    </Flex>
  );
}
