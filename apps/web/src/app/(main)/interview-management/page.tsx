'use client';

import { Flex } from '@repo/ui/Flex';
import {
  SelectableTimeTable,
  TimeRange,
} from '@web/components/TimeTable/SelectableTimeTable';
import { useCallback, useState } from 'react';
import { TimeTable } from '@web/components/TimeTable/TimeTable';
import { Chip } from '@repo/ui/Chips';
import { IcTimetableExpand, IcTimetablePlus } from '@repo/ui/icons/colored';
import * as styles from './page.css';
import { Text } from '@repo/ui/Text';
import { ProfileGroup } from '@web/components/ProfileGroup/ProfileGroup';

interface SlotData {
  applicants: string[];
  interviewers: string[];
  guides: string[];
}

const slotData: Record<number, SlotData> = {
  2: {
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
  },
  3: {
    applicants: ['김현호', '윤지원', '이채원', '이채원'],
    interviewers: ['/a.jpg', '/b.jpg', '/c.jpg'],
    guides: ['/d.jpg', '/e.jpg', '/f.jpg'],
  },
  4: {
    applicants: ['김현호', '윤지원'],
    interviewers: ['/a.jpg', '/b.jpg', '/c.jpg'],
    guides: ['/d.jpg', '/e.jpg', '/f.jpg'],
  },
};

export default function Page() {
  const common = {
    title: '2025년 04월 12일 (토)',
    interval: 30,
    startHour: 10,
    endHour: 18,
  };

  const common2 = {
    title: '면접실 B',
    headers: ['지원자', '면접관', '안내자'],
    interval: 30,
    startHour: 10,
    endHour: 18,
    width: '51.45rem',
  };

  const [selectedRange, setSelectedRange] = useState<TimeRange | null>(null);
  const handleRangeSelect = useCallback((range: TimeRange | null) => {
    setSelectedRange(range);
    // 선택된 시간대 사용 로직…
  }, []);

  return (
    <Flex gap="4rem">
      <SelectableTimeTable
        {...common}
        width="40rem"
        onRangeSelect={handleRangeSelect}
      />

      <TimeTable
        {...common2}
        renderCell={(row) => {
          const slot = slotData[row];
          if (!slot) return null;

          return (
            <Flex align="center" gap="1rem" style={{ width: '100%' }}>
              {/* 지원자 */}
              <Flex align="center" gap="0.8rem">
                {slot.applicants.slice(0, 2).map((name) => (
                  <Chip key={name} bg="grayscale5" color="grayscale70">
                    {name}
                  </Chip>
                ))}
                {slot.applicants.length > 2 && (
                  <Text
                    variant="xs_caption_medium"
                    color="grayscale70"
                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    +{slot.applicants.length - 2}
                  </Text>
                )}
              </Flex>

              {/* 면접관 */}
              <Flex align="center" gap="0.5rem">
                <ProfileGroup images={slot.interviewers} maxVisible={3} />
              </Flex>

              {/* 안내자 + 버튼 */}
              <Flex align="center" gap="0.5rem">
                <ProfileGroup images={slot.guides} maxVisible={2} />
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
