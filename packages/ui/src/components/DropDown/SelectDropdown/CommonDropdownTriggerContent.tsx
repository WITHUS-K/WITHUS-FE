'use client';

import React from 'react';
import { Text } from '../..';
import clsx from 'clsx';
import * as styles from '../Dropdown.css';
import { useDropdownContext } from '../context';
import { IcCommonModal } from '../../../icons/src/mono';

interface TriggerContentProps {
  selected: string;
  width?: string;
  height?: string;
  disabled?: boolean;
}

export default function CommonDropdownTriggerContent({
  selected,
  width,
  height,
  disabled = false,
}: TriggerContentProps) {
  const { isOpen } = useDropdownContext();

  return (
    <div
      className={clsx(
        styles.triggerBase,
        isOpen ? styles.triggerOpen : styles.triggerClosed
      )}
      style={{
        width,
        height,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <Text
        variant="md2_text_medium"
        color={isOpen ? 'primary50' : 'grayscale70'}
      >
        {selected}
      </Text>
      <IcCommonModal
        width={24}
        height={24}
        className={clsx(
          styles.iconBase,
          isOpen ? styles.iconOpen : styles.iconClosed
        )}
      />
    </div>
  );
}
