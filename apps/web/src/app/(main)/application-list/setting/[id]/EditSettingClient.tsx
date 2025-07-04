'use client';
import React, { useState, useEffect, useContext } from 'react';
import { useRecruitmentDetailQuery } from '@web/store/query/useRecruitmentDetailQuery';
import type { FormValues } from '@web/types/application';
import { SettingForm } from '@web/app/(main)/application-list/setting/_components/SettingForm/SettingForm';
import { convertDetailToForm } from '@web/utils/convertDetailToForm';
import { SettingContext } from '../_context/SettingContext';

export default function EditSettingClient({
  recruitmentId,
}: {
  recruitmentId: number;
}) {
  const { data: detail } = useRecruitmentDetailQuery({
    recruitmentId,
  });
  //console.log('디테일', detail);

  const { form, setForm } = useContext(SettingContext)!;

  useEffect(() => {
    if (detail && form.title === '') {
      const formValues: FormValues = convertDetailToForm(detail);
      setForm(formValues);
    }
  }, [detail, form.title, setForm]);

  return (
    <div style={{ overflow: 'hidden' }}>
      <SettingForm
        existentForm={true}
        slug={detail.UrlSlug}
        organization={detail.organizationName}
      />
    </div>
  );
}
