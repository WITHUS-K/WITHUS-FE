import { ReactNode } from 'react';
import * as styles from './List.css';

interface ListLayoutProps {
  children: ReactNode;
  width?: string;
  direction?: 'row' | 'column';
}

export const ListLayout = ({
  width = '1101px',
  direction = 'row',
  children,
}: ListLayoutProps) => (
  <div
    className={[styles.listWrapperBase, styles.listWrapperDir[direction]].join(
      ' '
    )}
    style={{ width }}
  >
    {children}
  </div>
);
