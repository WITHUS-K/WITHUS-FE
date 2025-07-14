import { create } from 'zustand';

interface SimpleRole {
  id: number;
  roleName: string;
  color: string;
}

interface PartModalStoreState {
  userId: number | null;
  currentRoles: SimpleRole[];
  setUserRoleInfo: (userId: number, roles: SimpleRole[]) => void;
  reset: () => void;
}

export const usePartModalStore = create<PartModalStoreState>((set) => ({
  userId: null,
  currentRoles: [],
  setUserRoleInfo: (userId, roles) => set({ userId, currentRoles: roles }),
  reset: () => set({ userId: null, currentRoles: [] }),
}));
