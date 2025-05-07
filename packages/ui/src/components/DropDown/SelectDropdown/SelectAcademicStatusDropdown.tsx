'use client';

import { ComponentPropsWithoutRef } from 'react';
import SelectDropdownTriggerContent from './SelectDropdownTriggerContent';
import Dropdown from '../Dropdown';
import SelectAcademicStatusDropdownTriggerContent from './SelectAcademicStatusDropdownTriggerContent';

const status = ['재학', '휴학', '유예', '졸업'];

export interface SelectDropdownProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onSelect'> {
  value?: string;
  /** 도메인 선택 시 호출되는 콜백 */
  onSelect: (val: string) => void;
}

export default function SelectAcademicStatusDropdown({
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
        <SelectAcademicStatusDropdownTriggerContent
          selected={selected}
          isDefault={selected === defaultValue}
        />
      </Dropdown.Trigger>

      <Dropdown.List width="16rem">
        {status.map((s) => (
          <Dropdown.Item
            key={s}
            isSelected={s === value}
            onSelect={() => onSelect(s)}
          >
            {s}
          </Dropdown.Item>
        ))}
      </Dropdown.List>
    </Dropdown>
  );
}
