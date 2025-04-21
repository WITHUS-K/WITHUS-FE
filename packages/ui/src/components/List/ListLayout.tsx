import { ReactNode } from 'react';
import * as styles from './List.css';

interface ListLayoutProps {
  children: ReactNode;
  width?: string;
}

export const ListLayout = ({ width = '1101px', children }: ListLayoutProps) => (
  <div className={styles.listWrapper} style={{ width }}>
    {children}
  </div>
);
