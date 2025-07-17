'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserOrganizationRole {
  id: number;
  roleName: string;
  color: string;
}

interface UserState {
  userId: number;
  organizationId: number | null;
  name: string;
  role: string;
  profileImageUrl: string | null;
  userOrganizationRoles: UserOrganizationRole[];
  setUser: (u: {
    userId: number;
    organizationId: number | null;
    name: string;
    role: string;
    profileImageUrl: string | null;
    userOrganizationRoles: UserOrganizationRole[];
  }) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: 0,
      organizationId: null,
      name: '',
      role: '',
      profileImageUrl: null,
      userOrganizationRoles: [],
      setUser: (u) =>
        set({
          userId: u.userId,
          organizationId: u.organizationId,
          name: u.name,
          role: u.role,
          profileImageUrl: u.profileImageUrl,
          userOrganizationRoles: u.userOrganizationRoles,
        }),
      clearUser: () =>
        set({
          userId: 0,
          organizationId: null,
          name: '',
          role: '',
          profileImageUrl: null,
          userOrganizationRoles: [],
        }),
    }),
    {
      name: 'user-storage', // localStorage key
      storage: createJSONStorage(() => localStorage), // 브라우저에서만 읽히도록 래핑
      // partialize: (state) => ({
      //   userId: state.userId,
      //   organizationId: state.organizationId,
      //   name: state.name,
      //   role: state.role,
      //   profileImageUrl: state.profileImageUrl,
      //   userOrganizationRoles: state.userOrganizationRoles,
      // }),
    }
  )
);
