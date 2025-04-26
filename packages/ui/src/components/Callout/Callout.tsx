'use client';
import { useOverlay, useOutsideClick } from '@repo/utils';
import * as styles from './Callout.css';
import { Text } from '..';

export type CalloutProps = {
  trigger: React.ReactNode;
  texts: string | string[];
  position?: 'top' | 'bottom';
  offsetX?: number | string;
};

export function Callout({
  trigger,
  texts,
  position = 'top',
  offsetX = 0,
}: CalloutProps) {
  const { isOpen, toggle, close } = useOverlay();
  const ref = useOutsideClick<HTMLDivElement>(close);
  const items = Array.isArray(texts) ? texts : [texts];

  const varStyle = {
    '--offset-x': typeof offsetX === 'number' ? `${offsetX}px` : offsetX,
  } as React.CSSProperties;

  return (
    <div ref={ref} className={styles.container}>
      {/* 1) 트리거 */}
      <div onClick={toggle} className={styles.trigger}>
        {trigger}
      </div>

      {/* 2) 말풍선 (열렸을 때만 렌더) */}
      {isOpen && (
        <div
          className={`${styles.bubble} ${
            position === 'top' ? styles.top : styles.bottom
          }`}
          style={varStyle}
        >
          {items.map((t, i) => (
            <Text key={i} variant="xs_caption_semibold" color="primary60">
              {t}
            </Text>
          ))}

          {/* 3) 화살표 */}
          <div
            className={
              position === 'top'
                ? `${styles.arrow} ${styles.arrowTop}`
                : `${styles.arrow} ${styles.arrowBottom}`
            }
          />
        </div>
      )}
    </div>
  );
}
