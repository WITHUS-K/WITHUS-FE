'use client';

import { createContext } from 'react';
import type { FormValues } from '@web/types/application';

export interface SettingContextType {
  form: FormValues;
  setForm: (f: FormValues) => void;
}

export const SettingContext = createContext<SettingContextType | null>(null);
