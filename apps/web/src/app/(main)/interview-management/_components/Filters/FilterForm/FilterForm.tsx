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
import { TagHex } from '@web/utils/color';
import { IcRoomPlus } from '@repo/ui/icons/colored';

export interface FilterSettings {
  rooms: string[];
  interviewerPerSlot: number;
  applicantPerSlot: number;
  assistantPerSlot: number;
}

interface FilterFormProps {
  parts: string[];
  partColorMap: Record<string, TagHex>;
  initialSettings?: FilterSettings;
  onSettingsChange: (s: FilterSettings) => void;
  disabled?: boolean;
}

export default function FilterForm({
  parts,
  partColorMap,
  onSettingsChange,
  initialSettings,
  disabled = false,
}: FilterFormProps) {
  const [rooms, setRooms] = useState<string[]>(initialSettings?.rooms ?? ['']);
  const [counts, setCounts] = useState({
    면접관: initialSettings?.interviewerPerSlot ?? 0,
    지원자: initialSettings?.applicantPerSlot ?? 0,
    안내자: initialSettings?.assistantPerSlot ?? 0,
  });

  useEffect(() => {
    if (!initialSettings) return;

    const roomsEqual =
      rooms.length === initialSettings.rooms.length &&
      rooms.every((r, i) => r === initialSettings.rooms[i]);
    if (!roomsEqual) {
      setRooms(initialSettings.rooms);
    }

    const countsEqual =
      counts.면접관 === initialSettings.interviewerPerSlot &&
      counts.지원자 === initialSettings.applicantPerSlot &&
      counts.안내자 === initialSettings.assistantPerSlot;
    if (!countsEqual) {
      setCounts({
        면접관: initialSettings.interviewerPerSlot,
        지원자: initialSettings.applicantPerSlot,
        안내자: initialSettings.assistantPerSlot,
      });
    }
  }, [initialSettings, rooms, counts.면접관, counts.지원자, counts.안내자]);

  useEffect(() => {
    onSettingsChange({
      rooms,
      interviewerPerSlot: counts.면접관,
      applicantPerSlot: counts.지원자,
      assistantPerSlot: counts.안내자,
    });
  }, [rooms, counts, onSettingsChange]);

  const addRoom = () => {
    if (disabled || rooms.length >= 3) return;
    setRooms((prev) => [...prev, '']);
  };

  const updateRoom = (index: number, value: string) => {
    if (disabled) return;
    setRooms((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const deleteRoom = (index: number) => {
    if (disabled) return;
    setRooms((prev) => prev.filter((_, i) => i !== index));
  };

  const onCountChange = (name: string, next: number) => {
    if (disabled) return;
    setCounts((prev) => ({
      ...prev,
      [name]: Math.max(1, next),
    }));
  };

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
                <IcRoomPlus width={28} height={28} />
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
