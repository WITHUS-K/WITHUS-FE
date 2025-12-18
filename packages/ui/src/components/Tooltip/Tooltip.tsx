import React, { useState } from 'react';
import * as styles from './Tooltip.css';

interface TooltipProps {
  children: React.ReactNode;
  message: string;
  position?: 'top' | 'bottom';
}

export const Tooltip = ({
  children,
  message,
  position = 'bottom',
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={styles.tooltipWrapper}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={styles.tooltipBalloon({ position })}>
          {message}
          <div className={styles.tooltipArrow({ position })} />
        </div>
      )}
    </div>
  );
};
