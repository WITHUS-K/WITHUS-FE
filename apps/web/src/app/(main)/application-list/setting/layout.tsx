'use client';

import React, { useState, type ReactNode } from 'react';
import type { FormValues } from '@web/types/application';
import { SettingContext } from './_context/SettingContext';
import { dummyBasicForm, dummyForm } from '@web/constants/application';

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
  documentResult: { isSelected: true, date: '' },
  interviewDuration: '15분',
  interviewSchedule: { isSelected: true, scheduleList: [] },
  finalResultDate: '',
  paperEvaluateStandard: 'score',
  paperEvaluateItems: [],
  interviewEvaluateStandard: 'score',
  interviewEvaluateItems: [],
};

export default function SettingLayout({ children }: { children: ReactNode }) {
  const [form, setForm] = useState<FormValues>(initialForm);

  return (
    <SettingContext.Provider value={{ form: dummyBasicForm, setForm }}>
      {children}
    </SettingContext.Provider>
  );
}
