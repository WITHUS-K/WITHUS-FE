import React from 'react';
import * as styles from './Header.css';
import { IcHeaderLogo } from '../../icons/src/colored';

export const HeaderLeft = () => {
  return (
    <a href="/" className={styles.leftSection}>
      <IcHeaderLogo width={120} height={24} />
    </a>
  );
};
