'use client';

import type { ComponentPropsWithoutRef } from 'react';
import Dropdown from '../Dropdown';
import CommonDropdownTriggerContent from './CommonDropdownTriggerContent';
import { DropdownItemProps } from '../DropdownItem';

export interface CommonDropdownProps<T extends string>
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onSelect'> {
  options: T[];
  value?: T;
  onSelect: (val: T) => void;
  placeholder?: string;
  /** 트리거 높이 */
  triggerHeight?: string;
  /** 드롭다운 전체 너비 */
  listWidth?: string;
  /** 각 아이템 높이 */
  itemHeight?: string;
  /** 아이템 텍스트 크기 */
  itemSize?: DropdownItemProps['size'];
}

export default function CommonDropdown<T extends string>({
  options,
  value,
  onSelect,
  triggerHeight = '4.4rem',
  listWidth = '16rem',
  itemHeight = '3.2rem',
  itemSize = 'small',
  placeholder,
  style,
  ...rest
}: CommonDropdownProps<T>) {
  const selected = value ?? placeholder ?? options[0]!;
  return (
    <Dropdown {...rest} style={style}>
      <Dropdown.Trigger>
        <CommonDropdownTriggerContent
          selected={selected}
          width={listWidth}
          height={triggerHeight}
        />
      </Dropdown.Trigger>

      <Dropdown.NormalList width={listWidth}>
        {options.map((opt) => (
          <Dropdown.Item
            key={opt}
            isSelected={opt === value}
            onSelect={() => onSelect(opt)}
            size={itemSize}
            height={itemHeight}
          >
            {opt}
          </Dropdown.Item>
        ))}
      </Dropdown.NormalList>
    </Dropdown>
  );
}
