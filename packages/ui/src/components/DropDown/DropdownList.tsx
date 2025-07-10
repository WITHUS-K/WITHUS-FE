// DropdownList.tsx
'use client';

import { createPortal } from 'react-dom';
import {
  ComponentPropsWithoutRef,
  CSSProperties,
  useState,
  useEffect,
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

  // 포탈 위치 상태
  const [pos, setPos] = useState({ top: 0, left: 0 });

  // 열릴 때마다 트리거 위치를 측정
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom, left: rect.left });
    }
  }, [isOpen, triggerRef]);

  if (!isOpen) return null;

  const mergedStyle: CSSProperties = {
    position: 'absolute',
    top: pos.top,
    left: pos.left,
    ...(width ? { width } : {}),
    ...styleProp,
  };

  const dropdown = (
    <div className={dropdownListWrapper} style={mergedStyle}>
      <ul className={dropdownListInner} {...props}>
        {children}
      </ul>
    </div>
  );

  return createPortal(dropdown, document.body);
}
