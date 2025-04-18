import React, { ChangeEvent, KeyboardEvent } from 'react';
import { IcDelete } from '@/icons/src/colored';
import * as styles from './InputChip.css';

export interface InputChipProps {
  value?: string;
  onChange?: (value: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onDelete?: () => void;
}

export const InputChip: React.FC<InputChipProps> = ({
  value = '',
  onChange = () => {},
  onKeyDown,
  onDelete = () => {},
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  const width = `${Math.max(value.length, 1) + 1}ch`;

  return (
    <div className={styles.inputChipWrapper}>
      <input
        className={styles.inputStyle}
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        style={{ width }}
      />
      <button
        type="button"
        className={styles.buttonStyle}
        onClick={onDelete}
        aria-label="delete"
      >
        <IcDelete width={16} height={16} />
      </button>
    </div>
  );
};
