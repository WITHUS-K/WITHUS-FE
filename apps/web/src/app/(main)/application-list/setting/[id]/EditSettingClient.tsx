'use client';
import React, { useEffect, useContext, useMemo, useRef } from 'react';
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
  const { data: detail } = useRecruitmentDetailQuery({ recruitmentId });
  const { setForm } = useContext(SettingContext)!;

  const formValues: FormValues | null = useMemo(
    () => (detail ? convertDetailToForm(detail) : null),
    [detail]
  );

  const seededIdRef = useRef<number | null>(null);
  useEffect(() => {
    if (!detail || !formValues) return;

    if (seededIdRef.current !== detail.recruitmentId) {
      setForm(formValues);
      seededIdRef.current = detail.recruitmentId;
    }
  }, [detail, formValues, setForm]);

  if (!detail) return null;

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
