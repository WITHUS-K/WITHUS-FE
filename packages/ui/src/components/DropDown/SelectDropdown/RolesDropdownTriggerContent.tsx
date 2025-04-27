'use client';

import React from 'react';
import { IcPlusRole } from '@repo/ui/icons/mono';
import * as styles from '../Dropdown.css';
import cx from 'clsx';
import { useDropdownContext } from '../context';

const RolesDropdownTriggerContent: React.FC = () => {
  const { isOpen } = useDropdownContext();

  return (
    <div className={cx(styles.buttonBase, isOpen && styles.buttonOpen)}>
      <IcPlusRole width={11} height={11} />
    </div>
  );
};

export default RolesDropdownTriggerContent;
