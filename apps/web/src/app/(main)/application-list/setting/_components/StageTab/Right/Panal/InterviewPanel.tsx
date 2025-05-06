'use client';

import React, { useState, useMemo } from 'react';
import { useFormContext, useWatch, useFieldArray } from 'react-hook-form';
import { Flex } from '@repo/ui/Flex';
import { DatePicker } from '@repo/ui/DatePicker';
import { CommonDropdown } from '@repo/ui/CommonDropdown';
import { Button } from '@repo/ui/Button';
import { Text } from '@repo/ui/Text';
import { IcTrash } from '@repo/ui/icons/colored';
import { IcPlusCircle } from '@repo/ui/icons/mono';
import { format, startOfDay } from 'date-fns';
import { FormValues, InterviewScheduleItem } from '@web/types/application';
import { TIME_STEP } from '@web/utils/application';

export default function InterviewPanel() {
  const { control, watch, setValue } = useFormContext<FormValues>();

  // persisted 슬롯 (폼에 저장된 것)
  const {
    fields: persisted,
    append,
    remove,
  } = useFieldArray({
    name: 'interviewSchedule.scheduleList',
    control,
  });

  // duration
  const duration = useWatch({
    control,
    name: 'interviewDuration',
  }) as '15분' | '30분' | '1시간';

  // 달력에서 선택된 날짜
  const [selDate, setSelDate] = useState<Date>(startOfDay(new Date()));
  // 신규 입력 슬롯 (로컬)
  const [localSlots, setLocalSlots] = useState<InterviewScheduleItem[]>([]);
  const [startT, setStartT] = useState('');
  const [endT, setEndT] = useState('');

  // 시간 옵션
  const step = TIME_STEP[duration];
  const timeOptions = useMemo(() => {
    const opts: string[] = [];
    for (let m = 0; m < 24 * 60; m += step) {
      const hh = String(Math.floor(m / 60)).padStart(2, '0');
      const mm = String(m % 60).padStart(2, '0');
      opts.push(`${hh}:${mm}`);
    }
    return opts;
  }, [step]);

  // 1) 로컬 슬롯 추가 (화면에만 추가)
  const onAddLocal = () => {
    if (!startT || !endT) return;
    setLocalSlots((prev) => [
      ...prev,
      {
        date: format(selDate, 'yyyy-MM-dd'),
        startTime: startT,
        endTime: endT,
      },
    ]);
    setStartT('');
    setEndT('');
  };

  // 2) 로컬 슬롯 삭제
  const onRemoveLocal = (idx: number) => {
    setLocalSlots((prev) => prev.filter((_, i) => i !== idx));
  };

  // 3) 한꺼번에 폼에 커밋
  const onSubmit = () => {
    console.log('▶ onSubmit fired, localSlots=', localSlots);
    localSlots.forEach((slot) => append(slot));
    setLocalSlots([]);
    //setValue('activeSection', null);
  };

  // 4) 전체 삭제 (폼 + 로컬)
  const onClearAll = () => {
    // 폼 슬롯 삭제
    persisted.forEach((_, i) => remove(i));
    // 로컬 슬롯 초기화
    setLocalSlots([]);
    // setValue('activeSection', null);
  };

  // 화면 표시용 배열
  const allSlots = [
    ...persisted.map((f, i) => ({ ...f, isPersisted: true, idx: i })),
    ...localSlots.map((f, i) => ({ ...f, isPersisted: false, idx: i })),
  ];

  return (
    <Flex direction="column" gap="2.4rem">
      <Text variant="md1_text_semibold" color="grayscale70">
        면접 일정
      </Text>

      <Flex gap="3.2rem">
        {/* ─ 달력 ─ */}
        <DatePicker selectedDate={selDate} onSelect={setSelDate} />

        {/* ─ 슬롯 리스트 + 신규 입력 ─ */}
        <Flex direction="column" gap="1.6rem" width="100%">
          {allSlots.length > 0 && (
            <Flex direction="column" gap="1.2rem">
              {allSlots.map((slot, i) => (
                <Flex key={i} align="center" gap="1.2rem" width="100%">
                  <CommonDropdown
                    options={timeOptions}
                    value={slot.startTime}
                    onSelect={(v) => {
                      if (slot.isPersisted) {
                        setValue(
                          `interviewSchedule.scheduleList.${slot.idx}.startTime`,
                          v
                        );
                      } else {
                        onRemoveLocal(slot.idx);
                        onAddLocal();
                      }
                    }}
                    placeholder="HH:MM"
                    listWidth="8rem"
                  />
                  <Text variant="md2_text_medium" color="grayscale40">
                    –
                  </Text>
                  <CommonDropdown
                    options={timeOptions}
                    value={slot.endTime}
                    onSelect={(v) => {
                      if (slot.isPersisted) {
                        setValue(
                          `interviewSchedule.scheduleList.${slot.idx}.endTime`,
                          v
                        );
                      } else {
                        onRemoveLocal(slot.idx);
                        onAddLocal();
                      }
                    }}
                    placeholder="HH:MM"
                    listWidth="8rem"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      slot.isPersisted
                        ? remove(slot.idx)
                        : onRemoveLocal(slot.idx)
                    }
                  >
                    <IcTrash width={20} height={20} />
                  </button>
                </Flex>
              ))}
            </Flex>
          )}

          {/* 신규 슬롯 입력 */}
          <Flex align="center" gap="1.2rem" width="100%">
            <CommonDropdown
              options={timeOptions}
              value={startT}
              onSelect={setStartT}
              placeholder="HH:MM"
              listWidth="8rem"
            />
            <Text variant="md2_text_medium" color="grayscale40">
              –
            </Text>
            <CommonDropdown
              options={timeOptions}
              value={endT}
              onSelect={setEndT}
              placeholder="HH:MM"
              listWidth="8rem"
            />
            <Button
              variant="stroke"
              size="40"
              leftIcon={<IcPlusCircle width={20} height={20} />}
              disabled={!(startT && endT)}
              onClick={onAddLocal}
            >
              면접 시간 추가
            </Button>
          </Flex>
        </Flex>
      </Flex>

      {/* ─ 하단 버튼 ─ */}
      <Flex gap="1.6rem">
        <Button
          variant="sub"
          size="40"
          disabled={allSlots.length === 0}
          onClick={onClearAll}
        >
          일정 전체 삭제
        </Button>
        <Button
          variant="main"
          size="40"
          disabled={localSlots.length === 0}
          onClick={onSubmit}
        >
          추가
        </Button>
      </Flex>
    </Flex>
  );
}
