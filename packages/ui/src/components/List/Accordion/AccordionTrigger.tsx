import React, { useContext, ReactNode } from 'react';
import { ItemValueContext } from './AccordionItem';
import { AccordionContext } from './AccordionContext';

interface AccordionTriggerProps {
  className?: string;
  children: ReactNode;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  className,
  children,
}) => {
  const ctx = useContext(AccordionContext);
  const value = useContext(ItemValueContext);

  if (!ctx || value == null) {
    throw new Error(
      'AccordionTrigger must be used within AccordionRoot > AccordionItem'
    );
  }

  const { openItems, toggleItem } = ctx;
  const isOpen = openItems.includes(value);

  return (
    <button
      type="button"
      className={className}
      onClick={() => toggleItem(value)}
      aria-expanded={isOpen}
    >
      {children}
    </button>
  );
};
