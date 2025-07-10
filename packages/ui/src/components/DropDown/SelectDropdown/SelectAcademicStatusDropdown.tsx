'use client';

import { ComponentPropsWithoutRef } from 'react';
import SelectAcademicStatusDropdownTriggerContent from './SelectAcademicStatusDropdownTriggerContent';
import Dropdown from '../Dropdown';

const statusMap = {
  재학: 'ENROLLED',
  졸업: 'GRADUATED',
  휴학: 'LEAVE_OF_ABSENCE',
  유예: 'DEFERRED',
} as const;

const reverseStatusMap = Object.fromEntries(
  Object.entries(statusMap).map(([k, v]) => [v, k])
) as Record<string, keyof typeof statusMap>;

const status = Object.keys(statusMap) as (keyof typeof statusMap)[];

export interface SelectDropdownProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onSelect'> {
  value?: string; // 'ENROLLED' | 'GRADUATED' 등
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

  // value는 'ENROLLED' 같은 영문 enum, 표시할 땐 reverse map
  const selected =
    value && reverseStatusMap[value] ? reverseStatusMap[value] : defaultValue;

  return (
    <Dropdown {...rest} style={style}>
      <Dropdown.Trigger>
        <SelectAcademicStatusDropdownTriggerContent
          selected={selected!}
          isDefault={selected === defaultValue}
        />
      </Dropdown.Trigger>

      <Dropdown.NormalList width="16rem">
        {status.map((label) => (
          <Dropdown.Item
            key={label}
            isSelected={statusMap[label] === value}
            onSelect={() => onSelect(statusMap[label])}
          >
            {label}
          </Dropdown.Item>
        ))}
      </Dropdown.NormalList>
    </Dropdown>
  );
}
