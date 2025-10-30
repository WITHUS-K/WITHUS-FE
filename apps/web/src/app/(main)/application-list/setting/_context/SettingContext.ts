'use client';

import { createContext } from 'react';
import type { FormValues } from '@web/types/application';

export interface SettingContextType {
  form: FormValues;
  setForm: React.Dispatch<React.SetStateAction<FormValues>>;
}

export const SettingContext = createContext<SettingContextType | null>(null);
