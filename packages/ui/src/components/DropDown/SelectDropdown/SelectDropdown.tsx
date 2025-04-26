'use client';

import React, { ComponentPropsWithoutRef } from 'react';
import DropdownRoot from '../DropdownRoot';
import DropdownTrigger from '../DropdownTrigger';
import DropdownList from '../DropdownList';
import DropdownItem from '../DropdownItem';
import SelectDropdownTriggerContent from './SelectDropdownTriggerContent';

const emailDomains = [
  'naver.com',
  'daum.net',
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hanmail.net',
  'nate.com',
];

export interface SelectDropdownProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onSelect'> {
  value?: string;
  /** 도메인 선택 시 호출되는 콜백 */
  onSelect: (val: string) => void;
}

export default function SelectDropdown({
  value,
  onSelect,
  className,
  style,
  ...rest
}: SelectDropdownProps) {
  const defaultValue = '선택해주세요';
  // 변경 후
  const selected = value || defaultValue;

  return (
    <DropdownRoot {...rest} style={style}>
      <DropdownTrigger>
        <SelectDropdownTriggerContent
          selected={selected}
          isDefault={selected === defaultValue}
        />
      </DropdownTrigger>

      <DropdownList>
        {emailDomains.map((domain) => (
          <DropdownItem key={domain} onSelect={() => onSelect(domain)}>
            {domain}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownRoot>
  );
}
