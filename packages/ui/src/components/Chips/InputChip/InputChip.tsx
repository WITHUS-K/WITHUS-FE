import React, { ChangeEvent, KeyboardEvent } from 'react';
import { IcDelete } from '../../../icons/src/colored';
import * as styles from './InputChip.css';

export interface InputChipProps {
  value?: string;
  onChange?: (value: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onDelete?: () => void;
  disabled?: boolean;
}

export const InputChip: React.FC<InputChipProps> = ({
  value = '',
  onChange = () => {},
  onKeyDown,
  onDelete = () => {},
  disabled = false,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!disabled) onChange(e.target.value);
  };

  return (
    <div className={styles.inputChipWrapper}>
      <span className={styles.ghostText}>{value || ' '}</span>

      <input
        className={styles.inputStyle}
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        disabled={disabled}
      />

      <button
        type="button"
        className={styles.buttonStyle}
        onClick={() => !disabled && onDelete()}
        aria-label="delete"
        disabled={disabled}
      >
        <IcDelete width={16} height={16} />
      </button>
    </div>
  );
};
