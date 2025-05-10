'use client';

import { FormValues } from '@web/types/application';
import { createContext } from 'react';


export interface SettingContextType {
  form: FormValues;
  setForm: (f: FormValues) => void;
}

export const SettingContext = createContext<SettingContextType | null>(null);