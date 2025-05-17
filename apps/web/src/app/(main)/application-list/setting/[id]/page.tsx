'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRecruitmentDetailQuery } from '@web/store/query/useRecruitmentDetailQuery';
import type { FormValues } from '@web/types/application';
import { SettingForm } from '@web/app/(main)/application-list/setting/_components/SettingForm/SettingForm';
import { convertDetailToForm } from '@web/utils/convertDetailToForm';

export default function EditSettingPage() {
  const { id } = useParams();
  const recruitmentId = Number(id);
  const { data: detail, isLoading } = useRecruitmentDetailQuery(recruitmentId);

  const [form, setForm] = useState<FormValues | null>(null);

  useEffect(() => {
    if (detail) {
      setForm(convertDetailToForm(detail));
    }
  }, [detail]);

  if (isLoading || !form) {
    return <div>로딩 중…</div>;
  }

  return <SettingForm />;
}
