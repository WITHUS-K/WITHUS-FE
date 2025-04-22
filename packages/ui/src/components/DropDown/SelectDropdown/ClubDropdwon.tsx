'use client';

import { ComponentPropsWithoutRef } from 'react';
import DropdownRoot from '../DropdownRoot';
import DropdownTrigger from '../DropdownTrigger';
import DropdownList from '../DropdownList';
import DropdownItem from '../DropdownItem';
import ClubDropdownTriggerContent from './ClubDropdownTriggerContent';

export interface ClubDropdownProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onSelect'> {
  value?: string;
  clubs: string[];
  onSelect: (val: string) => void;
}

export default function ClubDropdown({
  value,
  onSelect,
  clubs,
  className,
  style,
  ...rest
}: ClubDropdownProps) {
  const defaultValue = clubs[0] ?? '';
  const selected = value ?? defaultValue;

  return (
    <DropdownRoot {...rest} style={style}>
      <DropdownTrigger>
        <ClubDropdownTriggerContent selected={selected} />
      </DropdownTrigger>

      <DropdownList>
        {clubs.map((name) => (
          <DropdownItem key={name} onSelect={() => onSelect(name)}>
            {name}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownRoot>
  );
}
