'use client';

import { create } from 'zustand';

export type DraftOrg = { id: number; name: string };

interface ProfileOrgDraftState {
  orgs: DraftOrg[];
  initialized: boolean;

  init: (orgs: DraftOrg[]) => void;
  add: (org: DraftOrg) => void;
  remove: (id: number) => void;
  reset: () => void;
}

export const useProfileOrgDraftStore = create<ProfileOrgDraftState>((set, get) => ({
  orgs: [],
  initialized: false,

  init: (orgs) => {
    // 쿼리/리렌더로 여러 번 초기화되는 것 방지
    if (get().initialized) return;
    set({ orgs, initialized: true });
  },

  add: (org) =>
    set((s) => {
      const exists = s.orgs.some((o) => o.id === org.id);
      if (exists) return s;
      return { orgs: [...s.orgs, org] };
    }),

  remove: (id) =>
    set((s) => ({ orgs: s.orgs.filter((o) => o.id !== id) })),

  reset: () => set({ orgs: [], initialized: false }),
}));
