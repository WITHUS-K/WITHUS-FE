import * as styles from './TextToggleSwitch.css';

export interface Option<T extends string | number> {
  value: T;
  label: string;
}

export type OptionsList<T extends string | number> =
  | [Option<T>, Option<T>]
  | [Option<T>, Option<T>, Option<T>]
  | [Option<T>, Option<T>, Option<T>, Option<T>]
  | [Option<T>, Option<T>, Option<T>, Option<T>, Option<T>];

export interface TextToggleSwitchProps<T extends string | number> {
  options: OptionsList<T>;
  selected: T;
  onChange: (value: T) => void;
  className?: string;
}

export function TextToggleSwitch<T extends string | number>({
  options,
  selected,
  onChange,
  className,
}: TextToggleSwitchProps<T>) {
  const SEGMENT_WIDTH = 120;

  const selectedIndex = options.findIndex((opt) => opt.value === selected);
  const isFirst = selectedIndex === 0;

  const offsetX = isFirst ? 0 : selectedIndex * SEGMENT_WIDTH;

  return (
    <div className={`${styles.wrapper} ${className || ''}`.trim()}>
      <div className={styles.container}>
        <div
          className={styles.highlight}
          style={{ transform: `translateX(${offsetX}px)` }}
        />

        {options.map((opt) => {
          const isSelected = opt.value === selected;
          return (
            <div
              key={String(opt.value)}
              role="tab"
              aria-selected={isSelected}
              tabIndex={0}
              className={`${styles.segment} ${
                isSelected
                  ? styles.variants.selected
                  : styles.variants.unselected
              }`}
              onClick={() => onChange(opt.value)}
            >
              {opt.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
