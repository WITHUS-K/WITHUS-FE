// app/(main)/interview-management/_components/FilterForm/FilterForm.tsx
'use client';

import { useEffect, useState } from 'react';
import { Flex, Text } from '@repo/ui';
import { InputChip } from '@repo/ui/Chips';
import { Stepper } from '@repo/ui/Stepper';
import { IcPlus24 } from '@repo/ui/icons/colored';
import { Tag } from '@repo/ui/Tag';
import type { TagColor } from '@repo/utils';
import * as styles from './FilterForm.css';

export interface FilterSettings {
  rooms: string[];
  interviewerPerSlot: number;
  applicantPerSlot: number;
  assistantPerSlot: number;
}

interface FilterFormProps {
  parts: string[];
  onSettingsChange: (s: FilterSettings) => void;
  disabled?: boolean;
}

const TAG_COLORS: TagColor[] = [
  '#FF2A3A',
  '#EE6B00',
  '#E2A500',
  '#009857',
  '#0084BC',
  '#2C60FF',
  '#813DFF',
  '#F25DEB',
  '#7F82A1',
  '#5A5C72',
];

export default function FilterForm({
  parts,
  onSettingsChange,
  disabled = false,
}: FilterFormProps) {
  const [rooms, setRooms] = useState<string[]>(['']);
  const addRoom = () =>
    !disabled && rooms.length < 3 && setRooms((r) => [...r, '']);
  const updateRoom = (i: number, v: string) =>
    !disabled &&
    setRooms((r) => {
      const a = [...r];
      a[i] = v;
      return a;
    });
  const deleteRoom = (i: number) =>
    !disabled && setRooms((r) => r.filter((_, idx) => idx !== i));

  const [counts, setCounts] = useState({ 면접관: 1, 지원자: 1, 안내자: 1 });
  const onCountChange = (name: string, next: number) => {
    if (disabled) return;
    setCounts((c) => ({ ...c, [name]: Math.max(1, next) }));
  };

  // parts 컬러 매핑
  const [partColorMap] = useState(() =>
    parts.reduce(
      (acc, p) => {
        acc[p] = TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)]!;
        return acc;
      },
      {} as Record<string, TagColor>
    )
  );

  useEffect(() => {
    onSettingsChange({
      rooms,
      interviewerPerSlot: counts.면접관,
      applicantPerSlot: counts.지원자,
      assistantPerSlot: counts.안내자,
    });
  }, [rooms, counts, onSettingsChange]);

  return (
    <div className={styles.wrapper}>
      <Flex align="center" gap="7.2rem">
        <Flex align="center" gap="2rem">
          <Text variant="md2_text_medium" color="grayscale6D">
            면접실
          </Text>
          <Flex gap="1.2rem" align="center">
            {rooms.map((val, i) => (
              <InputChip
                key={i}
                value={val}
                onChange={(v) => updateRoom(i, v)}
                onDelete={() => deleteRoom(i)}
                disabled={disabled}
              />
            ))}
            {!disabled && rooms.length < 3 && (
              <button onClick={addRoom}>
                <IcPlus24 width={24} height={24} />
              </button>
            )}
          </Flex>
        </Flex>
        <Flex align="center" gap="2rem">
          <Text variant="md2_text_medium" color="grayscale6D">
            면접파트
          </Text>
          <Flex gap="1.2rem">
            {parts.map((p) => (
              <Tag key={p} color={partColorMap[p]!}>
                {p}
              </Tag>
            ))}
          </Flex>
        </Flex>
      </Flex>
      <Flex align="center" gap="7.2rem">
        <Flex align="center" gap="2rem">
          <Text variant="md2_text_medium" color="grayscale6D">
            면접관 수
          </Text>
          <Stepper
            name="면접관"
            value={counts.면접관}
            onChange={onCountChange}
            disabled={disabled}
          />
        </Flex>
        <Flex align="center" gap="2rem">
          <Text variant="md2_text_medium" color="grayscale6D">
            지원자 수
          </Text>
          <Stepper
            name="지원자"
            value={counts.지원자}
            onChange={onCountChange}
            disabled={disabled}
          />
        </Flex>
        <Flex align="center" gap="2rem">
          <Text variant="md2_text_medium" color="grayscale6D">
            안내자 수
          </Text>
          <Stepper
            name="안내자"
            value={counts.안내자}
            onChange={onCountChange}
            disabled={disabled}
          />
        </Flex>
      </Flex>
    </div>
  );
}
