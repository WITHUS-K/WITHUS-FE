'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Flex, Text, Button } from '@repo/ui';
import { ClubDropdown } from '@repo/ui/DropDown';
import FilterForm from './FilterForm/FilterForm';
import { IcRefresh, IcSave } from '@repo/ui/icons/colored';
import { timetableDates } from '@web/constants/timetable';
import { useModal } from '@repo/ui/hooks';

export default function Filters() {
  const router = useRouter();
  const { confirm } = useModal();

  const clubList = [
    '2025-1학기 큐시즘 리크루팅',
    '큐시즘짱',
    '위더스짱',
    '위더스최고',
    '위더스멋있어',
    '동아리이름',
    '동아리이름2',
    '동아리이름3',
  ];

  const [club, setClub] = useState(clubList[0]!);
  const [created, setCreated] = useState(false);
  const [filterKey, setFilterKey] = useState(0);

  const [parts] = useState<string[]>([
    '기획',
    '디자인',
    '프론트엔드',
    '백엔드',
  ]);

  const firstDate = timetableDates[0];

  const handleGenerate = () => {
    if (created) {
      // 타임테이블 재생성일 때 → 폼 초기화
      setCreated(false);
      setFilterKey((prev) => prev + 1);
      router.replace('/interview-management');
    } else {
      // 타임테이블 생성
      setCreated(true);
      router.push(
        `/interview-management/timetable/all/${firstDate}?club=${encodeURIComponent(club)}`
      );
    }
  };

  const handleSave = () => {
    confirm({
      type: 'info',
      description:
        '면접 타임테이블을 저장하시겠습니까?\n저장 후에도 언제든지 수정할 수 있습니다.',
      cancelText: '취소',
      confirmText: '저장',
      onConfirm: () => {
        // 실제 저장 로직
      },
    });
  };

  return (
    <Flex direction="column" width="100%" gap="2.5rem">
      <Flex direction="column" gap="0.5rem" width="100%">
        <Text variant="md2_text_medium" color="grayscale50">
          면접관리
        </Text>

        <Flex justify="spaceBetween" align="center" width="100%">
          <ClubDropdown
            onSelect={(selectedClub) => {
              setClub(selectedClub);
              setCreated(false);
              router.replace('/interview-management');
            }}
            clubs={clubList}
            value={club}
          />
          <Flex gap="2rem">
            <Button
              variant="sub"
              size="40"
              leftIcon={<IcRefresh width={24} height={24} />}
              onClick={handleGenerate}
              style={{ padding: '0.8rem 2rem' }}
            >
              {created ? '타임테이블 재생성' : '타임테이블 생성'}
            </Button>
            <Button
              variant="main"
              size="40"
              leftIcon={<IcSave width={24} height={24} />}
              disabled={!created}
              onClick={handleSave}
              style={{ padding: '0.8rem 2rem' }}
            >
              저장
            </Button>
          </Flex>
        </Flex>
      </Flex>

      {club && (
        <FilterForm key={`${club}-${filterKey}`} club={club} parts={parts} />
      )}
    </Flex>
  );
}
