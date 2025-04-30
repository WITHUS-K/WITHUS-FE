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

  return (
    <Dropdown {...rest} style={style}>
      <Dropdown.Trigger>
        <ClubDropdownTriggerContent selected={selected} />
      </Dropdown.Trigger>

      <Dropdown.List>
        {clubs.map((name) => (
          <Dropdown.Item
            key={name}
            isSelected={name === value}
            onSelect={() => onSelect(name)}
          >
            {name}
          </Dropdown.Item>
        ))}
      </Dropdown.List>
    </Dropdown>
  );
}
