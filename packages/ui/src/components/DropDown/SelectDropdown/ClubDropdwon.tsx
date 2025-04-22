'use client';

import { ComponentPropsWithoutRef } from 'react';
import DropdownRoot from '../DropdownRoot';
import DropdownTrigger from '../DropdownTrigger';
import DropdownList from '../DropdownList';
import DropdownItem from '../DropdownItem';
import ClubDropdownTriggerContent from './ClubDropdownTriggerContent';

// 추후 서버연동필요!!
const club = [
  '큐시즘',
  '큐시즘',
  '큐시즘',
  '큐시즘',
  '큐시즘',
  '큐시즘',
  '큐시즘',
  '큐시즘',
  '큐시즘',
];

export interface ClubDropdownProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onSelect'> {
  value?: string;
  /** 도메인 선택 시 호출되는 콜백 */
  onSelect: (val: string) => void;
}

export default function ClubDropdown({
  value,
  onSelect,
  className,
  style,
  ...rest
}: ClubDropdownProps) {
  const defaultValue: string = club[0]!;
  const selected = value ?? defaultValue;

  return (
    <DropdownRoot {...rest} style={style}>
      <DropdownTrigger>
        <ClubDropdownTriggerContent selected={selected} />
      </DropdownTrigger>

      <DropdownList>
        {club.map((domain) => (
          <DropdownItem key={domain} onSelect={() => onSelect(domain)}>
            {domain}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownRoot>
  );
}
