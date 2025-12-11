'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useOverlay } from '@repo/utils';
import * as styles from './Callout.css';
import { Text } from '..';

export type CalloutProps = {
  trigger: React.ReactNode;
  texts: string | string[];
  position?: 'top' | 'bottom';
  offsetX?: number | string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function Callout({
  trigger,
  texts,
  position = 'top',
  offsetX = 0,
  open,
  onOpenChange,
}: CalloutProps) {
  const { isOpen: internalOpen, toggle, close } = useOverlay();

  const isControlled = open !== undefined;
  const isActuallyOpen = isControlled ? open! : internalOpen;

  const triggerRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const items = Array.isArray(texts) ? texts : [texts];

  const handleClose = useCallback(() => {
    if (isControlled) {
      onOpenChange?.(false);
    } else {
      close();
    }
  }, [isControlled, onOpenChange, close]);

  const handleToggle = useCallback(() => {
    if (isControlled) {
      onOpenChange?.(!open);
    } else {
      toggle();
    }
  }, [isControlled, onOpenChange, open, toggle]);

  const [coords, setCoords] = useState({ top: 0, left: 0 });
  useEffect(() => {
    if (isActuallyOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: position === 'top' ? rect.top : rect.bottom,
        left: rect.left + rect.width / 2,
      });
    }
  }, [isActuallyOpen, position]);

  useEffect(() => {
    if (!isActuallyOpen) return;

    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (containerRef.current && containerRef.current.contains(target)) {
        return;
      }
      if (bubbleRef.current && bubbleRef.current.contains(target)) {
        return;
      }
      handleClose();
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [isActuallyOpen, handleClose]);

  const offsetValue = typeof offsetX === 'number' ? `${offsetX}px` : offsetX;

  return (
    <div ref={containerRef} className={styles.container}>
      <div ref={triggerRef} onClick={handleToggle} className={styles.trigger}>
        {trigger}
      </div>

      {isActuallyOpen &&
        createPortal(
          <div
            ref={bubbleRef}
            className={styles.bubble}
            style={{
              position: 'fixed',
              top: coords.top,
              left: coords.left,
              transform:
                position === 'top'
                  ? 'translate(-50%, calc(-100% - 10px))'
                  : 'translate(-50%, 10px)',
              marginLeft: offsetValue,
              zIndex: 1000,
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
