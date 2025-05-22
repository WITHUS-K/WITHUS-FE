import { create } from 'zustand';

interface UserOrganizationRole {
  id: number;
  roleName: string;
  color: string;
}

interface UserState {
  userId: number;
  organizationId: number | null;
  name: string;
  profileImageUrl: string | null;
  userOrganizationRoles: UserOrganizationRole[];
  setUser: (u: {
    userId: number;
    organizationId: number | null;
    name: string;
    profileImageUrl: string | null;
    userOrganizationRoles: UserOrganizationRole[];
  }) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: 0,
  organizationId: null,
  name: '',
  profileImageUrl: null,
  userOrganizationRoles: [],
  setUser: (u) =>
    set({
      userId: u.userId,
      organizationId: u.organizationId,
      name: u.name,
      profileImageUrl: u.profileImageUrl,
      userOrganizationRoles: u.userOrganizationRoles,
    }),
  clearUser: () =>
    set({
      userId: 0,
      organizationId: null,
      name: '',
      profileImageUrl: null,
      userOrganizationRoles: [],
    }),
}));
