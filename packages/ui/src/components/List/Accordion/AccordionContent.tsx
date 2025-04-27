import React, { useContext, ReactNode } from 'react';
import { ItemValueContext } from './AccordionItem';
import { AccordionContext } from './AccordionContext';

interface AccordionContentProps {
  className?: string;
  children: ReactNode;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  className,
  children,
}) => {
  const ctx = useContext(AccordionContext);
  const value = useContext(ItemValueContext);

  if (!ctx || value == null) {
    throw new Error(
      'AccordionContent must be used within AccordionRoot > AccordionItem'
    );
  }

  const isOpen = ctx.openItems.includes(value);
  if (!isOpen) return null;

  return <div className={className}>{children}</div>;
};
