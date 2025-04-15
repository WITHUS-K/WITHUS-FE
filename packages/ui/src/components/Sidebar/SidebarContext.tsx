import { createContext, useContext } from 'react';

interface SidebarContextType {
  activeItem: string;
  setActiveItem: (label: string) => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('Sidebar components must be used within a SidebarRoot');
  }
  return context;
};
