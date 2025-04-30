import * as styles from './SimpleToggleSwitch.css';
import { colors } from '@repo/theme';

export interface SimpleToggleSwitchProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
}

export const SimpleToggleSwitch = ({
  checked,
  onChange,
  disabled = false,
}: SimpleToggleSwitchProps) => (
  <label className={styles.switchLabel}>
    <input
      type="checkbox"
      className={styles.inputHidden}
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked)}
    />

    <span
      className={styles.track}
      style={{
        backgroundColor: checked ? colors.primary50 : colors.grayscale10,
      }}
    >
      <span
        className={styles.thumb}
        style={{
          transform: checked ? 'translateX(1.5rem)' : 'none',
        }}
      />
    </span>
  </label>
);
