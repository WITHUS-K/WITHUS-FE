'use client';

import { ComponentPropsWithoutRef } from 'react';
import SelectDropdownTriggerContent from './SelectDropdownTriggerContent';
import Dropdown from '../Dropdown';

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
    <Dropdown {...rest} style={style}>
      <Dropdown.Trigger>
        <SelectDropdownTriggerContent
          selected={selected}
          isDefault={selected === defaultValue}
        />
      </Dropdown.Trigger>

      <Dropdown.List width="16rem">
        {emailDomains.map((domain) => (
          <Dropdown.Item
            key={domain}
            isSelected={domain === value}
            onSelect={() => onSelect(domain)}
          >
            {domain}
          </Dropdown.Item>
        ))}
      </Dropdown.List>
    </Dropdown>
  );
}
