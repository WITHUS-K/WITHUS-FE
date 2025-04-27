import { createContext } from 'react';

export interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
}

export const AccordionContext = createContext<
  AccordionContextValue | undefined
>(undefined);
