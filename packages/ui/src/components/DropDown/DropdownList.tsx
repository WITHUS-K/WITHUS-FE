// DropdownList.tsx
'use client';

import { createPortal } from 'react-dom';
import {
  ComponentPropsWithoutRef,
  CSSProperties,
  useState,
  useEffect,
  useRef,
} from 'react';
import { useDropdownContext } from './context';
import { dropdownListWrapper, dropdownListInner } from './Dropdown.css';

export interface DropdownListProps extends ComponentPropsWithoutRef<'ul'> {
  width?: string;
}

export default function DropdownList({
  children,
  width,
  style: styleProp,
  ...props
}: DropdownListProps) {
  const { isOpen, triggerRef } = useDropdownContext();
  const floatingRef = useRef<HTMLDivElement | null>(null);

  // 포탈 위치 상태
  const [pos, setPos] = useState({ top: 0, left: 0 });

  // 열릴 때마다 트리거 위치를 측정
  const [minW, setMinW] = useState<number | undefined>(undefined);

  const updatePosition = () => {
    const el = triggerRef.current as HTMLElement | null;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ top: rect.bottom, left: rect.left });
    setMinW(rect.width);
  };

  useEffect(() => {
    if (!isOpen) return;

    updatePosition();

    const el = triggerRef.current as HTMLElement | null;
    const ro = el ? new ResizeObserver(updatePosition) : undefined;
    ro?.observe(el!);

    const onScroll = () => updatePosition();
    const onResize = () => updatePosition();

    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onResize);

    const id = requestAnimationFrame(updatePosition);

    return () => {
      ro?.disconnect();
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(id);
    };
  }, [isOpen, triggerRef]);

  if (!isOpen) return null;

  const mergedStyle: CSSProperties = {
    position: 'fixed',
    top: pos.top,
    left: pos.left,
    minWidth: minW,
    ...(width ? { width } : {}),
    ...styleProp,
  };

  const dropdown = (
    <div
      ref={floatingRef}
      className={dropdownListWrapper}
      style={mergedStyle}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <ul className={dropdownListInner} {...props}>
        {children}
      </ul>
    </div>
  );

  return createPortal(dropdown, document.body);
}
