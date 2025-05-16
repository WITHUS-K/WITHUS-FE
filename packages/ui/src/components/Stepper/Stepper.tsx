'use client';

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

      <Flex align="center" justify="center" className={styles.value}>
        {value}
      </Flex>

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
