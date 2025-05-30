// HoverCallout.tsx
'use client';

import React, { ReactNode, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  // 외부 클릭 시에도 닫히도록
  const wrapperRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));
  const triggerRef = useRef<HTMLDivElement>(null);
  const items = Array.isArray(texts) ? texts : [texts];

  // 툴팁을 화면에 고정시키기 위한 좌표
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
    <div
      ref={wrapperRef}
      className={styles.container}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* 트리거 */}
      <div ref={triggerRef} className={styles.trigger}>
        {trigger}
      </div>

      {/* 포탈로 렌더링되는 버블 */}
      {isOpen &&
        createPortal(
          <div
            className={styles.bubble}
            style={{
              position: 'fixed',
              top: coords.top,
              left: coords.left,
              // 위쪽이면 -100% 에서 추가 여유 10px, 아래쪽이면 10px 이동
              transform:
                position === 'top'
                  ? 'translate(-50%, calc(-100% - 10px))'
                  : 'translate(-50%, 10px)',
              marginLeft: offsetValue,
            }}
          >
            {items.map((t, i) => (
              <Text
                key={i}
                variant="xs_caption_semibold"
                color="white"
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
          </div>,
          document.body
        )}
    </div>
  );
}
