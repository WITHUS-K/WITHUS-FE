import { ReactNode } from 'react';
import * as styles from './ModalFooter.css';

type ModalFooterProps = {
  children: ReactNode;
  hasTopBorder?: boolean;
};

export function ModalFooter({
  children,
  hasTopBorder = false,
}: ModalFooterProps) {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footer[hasTopBorder ? 'hasBorder' : 'false']}>
        {children}
      </div>
    </div>
  );
}
