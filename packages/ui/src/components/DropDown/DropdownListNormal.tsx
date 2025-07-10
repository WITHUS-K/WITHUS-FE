'use client';

import {
  ComponentPropsWithoutRef,
  CSSProperties,
  useState,
  useEffect,
} from 'react';
import { useDropdownContext } from './context';
import { dropdownListWrapper, dropdownListInner } from './Dropdown.css';

export interface DropdownListNormalProps extends ComponentPropsWithoutRef<'ul'> {
  width?: string;
}

export default function DropdownListNormal({
  children,
  width,
  style: styleProp,
  ...props
}: DropdownListNormalProps) {
  const { isOpen } = useDropdownContext();

  if (!isOpen) return null;

  // 트리거 기준 상대 위치이므로, 추가 위치 계산 불필요
  const mergedStyle: CSSProperties = {
    ...(width ? { width } : {}),
    ...styleProp,
  };

  return (
    <div className={dropdownListWrapper} style={mergedStyle}>
      <ul className={dropdownListInner} {...props}>
        {children}
      </ul>
    </div>
  );
}
