'use client';
import { ComponentPropsWithoutRef } from 'react';
import DropdownRoot from '../DropdownRoot';
import DropdownTrigger from '../DropdownTrigger';
import DropdownList from '../DropdownList';
import DropdownItem from '../DropdownItem';
import SelectScoreDropdownTriggerContent from './SelectScoreDropdownTriggerContent';

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
    <DropdownRoot {...rest} style={style}>
      <DropdownTrigger>
        <SelectScoreDropdownTriggerContent
          selected={selected}
          isDefault={selected === defaultValue}
        />
      </DropdownTrigger>

      <DropdownList>
        {scores.map((score) => (
          <DropdownItem key={score} onSelect={() => onSelect(score)}>
            {score}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownRoot>
  );
}
