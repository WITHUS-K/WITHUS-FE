'use client';

import { create } from 'zustand';

export interface RecipientUser {
  id: string;
  name: string;
  email: string;
  profileUrl?: string;
}

interface RecipientsState {
    recipients: RecipientUser[];
    setRecipients: (next: RecipientUser[]) => void;
    addRecipient: (user: RecipientUser) => void;
    removeRecipient: (id: string) => void;
    clearRecipients: () => void;
    mergeRecipients: (next: RecipientUser[], key?: 'id' | 'email' | 'name') => void;
  }
  
  export const useRecipientsStore = create<RecipientsState>((set) => ({
    recipients: [],
    setRecipients: (next) => set({ recipients: next }),
    addRecipient: (user) =>
      set((s) => {
        if (s.recipients.some((r) => r.id === user.id)) return s;
        return { recipients: [...s.recipients, user] };
      }),
    removeRecipient: (id) =>
      set((s) => ({ recipients: s.recipients.filter((r) => r.id !== id) })),
    clearRecipients: () => set({ recipients: [] }),
  

    mergeRecipients: (next, key = 'id') =>
      set((s) => {
        const map = new Map<string, RecipientUser>();
        s.recipients.forEach((r) => map.set(String((r as any)[key] ?? r.id), r));
        next.forEach((r) => map.set(String((r as any)[key] ?? r.id), r));
        return { recipients: Array.from(map.values()) };
      }),
  }));
  