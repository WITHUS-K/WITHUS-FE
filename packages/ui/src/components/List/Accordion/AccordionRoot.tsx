'use client';
import { useState, ReactNode } from 'react';
import { AccordionContext } from './AccordionContext';

interface AccordionRootProps {
  defaultValue?: string | string[];
  multiple?: boolean;
  children: ReactNode;
}

export const AccordionRoot = ({
  defaultValue,
  multiple = false,
  children,
}: AccordionRootProps) => {
  const initial = defaultValue
    ? Array.isArray(defaultValue)
      ? defaultValue
      : [defaultValue]
    : [];
  const [openItems, setOpenItems] = useState<string[]>(initial);

  const toggleItem = (value: string) => {
    setOpenItems((prev) => {
      const isOpen = prev.includes(value);
      if (isOpen) return prev.filter((v) => v !== value);
      return multiple ? [...prev, value] : [value];
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      {children}
    </AccordionContext.Provider>
  );
};
