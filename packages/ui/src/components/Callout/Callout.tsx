'use client';
import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  const wrapperRef = useOutsideClick<HTMLDivElement>(close);
  const triggerRef = useRef<HTMLDivElement>(null);
  const items = Array.isArray(texts) ? texts : [texts];

  // 화면 기준으로 찍어줄 좌표
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: position === 'top' ? rect.top : rect.bottom,
        left: rect.left + rect.width / 2,
      });
    }
  }, [isOpen, position]);

  const offsetValue = typeof offsetX === 'number' ? `${offsetX}px` : offsetX;

  return (
    <div ref={wrapperRef} className={styles.container}>
      <div ref={triggerRef} onClick={toggle} className={styles.trigger}>
        {trigger}
      </div>

      {isOpen &&
        createPortal(
          <div
            className={styles.bubble}
            style={{
              position: 'fixed',
              top: coords.top,
              left: coords.left,
              // Y축으로만 옮길 때는 translateY, X축으로만 옮길 때 translateX
              transform:
                position === 'top'
                  ? 'translate(-50%, calc(-100% - 10px))'
                  : 'translate(-50%, 10px)',
              marginLeft: offsetValue,
              zIndex: 10,
            }}
          >
            {items.map((t, i) => (
              <Text key={i} variant="xs_caption_semibold" color="white">
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
          </div>,
          document.body
        )}
    </div>
  );
}
