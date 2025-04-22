// pages/Page.tsx
'use client';
import React, { useCallback, useState } from 'react';
import { Flex } from '@repo/ui/Flex';
import {
  SelectableTimeTable,
  TimeRange,
} from '@web/components/TimeTable/SelectableTimeTable';
import { TimeTable, SlotItem } from '@web/components/TimeTable/TimeTable';
import { Chip } from '@repo/ui/Chips';
import { IcTimetablePlus, IcTimetableExpand } from '@repo/ui/icons/colored';
import { Text } from '@repo/ui/Text';
import { ProfileGroup } from '@web/components/ProfileGroup/ProfileGroup';
import * as styles from './page.css';

interface RawSlot {
  start: string; // "11:00"
  end: string; // "11:30"
  applicants: string[];
  interviewers: string[];
  guides: string[];
  color?: string; // 배경색
}

// API에서 아래 형태로 받는다고 가정
const rawSlots: RawSlot[] = [
  {
    start: '11:00',
    end: '11:30',
    applicants: ['김현호', '윤지원', '이채원', '이채원'],
    interviewers: [
      'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
      'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
      'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
      'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
      'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
    ],
    guides: [
      'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
      'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
      'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
      'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
    ],
    color: '#FFEEDE',
  },
  {
    start: '11:30',
    end: '12:00',
    applicants: ['김현호', '윤지원', '이채원', '이채원'],
    interviewers: [
      'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
      'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
      'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
      'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
      'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
    ],
    guides: [
      'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
      'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
      'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
      'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
    ],
    color: '#FFEEDE',
  },
  {
    start: '13:00',
    end: '14:00',
    applicants: ['김현호', '윤지원'],
    interviewers: [
      'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
      'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
    ],
    guides: [
      'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
      'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
      'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
      'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
    ],
    color: '#D9FFE2',
  },
];

// TimeTable이 요구하는 형식으로 변환
const slots: SlotItem[] = rawSlots.map((s) => ({
  startTime: s.start,
  endTime: s.end,
  color: s.color,
}));

export default function Page() {
  const common = {
    title: '2025년 04월 12일 (토)',
    interval: 30,
    startHour: 10,
    endHour: 18,
  };

  const common2 = {
    title: '면접장 A',
    headers: ['지원자', '면접관', '안내자'],
    interval: 30,
    startHour: 10,
    endHour: 18,
    width: '51.45rem',
    slots,
  };

  const [selectedRange, setSelectedRange] = useState<TimeRange | null>(null);
  const handleRangeSelect = useCallback(
    (r: TimeRange | null) => setSelectedRange(r),
    []
  );

  return (
    <Flex gap="4rem">
      <SelectableTimeTable
        {...common}
        onRangeSelect={handleRangeSelect}
        width="40rem"
      />

      <TimeTable
        {...common2}
        renderCell={(row) => {
          const time = `${String(Math.floor((10 * 60 + row * 30) / 60)).padStart(2, '0')}:${String(
            (row * 30) % 60
          ).padStart(2, '0')}`;
          // rawSlots에서 매칭
          const raw = rawSlots.find((s) => s.start === time);
          if (!raw) return null;

          return (
            <Flex
              align="center"
              width="100%"
              paddingLeft="3.7rem"
              paddingRight="3.7rem"
            >
              {/* 지원자 */}
              <Flex
                align="center"
                gap="0.8rem"
                width="13.3rem"
                marginRight="4.1rem"
              >
                {raw.applicants.slice(0, 2).map((n) => (
                  <Chip key={n} bg="grayscale5" color="grayscale70">
                    {n}
                  </Chip>
                ))}
                {raw.applicants.length > 2 && (
                  <Text variant="xs_caption_medium" color="grayscale70">
                    +{raw.applicants.length - 2}
                  </Text>
                )}
              </Flex>

              {/* 면접관 */}
              <Flex marginRight="5rem">
                <ProfileGroup images={raw.interviewers} maxVisible={3} />
              </Flex>

              {/* 안내자 + 버튼 */}

              <ProfileGroup images={raw.guides} maxVisible={2} />

              <Flex align="center" gap="0.4rem">
                <button className={styles.buttonStyle}>
                  <IcTimetablePlus width={16} height={16} />
                </button>
                <button className={styles.buttonStyle}>
                  <IcTimetableExpand width={16} height={16} />
                </button>
              </Flex>
            </Flex>
          );
        }}
      />
    </Flex>
  );
}
