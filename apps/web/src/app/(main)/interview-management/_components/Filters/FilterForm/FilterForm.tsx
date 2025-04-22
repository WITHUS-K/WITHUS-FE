'use client';
import React, { useState } from 'react';
import { Flex, Text } from '@repo/ui';
import { InputChip } from '@repo/ui/Chips';
import { Chip } from '@repo/ui/Chips';
import { Stepper } from '@repo/ui/Stepper';
import { IcPlus24 } from '@repo/ui/icons/colored';
import * as styles from './FilterForm.css';

const PART_COLOR_MAP: Record<
  string,
  {
    bg: keyof typeof import('@repo/theme').colors;
    color: keyof typeof import('@repo/theme').colors;
  }
> = {
  기획: { bg: 'orangeBg', color: 'orangeT' },
  디자인: { bg: 'greenBg', color: 'greenT' },
  프론트엔드: { bg: 'primary5', color: 'primary50' },
  백엔드: { bg: 'pinkBg', color: 'pinkT' },
};

export default function FilterForm({
  club,
  parts,
}: {
  club: string;
  parts: string[];
}) {
  const [rooms, setRooms] = useState<string[]>(['']);
  const addRoom = () => rooms.length < 3 && setRooms((r) => [...r, '']);
  const updateRoom = (i: number, v: string) =>
    setRooms((r) => {
      const c = [...r];
      c[i] = v;
      return c;
    });
  const delRoom = (i: number) =>
    setRooms((r) => r.filter((_, idx) => idx !== i));

  // 스테퍼 카운터
  const [counts, setCounts] = useState({ 면접관: 1, 지원자: 1, 안내자: 1 });
  const onCountChange = (name: string, next: number) =>
    setCounts((c) => ({ ...c, [name]: Math.max(1, next) }));

  return (
    <div className={styles.wrapper}>
      <Flex align="center" gap="7.2rem">
        {/* 면접실 입력 */}
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
                onDelete={() => delRoom(i)}
              />
            ))}
            {rooms.length < 3 && (
              <button onClick={addRoom}>
                <IcPlus24 width={24} height={24} />
              </button>
            )}
          </Flex>
        </Flex>

        {/* 면접파트: 서버에서 받은 parts 리스트 보여주기만 */}
        <Flex align="center" gap="2rem">
          <Text variant="md2_text_medium" color="grayscale6D">
            면접파트
          </Text>
          <Flex gap="1.2rem">
            {parts.map((p) => {
              const map = PART_COLOR_MAP[p] || {
                bg: 'grayscale5',
                color: 'grayscale80',
              };
              return (
                <Chip
                  key={p}
                  bg={map.bg}
                  color={map.color}
                  style={{ padding: '0.6rem 0.8rem' }}
                >
                  {p}
                </Chip>
              );
            })}
          </Flex>
        </Flex>
      </Flex>

      {/* 스테퍼 카운터들 */}
      <Flex align="center" gap="7.2rem">
        <Flex align="center" gap="2rem">
          <Text variant="md2_text_medium" color="grayscale6D">
            면접관 수
          </Text>
          <Stepper
            name="면접관"
            value={counts.면접관}
            onChange={onCountChange}
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
          />
        </Flex>
      </Flex>
    </div>
  );
}
