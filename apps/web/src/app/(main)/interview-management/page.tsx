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
import {
  ProfileGroup,
  ProfileItem,
} from '@web/components/ProfileGroup/ProfileGroup';
import { Callout } from '@repo/ui/Callout';
import * as styles from './page.css';
import { rawSlots } from '@web/constants/timetable';

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
                  <Callout
                    trigger={
                      <Text variant="xs_caption_medium" color="grayscale70">
                        +{raw.applicants.length - 2}
                      </Text>
                    }
                    texts={raw.applicants.slice(2)}
                    position="bottom"
                    offsetX="0.2rem"
                  />
                )}
              </Flex>

              {/* 면접관 */}
              <Flex marginRight="5rem">
                <ProfileGroup
                  items={raw.interviewers}
                  maxVisible={3}
                  size={23}
                />
              </Flex>

              {/* 안내자 */}
              <ProfileGroup items={raw.guides} maxVisible={2} size={23} />

              {/* 액션 버튼 */}
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
