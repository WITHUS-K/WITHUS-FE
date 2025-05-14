import { ReactNode } from 'react';
import * as styles from './List.css';

interface ListLayoutProps {
  children: ReactNode;
  width?: string;
  direction?: 'row' | 'column';
  readOnly?: boolean;
}

export const ListLayout = ({
  width = '100%',
  direction = 'row',
  children,
  readOnly = false,
}: ListLayoutProps) => (
  <div
    data-read-only={readOnly ? 'true' : 'false'}
    className={[styles.listWrapperBase, styles.listWrapperDir[direction]].join(
      ' '
    )}
    style={{ width }}
  >
    {children}
  </div>
);
