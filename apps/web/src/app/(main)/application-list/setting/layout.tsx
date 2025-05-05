// app/(main)/application-list/setting/layout.tsx
'use client';

import React, { useState, type ReactNode } from 'react';

import type { FormValues } from '@web/types/application';
import { SettingContext } from './_context/SettingContext';

const initialForm: FormValues = {
  title: '',
  basicInfo: {
    birthDate: false,
    gender: false,
    address: false,
    school: false,
    major: false,
    academicStatus: false,
  },
  applicationParts: { isSelected: false, parts: [] },
  detailItems: [],
  deadline: '',
  documentResult: { isSelected: false, date: '' },
  interviewDuration: '15분',
  interviewSchedule: { isSelected: false, scheduleList: [] },
  finalResultDate: '',
  paperEvaluateStandard: 'score',
  paperEvaluateItems: [],
  interviewEvaluateStandard: 'score',
  interviewEvaluateItems: [],
};

export default function SettingLayout({ children }: { children: ReactNode }) {
  const [form, setForm] = useState<FormValues>(initialForm);

  return (
    <SettingContext.Provider value={{ form, setForm }}>
      {children}
    </SettingContext.Provider>
  );
}
