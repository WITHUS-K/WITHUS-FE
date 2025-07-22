'use client';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import { Flex, Text } from '@repo/ui';
import { IcArrowRight } from '@repo/ui/icons/mono';
import { vars } from '@repo/theme';
export type EvaluationStage = 'schedule' | 'timetable';

const LABEL_MAP: Record<
  EvaluationStage,
  {
    title: string;
    desc: string;
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
      <Breadcrumb>
        <Breadcrumb.Item>면접 평가</Breadcrumb.Item>
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>

      <Text variant="xl_title_semibold" color="black">
        {title}
      </Text>

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
