import { useContext } from 'react';
import { AccordionContext } from '../components/List/Accordion/AccordionContext';
import { ItemValueContext } from '../components/List/Accordion/AccordionItem';

export const useAccordionItem = () => {
  const ctx = useContext(AccordionContext);
  const value = useContext(ItemValueContext);
  if (!ctx || value === undefined) {
    throw new Error(
      'useAccordionItem must be used inside AccordionRoot > AccordionItem'
    );
  }
  const { openItems, toggleItem } = ctx;
  return {
    isOpen: openItems.includes(value),
    toggle: () => toggleItem(value),
  };
};
