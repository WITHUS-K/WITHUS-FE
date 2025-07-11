'use client';

import { ComponentPropsWithoutRef } from 'react';
import ClubDropdownTriggerContent from './ClubDropdownTriggerContent';
import Dropdown from '../Dropdown';

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

  //console.log('클럽', clubs);
  return (
    <Dropdown {...rest} style={style}>
      <Dropdown.Trigger>
        <ClubDropdownTriggerContent selected={selected} />
      </Dropdown.Trigger>

      <Dropdown.List width="31.1rem">
        {clubs.map((name) => (
          <Dropdown.Item
            key={name}
            isSelected={name === value}
            onSelect={() => onSelect(name)}
            height="3.4rem"
          >
            {name}
          </Dropdown.Item>
        ))}
      </Dropdown.List>
    </Dropdown>
  );
}
