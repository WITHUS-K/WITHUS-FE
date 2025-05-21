'use client';
import { ComponentPropsWithoutRef } from 'react';
import DropdownItem from '../DropdownItem';
import SelectScoreDropdownTriggerContent from './SelectScoreDropdownTriggerContent';
import Dropdown from '../Dropdown';

const scores = ['0', '1', '2', '3', '4', '5'];

export interface SelectDropdownProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onSelect'> {
  value?: string;
  /** 도메인 선택 시 호출되는 콜백 */
  onSelect: (val: string) => void;
}

export default function SelectScoreDropdown({
  value,
  onSelect,
  className,
  style,
  ...rest
}: SelectDropdownProps) {
  const defaultValue = '점수 입력';
  // 변경 후
  const selected = value || defaultValue;

  return (
    <Dropdown {...rest} style={style}>
      <Dropdown.Trigger>
        <SelectScoreDropdownTriggerContent
          selected={selected}
          isDefault={selected === defaultValue}
        />
      </Dropdown.Trigger>

      <Dropdown.List width="16.6rem">
        {scores.map((score) => (
          <DropdownItem
            size="small"
            height="3.2rem"
            key={score}
            onSelect={() => onSelect(score)}
          >
            {score}
          </DropdownItem>
        ))}
      </Dropdown.List>
    </Dropdown>
  );
}
