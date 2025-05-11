import React from 'react';
import * as styles from '../SectionDetailItems.css';

export default function BorderlessInput(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return <input {...props} className={styles.input} />;
}
