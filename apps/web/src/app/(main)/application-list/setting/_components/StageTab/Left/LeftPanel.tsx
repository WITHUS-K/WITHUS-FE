'use client';

import {
  useFormContext,
  Controller,
  useFieldArray,
  useWatch,
} from 'react-hook-form';
import { SimpleToggleSwitch } from '@repo/ui/SimpleToggleSwitch';
import { Text } from '@repo/ui/Text';
import { Flex } from '@repo/ui/Flex';
import * as s from '../StageTab.css';
import { DateChip } from './DateChip';
import { TimeChip } from './TimeChip';
import { FormValues, InterviewScheduleItem } from '@web/types/application';
import { CommonDropdown } from '@repo/ui/CommonDropdown';
import { Button } from '@repo/ui/Button';
import { IcPlusCircle } from '@repo/ui/icons/mono';

interface LeftPanelProps {
  onChipClick?: (e: React.MouseEvent<HTMLElement>, sec: string) => void;
}

export default function LeftPanel({ onChipClick }: LeftPanelProps) {
  const { watch, control, setValue } = useFormContext<FormValues>();

  const scheduleList = useWatch<FormValues, 'interviewSchedule.scheduleList'>({
    control,
    name: 'interviewSchedule.scheduleList',
    defaultValue: [],
  });

  const { append } = useFieldArray({
    control,
    name: 'interviewSchedule.scheduleList',
  });

  const activeSection = watch('activeSection');
  // form 값
  const deadline = watch('deadline');
  const docOn = watch('documentResult.isSelected');
  const docDate = watch('documentResult.date');
  const schedOn = watch('interviewSchedule.isSelected');
  const finalDate = watch('finalResultDate');

  // 날짜별로 그룹핑
  const groupMap = new Map<string, InterviewScheduleItem[]>();
  scheduleList.forEach((slot) => {
    const key = slot.date; // '' 또는 'YYYY-MM-DD'
    const arr = groupMap.get(key) || [];
    arr.push(slot);
    groupMap.set(key, arr);
  });

  const groups = Array.from(groupMap.entries()).map(([date, slots]) => ({
    date,
    slots,
  }));

  // 빈 상태일 때도 한 개 컨테이너 그리기
  const displayGroups =
    groups.length > 0
      ? groups
      : [{ date: '', slots: [{ date: '', startTime: '', endTime: '' }] }];

  const openSection = (sec: string) => (e: React.MouseEvent<HTMLElement>) => {
    setValue('activeSection', sec);
    onChipClick?.(e, sec);
  };

  return (
    <Flex direction="column" className={s.left} gap="6.4rem">
      {/* 지원 마감 */}
      <Flex direction="column" gap="1.6rem" width="100%">
        <Text variant="md1_text_semibold" color="grayscale70">
          지원 마감 <span style={{ color: 'red' }}>*</span>
        </Text>
        <DateChip
          date={deadline}
          selected={activeSection === 'deadline'}
          onClick={openSection('deadline')}
        />
      </Flex>

      {/* 서류 합격 발표 */}
      <Flex direction="column" gap="1.6rem" width="100%">
        <Flex align="center" gap="0.8rem">
          <Text variant="md1_text_semibold" color="grayscale70">
            서류 합격 발표
          </Text>
          <Controller
            name="documentResult.isSelected"
            control={control}
            render={({ field }) => (
              <SimpleToggleSwitch
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Flex>
        <DateChip
          date={docDate}
          disabled={!docOn}
          selected={activeSection === 'document'}
          onClick={docOn ? openSection('document') : undefined}
        />
      </Flex>

      {/* 면접 소요시간 */}
      <Flex direction="column" gap="1.6rem">
        <Text variant="md1_text_semibold" color="grayscale70">
          면접 소요시간 <span style={{ color: 'red' }}>*</span>
        </Text>
        <Controller
          name="interviewDuration"
          control={control}
          render={({ field }) => (
            <CommonDropdown
              options={['15분', '30분', '1시간']}
              value={field.value}
              onSelect={field.onChange}
              triggerHeight="5.6rem"
              listWidth="33.1rem"
              itemHeight="3.4rem"
            />
          )}
        />
      </Flex>

      {/* 면접 일정 */}
      <Flex direction="column" gap="1.6rem">
        <Flex align="center" gap="0.8rem">
          <Text variant="md1_text_semibold" color="grayscale70">
            면접 일정
          </Text>
          <Controller
            name="interviewSchedule.isSelected"
            control={control}
            render={({ field }) => (
              <SimpleToggleSwitch
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Flex>

        {displayGroups.map((group, gi) => (
          <div
            key={group.date || `__empty__-${gi}`}
            className={s.scheduleContainer}
            data-disabled={!schedOn}
          >
            <Flex direction="column" gap="1rem" width="100%">
              {/* 날짜 칩 */}
              <DateChip
                date={group.date || undefined}
                disabled={!schedOn}
                selected={activeSection === `interview-${gi}`}
                onClick={schedOn ? openSection(`interview-${gi}`) : undefined}
              />

              {/* 해당 날짜의 모든 TimeChip */}
              {group.slots.map((slot, ti) => (
                <TimeChip
                  key={`${group.date}-${slot.startTime}-${ti}`}
                  start={slot.startTime || undefined}
                  end={slot.endTime || undefined}
                  disabled={!schedOn}
                />
              ))}
            </Flex>
          </div>
        ))}
        <Button
          type="button"
          variant="stroke"
          size="48"
          disabled={!schedOn}
          leftIcon={<IcPlusCircle width={24} height={24} />}
          onClick={() =>
            // 새 인터뷰 블록 추가 (빈 날짜/시간)
            append({ date: '', startTime: '', endTime: '' })
          }
          style={{ marginTop: '4.8rem' }}
        >
          면접 일정 추가
        </Button>
      </Flex>

      {/* 최종 합격 발표 */}
      <Flex direction="column" gap="1.6rem" width="100%">
        <Text variant="md1_text_semibold" color="grayscale70">
          최종 합격 발표 <span style={{ color: 'red' }}>*</span>
        </Text>
        <DateChip
          date={finalDate}
          selected={activeSection === 'final'}
          onClick={openSection('final')}
        />
      </Flex>
    </Flex>
  );
}
