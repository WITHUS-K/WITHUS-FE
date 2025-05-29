'use client';

import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { TextToggleSwitch } from '@repo/ui/SimpleToggleSwitch';
import { IcInfo } from '@repo/ui/icons/mono';
import { Option } from '@repo/ui/Option';
import type { FormValues } from '@web/types/application';
import * as styles from '../CriteriaTab.css';
import { Stepper } from '@repo/ui/Stepper';

interface Props {
  label: string;
  standardName: 'paperEvaluateStandard' | 'interviewEvaluateStandard';
}

export default function StandardSection({ label, standardName }: Props) {
  const { control, watch } = useFormContext<FormValues>();
  const std = watch(standardName);

  const options = ['만족', '보통', '불만족'];
  const [selected, setSelected] = useState<(typeof options)[number]>('보통');

  const controlEl =
    std === 'score' ? (
      <Stepper name={`${standardName}-dummy`} value={5} onChange={() => {}} />
    ) : (
      <Flex gap="1.2rem" align="center">
        {options.map((l) => (
          <Option
            key={l}
            type="radio"
            label={l}
            width="21rem"
            height="4.4rem"
            isSelected={selected === l}
            onChange={() => setSelected(l)}
          />
        ))}
      </Flex>
    );

  const infoText =
    std === 'score'
      ? '10점 만점으로 표시되는 점수제 평가입니다.'
      : '만족, 보통, 불만족, 세 가지 선택지로 평가할 수 있는 항목입니다.';

  return (
    <Flex direction="column" gap="1.6rem" align="flexStart">
      <Text variant="md1_text_semibold" color="grayscale70">
        {label} <span style={{ color: 'red' }}>*</span>
      </Text>

      <Flex
        direction="column"
        gap="1.6rem"
        align="flexStart"
        className={styles.standardSection}
      >
        <Flex align="center" gap="1.2rem">
          <Controller
            name={standardName}
            control={control}
            render={({ field }) => (
              <TextToggleSwitch
                options={[
                  { value: 'score', label: '점수제 평가' },
                  { value: 'level', label: '3단계 평가' },
                ]}
                selected={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <div className={styles.infoText}>
            <IcInfo width={18} height={18} />
            {infoText}
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
}
