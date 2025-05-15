'use client';

import cx from 'clsx';
import { IcPlusRole } from '@repo/ui/icons/mono';
import * as styles from '../Dropdown.css';
import { useDropdownContext } from '../context';
import { Dropdown } from '..';
import { TagColor } from '@repo/utils';
import RolesDropdownTriggerContent from './RolesDropdownTriggerContent';

export interface Evaluator {
  name: string;
}

interface Props {
  available: Evaluator[];
  onSelect: (ev: Evaluator) => void;
}

export default function ChargeDropdown({ available, onSelect }: Props) {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <RolesDropdownTriggerContent />
      </Dropdown.Trigger>
      <Dropdown.List>
        {available.map((ev) => (
          <Dropdown.Item
            key={ev.name}
            onSelect={() => onSelect(ev)}
            size="small"
            height=""
          >
            {ev.name}
          </Dropdown.Item>
        ))}
      </Dropdown.List>
    </Dropdown>
  );
}
