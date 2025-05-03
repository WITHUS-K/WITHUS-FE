import React, { createContext, useContext, useState, ReactNode } from 'react';

type Club = { id: number; name: string } | null;

interface ClubContextValue {
  club: Club;
  setClub: (club: Club) => void;
}

const ClubContext = createContext<ClubContextValue | undefined>(undefined);

export function ClubProvider({ children }: { children: ReactNode }) {
  const [club, setClub] = useState<Club>(null);
  return (
    <ClubContext.Provider value={{ club, setClub }}>
      {children}
    </ClubContext.Provider>
  );
}

export function useClub() {
  const context = useContext(ClubContext);
  if (!context) {
    throw new Error('useClub must be used within a ClubProvider');
  }
  return context;
}
