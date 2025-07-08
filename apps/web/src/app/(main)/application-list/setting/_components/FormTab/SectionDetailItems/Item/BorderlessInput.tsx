'use client';

import React, { useRef, useLayoutEffect, useCallback } from 'react';
import * as styles from '../SectionDetailItems.css';

export default function BorderlessTextarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  const taRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    const scrollH = ta.scrollHeight;
    const cs = window.getComputedStyle(ta);
    let lineH = parseFloat(cs.lineHeight);
    if (isNaN(lineH)) {
      const fs = parseFloat(cs.fontSize) || 16;
      lineH = fs * 1.2;
    }
    const maxH = lineH * 3;
    if (scrollH <= maxH) {
      ta.style.height = `${scrollH}px`;
      ta.style.overflowY = 'hidden';
    } else {
      ta.style.height = `${maxH}px`;
      ta.style.overflowY = 'auto';
    }
  }, []);

  useLayoutEffect(() => {
    adjustHeight();
  }, [props.value, adjustHeight]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const ta = taRef.current!;
      const { selectionStart: start, selectionEnd: end } = ta;
      const before = ta.value.slice(0, start);
      const after = ta.value.slice(end);
      const newVal = before + '\n' + after;
      ta.value = newVal;
      props.onChange?.({ ...(e as any), target: ta });
      requestAnimationFrame(adjustHeight);
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    props.onChange?.(e);
    requestAnimationFrame(adjustHeight);
  };
  const handleInput: React.FormEventHandler<HTMLTextAreaElement> = (e) => {
    props.onInput?.(e as any);
    requestAnimationFrame(adjustHeight);
  };

  return (
    <textarea
      {...props}
      ref={taRef}
      className={styles.input}
      rows={1}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      onInput={handleInput}
    />
  );
}
