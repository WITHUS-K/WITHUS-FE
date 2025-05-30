import { createContext, useContext } from 'react';

export const DropdownContext = createContext<
  | {
      open: () => void;
      close: () => void;
      toggle: () => void;
      isOpen: boolean;
      triggerRef: React.RefObject<HTMLElement | null>;
    }
  | undefined
>(undefined);

export const useDropdownContext = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx)
    throw new Error('Dropdown components must be used within a DropdownRoot');
  return ctx;
};
