'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import { ClubDropdown } from '@repo/ui/DropDown';
import { Text } from '@repo/ui/Text';
import { Flex } from '@repo/ui/Flex';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';
import {
  useOrganizationInterviewsQuery,
  OrgInterviewInfo,
} from '@web/store/query/useOrganizationInterviewsQuery';

export type EvaluationStage = 'schedule' | 'timetable';

const LABEL_MAP: Record<EvaluationStage, { title: string; desc: string }> = {
  schedule: {
    title: '면접 시간 선택',
    desc: '가능한 시간대를 모두 선택해주세요.\n제출 이후에 시간대 변경을 원하시면, 관리자에게 직접 연락 바랍니다.',
  },
  timetable: {
    title: '내 면접 시간 조회',
    desc: '시간대 변경을 원하시면, 관리자에게 직접 연락 바랍니다.',
  },
};

export function EvaluationHeader({ stage }: { stage: EvaluationStage }) {
  const router = useRouter();
  const search = useSearchParams();
  const params = useParams();
  const tab = params.tab as string;
  const ivParam = search.get('interviewId');
  const { organizationId } = getClientSideTokens();

  // 조직의 면접 목록
  const { data: orgs = [], isLoading } =
    useOrganizationInterviewsQuery(organizationId);

  const titles = orgs.map((o) => o.recruitmentTitle);
  const [selectedTitle, setSelectedTitle] = useState<string>(() => {
    if (ivParam) {
      return (
        orgs.find((o) => o.interviewId === Number(ivParam))?.recruitmentTitle ??
        ''
      );
    }
    return '';
  });

  // 첫 렌더 시, interviewId 없으면 첫 면접으로 리다이렉트
  useEffect(() => {
    if (!isLoading && orgs.length > 0 && !ivParam) {
      const first = orgs[0]!;
      setSelectedTitle(first.recruitmentTitle);

      const base =
        stage === 'schedule'
          ? `/interview-evaluation/schedule`
          : `/interview-evaluation/timetable/${tab}`;

      // 첫 번째 면접의 첫 번째 날짜
      const defaultDate =
        first.availableTimeRanges[0]?.date.replace(/\./g, '-') ?? '';

      router.replace(
        `${base}` +
          `?interviewId=${first.interviewId}` +
          `&recruitmentId=${first.recruitmentId}` +
          (stage === 'timetable' && defaultDate ? `&date=${defaultDate}` : '')
      );
    }
  }, [isLoading, orgs, ivParam, router, stage, tab]);

  // 드롭다운 바꿀 때
  const handleSelect = useCallback(
    (title: string) => {
      setSelectedTitle(title);
      const info = orgs.find((o) => o.recruitmentTitle === title)!;
      // 루트 페이지로만 이동. 이후 EvaluationClient가 hasSubmitted 체크 후 schedule/timetable으로 분기
      router.replace(`/interview-evaluation?interviewId=${info.interviewId}`);
    },
    [orgs, router, stage, tab]
  );

  const { title, desc } = LABEL_MAP[stage];

  return (
    <Flex direction="column" gap="1rem" align="flexStart">
      <Breadcrumb>
        <Breadcrumb.Item>면접 평가</Breadcrumb.Item>
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>

      {titles.length > 0 && (
        <ClubDropdown
          clubs={titles}
          value={selectedTitle}
          onSelect={handleSelect}
        />
      )}

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
