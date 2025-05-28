'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import { Flex } from '@repo/ui/Flex';
import { DatePicker } from '@repo/ui/DatePicker';
import { CommonDropdown } from '@repo/ui/CommonDropdown';
import { Button } from '@repo/ui/Button';
import { Text } from '@repo/ui/Text';
import { IcTrash } from '@repo/ui/icons/colored';
import { IcPlusCircle } from '@repo/ui/icons/mono';
import { format, startOfDay, parseISO } from 'date-fns';
import { FormValues, InterviewScheduleItem } from '@web/types/application';
import { TIME_STEP } from '@web/utils/application';
import * as styles from '../../StageTab.css';

export default function InterviewPanel() {
  const { control, setValue } = useFormContext<FormValues>();

  const {
    fields: persistedFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'interviewSchedule.scheduleList',
  });

  const activeSection = useWatch({ control, name: 'activeSection' }) as string;
  const activeIndex = useMemo<number | null>(() => {
    if (
      typeof activeSection === 'string' &&
      activeSection.startsWith('interview-')
    ) {
      const idx = Number(activeSection.split('-')[1]);
      return Number.isNaN(idx) ? null : idx;
    }
    return null;
  }, [activeSection]);

  const persisted = useMemo(
    () => persistedFields.map((slot, idx) => ({ ...slot, idx })),
    [persistedFields]
  );

  // persisted 슬롯을 날짜별로 그룹화
  const groups = useMemo(() => {
    const map = new Map<string, (InterviewScheduleItem & { idx: number })[]>();
    persisted.forEach((slot) => {
      if (!slot.date) return;
      const arr = map.get(slot.date) || [];
      arr.push(slot);
      map.set(slot.date, arr);
    });
    return Array.from(map.entries()).map(([date, slots]) => ({ date, slots }));
  }, [persisted]);

  // 현재 활성화된 그룹 데이터 선택 (범위 밖이거나 없으면 빈 그룹)
  const currentGroup = useMemo(() => {
    if (
      activeIndex !== null &&
      activeIndex >= 0 &&
      activeIndex < groups.length
    ) {
      return groups[activeIndex];
    }
    return { date: '', slots: [] };
  }, [activeIndex, groups]);

  const isNewGroup = currentGroup!.date === '';

  const [localSlots, setLocalSlots] = useState<InterviewScheduleItem[]>([]);

  // 선택된 날짜 초기화 (그룹 날짜 또는 오늘)
  const [selDate, setSelDate] = useState<Date>(() =>
    currentGroup!.date
      ? startOfDay(parseISO(currentGroup!.date))
      : startOfDay(new Date())
  );

  // 그룹 날짜 변경 시 selDate 동기화
  useEffect(() => {
    if (currentGroup!.date) {
      setSelDate(startOfDay(parseISO(currentGroup!.date)));
    }
  }, [currentGroup!.date]);

  const duration = useWatch({ control, name: 'interviewDuration' }) as
    | '15분'
    | '30분'
    | '1시간';
  const step = TIME_STEP[duration];
  const timeOptions = useMemo(() => {
    const arr: string[] = [];
    for (let m = 0; m < 24 * 60; m += step) {
      const hh = String(Math.floor(m / 60)).padStart(2, '0');
      const mm = String(m % 60).padStart(2, '0');
      arr.push(`${hh}:${mm}`);
    }
    return arr;
  }, [step]);

  // 로컬 슬롯 추가
  const onAddLine = () => {
    const newDate = format(selDate, 'yyyy-MM-dd');
    setLocalSlots((prev) => [
      ...prev,
      { date: newDate, startTime: '', endTime: '' },
    ]);
  };

  // 로컬 슬롯 업데이트
  const updateLocal = (
    idx: number,
    key: 'startTime' | 'endTime',
    val: string
  ) => {
    setLocalSlots((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, [key]: val } : s))
    );
  };

  // 로컬 슬롯 삭제
  const onRemoveLocal = (idx: number) => {
    setLocalSlots((prev) => prev.filter((_, i) => i !== idx));
  };

  // 로컬 슬롯 폼에 제출 (등록)
  const onSubmit = () => {
    persistedFields
      .map((slot, idx) => ({ slot, idx }))
      .filter(({ slot }) => !slot.date)
      .map(({ idx }) => idx)
      .sort((a, b) => b - a)
      .forEach((i) => remove(i));

    localSlots.forEach((slot) => append(slot));
    setLocalSlots([]);
  };

  // 현재 그룹 전체 슬롯 삭제
  const onClearAll = () => {
    const idxs = currentGroup!.slots.map((s) => s.idx).sort((a, b) => b - a);
    idxs.forEach((i) => remove(i));
    setLocalSlots([]);
  };

  const allSlots = useMemo(
    () => [
      // 기존 그룹일 때만 persisted 슬롯 보여주기
      ...(!isNewGroup
        ? currentGroup!.slots.map((s) => ({
            ...s,
            isPersisted: true as const,
            idx: s.idx,
          }))
        : []),
      // 항상 로컬 슬롯은 표시
      ...localSlots.map((f, i) => ({
        ...f,
        isPersisted: false as const,
        idx: i,
      })),
    ],
    [currentGroup!.slots, localSlots, isNewGroup]
  );

  return (
    <Flex direction="column" width="100%" gap="1.6rem">
      {/* 헤더 영역 */}
      <Flex align="center" width="100%" gap="30.1rem">
        <Text variant="md1_text_semibold" color="grayscale70">
          면접 일정
        </Text>
        <Text variant="md1_text_semibold" color="grayscale70">
          면접 시간
        </Text>
      </Flex>

      {/* 본문: 달력 + 시간 입력 영역 */}
      <Flex gap="3.2rem" width="100%" height="100%">
        <DatePicker selectedDate={selDate} onSelect={setSelDate} />

        <Flex direction="column" width="100%">
          <div className={styles.timescroll}>
            {allSlots.map((slot, i) => (
              <Flex key={i} align="center" gap="1.2rem" width="100%">
                <CommonDropdown
                  options={timeOptions}
                  value={slot.startTime || undefined}
                  placeholder="HH:MM"
                  listWidth="14rem"
                  onSelect={(v) =>
                    slot.isPersisted
                      ? setValue(
                          `interviewSchedule.scheduleList.${slot.idx}.startTime`,
                          v
                        )
                      : updateLocal(slot.idx, 'startTime', v)
                  }
                />
                <Text variant="md2_text_medium" color="grayscale40">
                  –
                </Text>
                <CommonDropdown
                  options={timeOptions}
                  value={slot.endTime || undefined}
                  placeholder="HH:MM"
                  listWidth="14rem"
                  onSelect={(v) =>
                    slot.isPersisted
                      ? setValue(
                          `interviewSchedule.scheduleList.${slot.idx}.endTime`,
                          v
                        )
                      : updateLocal(slot.idx, 'endTime', v)
                  }
                />
                <button
                  type="button"
                  onClick={() =>
                    slot.isPersisted
                      ? remove(slot.idx)
                      : onRemoveLocal(slot.idx)
                  }
                >
                  <IcTrash width={32} height={32} />
                </button>
              </Flex>
            ))}

            {/* 면접 시간 추가 버튼 */}
            <Button
              type="button"
              variant="stroke"
              size="40"
              leftIcon={<IcPlusCircle width={20} height={20} />}
              onClick={onAddLine}
              width="100%"
            >
              면접 시간 추가
            </Button>
          </div>

          {/* 하단 액션 버튼 */}
          <Flex gap="1.6rem" width="100%">
            <Button
              type="button"
              variant="basic"
              size="40"
              disabled={currentGroup!.slots.length + localSlots.length === 0}
              onClick={onClearAll}
            >
              일정 전체 삭제
            </Button>
            <Button
              type="button"
              variant="main"
              size="40"
              disabled={localSlots.length === 0}
              onClick={onSubmit}
            >
              등록
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
