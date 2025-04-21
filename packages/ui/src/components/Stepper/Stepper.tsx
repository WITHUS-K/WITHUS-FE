'use client';

import { Flex } from '..';
import * as styles from './Stepper.css';
import { IcStepperMinus, IcStepperPlus } from '../../icons/src/colored';

export interface StepperProps {
  name: string;
  value: number;
  onChange: (name: string, next: number) => void;
}

export function Stepper({ name, value, onChange }: StepperProps) {
  return (
    <Flex align="center" className={styles.container}>
      <button
        type="button"
        className={styles.button}
        onClick={() => onChange(name, value - 1)}
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
      >
        <IcStepperPlus width={24} height={24} />
      </button>
    </Flex>
  );
}
