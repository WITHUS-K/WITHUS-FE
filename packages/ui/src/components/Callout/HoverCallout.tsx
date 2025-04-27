'use client';

import React, { ReactNode, useState } from 'react';
import { useOutsideClick } from '@repo/utils';
import * as styles from './Callout.css';
import { Text } from '..';

export type HoverCalloutProps = {
  trigger: ReactNode;
  texts: string | string[];
  position?: 'top' | 'bottom';
  offsetX?: number | string;
};

export default function HoverCallout({
  trigger,
  texts,
  position = 'top',
  offsetX = 0,
}: HoverCalloutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));
  const items = Array.isArray(texts) ? texts : [texts];

  const varStyle = {
    '--offset-x': typeof offsetX === 'number' ? `${offsetX}px` : offsetX,
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      className={styles.container}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className={styles.trigger}>{trigger}</div>

      {isOpen && (
        <div
          className={`${styles.bubble} ${
            position === 'top' ? styles.top : styles.bottom
          }`}
          style={varStyle}
        >
          {items.map((t, i) => (
            <Text
              key={i}
              variant="xs_caption_semibold"
              color="primary60"
              style={{ marginBottom: i < items.length - 1 ? 4 : 0 }}
            >
              {t}
            </Text>
          ))}

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
