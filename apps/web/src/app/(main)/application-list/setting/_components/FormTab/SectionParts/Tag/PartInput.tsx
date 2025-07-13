import React, { useState, useEffect, useRef } from 'react';
import * as styles from '../SectionParts.css';

export function PartInput({
  defaultValue,
  onConfirm,
  onCancel,
}: {
  defaultValue: string;
  onConfirm: (val: string) => void;
  onCancel: () => void;
}) {
  const [val, setVal] = useState(defaultValue);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className={styles.inputContainer}>
      <input
        ref={ref}
        className={styles.input}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onConfirm(val.trim());
          }
          if (e.key === 'Escape') {
            e.preventDefault();
            onCancel();
          }
        }}
        onBlur={() => onConfirm(val.trim())}
        placeholder="파트를 입력해주세요."
      />
    </div>
  );
}
