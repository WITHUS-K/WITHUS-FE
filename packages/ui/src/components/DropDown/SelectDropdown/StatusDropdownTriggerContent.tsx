'use client';

import React from 'react';
import cx from 'clsx';
import * as styles from '../Dropdown.css';

export type Status =
  | '선택'
  | '보류'
  | '서류 합격'
  | '서류 불합격'
  | '면접 합격'
  | '면접 불합격'
  | '최종 합격'
  | '불합격';

interface Props {
  status: Status;
}

export default function StatusDropdownTriggerContent({ status }: Props) {
  let variantClass;
  if (status === '선택') {
    variantClass = styles.selected;
  } else if (status === '보류') {
    variantClass = styles.onHold;
  } else if (status.includes('불합격')) {
    variantClass = styles.fail;
  } else if (status.includes('합격')) {
    variantClass = styles.pass;
  } else {
    variantClass = styles.selected;
  }

  return <span className={cx(styles.root, variantClass)}>{status}</span>;
}
