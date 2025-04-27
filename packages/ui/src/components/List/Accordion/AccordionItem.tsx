import React, { ReactNode, createContext } from 'react';

const ItemValueContext = createContext<string | undefined>(undefined);

interface AccordionItemProps {
  value: string;
  children: ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  children,
}) => (
  <ItemValueContext.Provider value={value}>
    {children}
  </ItemValueContext.Provider>
);

export { ItemValueContext };
