'use client';
import React, { useState, useEffect } from 'react';
import { useRecruitmentDetailQuery } from '@web/store/query/useRecruitmentDetailQuery';
import type { FormValues } from '@web/types/application';
import { SettingForm } from '@web/app/(main)/application-list/setting/_components/SettingForm/SettingForm';
import { convertDetailToForm } from '@web/utils/convertDetailToForm';

export default function EditSettingClient({
  recruitmentId,
}: {
  recruitmentId: number;
}) {
  const { data: detail } = useRecruitmentDetailQuery({
    recruitmentId,
  });
  const [form, setForm] = useState<FormValues | null>(null);

  useEffect(() => {
    if (detail) setForm(convertDetailToForm(detail));
  }, [detail]);

  if (!form) return null;

  return (
    <div style={{ overflow: 'hidden' }}>
      <SettingForm existentForm={form} />
    </div>
  );
}
