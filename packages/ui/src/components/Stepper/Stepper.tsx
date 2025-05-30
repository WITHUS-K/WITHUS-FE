'use client';

import React, { useState, useEffect } from 'react';
import { Flex } from '..';
import * as styles from './Stepper.css';
import { IcStepperMinus, IcStepperPlus } from '../../icons/src/colored';

export interface StepperProps {
  name: string;
  value: number;
  onChange: (name: string, next: number) => void;
  disabled?: boolean;
}

export function Stepper({
  name,
  value,
  onChange,
  disabled = false,
}: StepperProps) {
  // 1) 로컬 input 값
  const [inputValue, setInputValue] = useState(String(value));

  // 2) value prop 이 바뀌면 동기화
  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  // 3) 입력 중일 때만 텍스트 갱신
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 4) 포커스 시 기존 숫자 삭제
  const handleInputFocus = () => {
    setInputValue('');
  };

  // 5) blur 되면 부모 onChange 호출 (숫자 아니면 무시하고 원래 value 복원)
  const handleInputBlur = () => {
    const next = parseInt(inputValue, 10);
    if (!isNaN(next) && next >= 1) {
      onChange(name, next);
    } else {
      // 잘못 입력했으면 원래 값으로 복원
      setInputValue(String(value));
    }
  };

  return (
    <Flex align="center" className={styles.container}>
      <button
        type="button"
        className={styles.button}
        onClick={() => onChange(name, value - 1)}
        disabled={disabled || value <= 1}
        aria-label={`decrease ${name}`}
      >
        <IcStepperMinus width={24} height={24} />
      </button>

      <input
        className={styles.value}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        disabled={disabled}
        min={1}
      />

      <button
        type="button"
        className={styles.button}
        onClick={() => onChange(name, value + 1)}
        disabled={disabled}
        aria-label={`increase ${name}`}
      >
        <IcStepperPlus width={24} height={24} />
      </button>
    </Flex>
  );
}
