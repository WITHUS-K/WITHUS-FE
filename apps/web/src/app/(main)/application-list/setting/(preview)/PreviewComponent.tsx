'use client';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import {
  SettingContext,
  SettingContextType,
} from '@web/app/(main)/application-list/setting/_context/SettingContext';
import { FormValues } from '@web/types/application';
import { useContext, useEffect, useMemo, useState } from 'react';
import * as styles from './PreviewComponent.css';
import { PreviewHeader } from '@web/app/(main)/application-list/setting/(preview)/_components/PreivewHeader/PreivewHeader';
import { BasicInfoPreview } from '@web/app/(main)/application-list/setting/(preview)/_components/BasicInfoPreview/BasicInfoPreview';
import { AdditionalInfoPreview } from '@web/app/(main)/application-list/setting/(preview)/_components/AdditionalInfoPreview/AdditionalInfoPreview';
import { ApplicationPartsPreview } from '@web/app/(main)/application-list/setting/(preview)/_components/ApplicationPartPreview/ApplicationPartsPreview';
import { QuestionAndFileList } from '@web/app/(main)/application-list/setting/(preview)/_components/QuestionFileList/QuestionFileList';
import { SelectableTimeTable } from '@web/components/TimeTable/SelectableTimeTable';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { TIME_STEP } from '@web/utils/application';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';
import { useOrganizationRolesQuery } from '@web/store/query/useOrganizationRolesQuery';

export default function PreviewComponent() {
  const ctx = useContext<SettingContextType | null>(SettingContext);
  if (!ctx) return null;
  const form: FormValues = ctx.form;

  const { organizationId } = getClientSideTokens();
  const { data: rolesData } = useOrganizationRolesQuery({ organizationId });

  const roleNameById = useMemo(() => {
    const m = new Map<number, string>();
    (rolesData?.roles ?? []).forEach((r) => m.set(r.id, r.roleName));
    return m;
  }, [rolesData]);

  const applicationSchedule = [
    {
      label: '지원 마감',
      date: form.deadline ? format(parseISO(form.deadline), 'yyyy/MM/dd') : '',
    },
    {
      label: '서류 합격 발표',
      date: form.documentResult?.date
        ? format(parseISO(form.documentResult.date), 'yyyy/MM/dd')
        : '',
    },
    {
      label: '면접 일정',
      date: form.interviewSchedule?.scheduleList.length
        ? form.interviewSchedule.scheduleList
            .map((s) => format(parseISO(s.date!), 'yyyy/MM/dd'))
            .join(', ')
        : '',
    },
    {
      label: '최종 합격 발표',
      date: form.finalResultDate
        ? format(parseISO(form.finalResultDate), 'yyyy/MM/dd')
        : '',
    },
  ];

  const hasParts = form.applicationParts?.isSelected === true;
  const [selectedPartIdx, setSelectedPartIdx] = useState<number>(0);

  const roleIds = form.applicationParts?.parts ?? [];

  const partNames = useMemo(() => {
    return roleIds.map((id) => roleNameById.get(id) ?? `파트(${id})`);
  }, [roleIds, roleNameById]);

  useEffect(() => {
    if (!hasParts) {
      setSelectedPartIdx(0);
      return;
    }
    if (partNames.length > 0 && selectedPartIdx >= partNames.length) {
      setSelectedPartIdx(Math.max(0, partNames.length - 1));
    }
  }, [hasParts, partNames.length, selectedPartIdx]);

  const filteredItems = useMemo(() => {
    const items = form.detailItems ?? [];
    
    if (!hasParts || roleIds.length === 0) {
      return items.filter((item) => Number(item.responseTarget) === 0);
    }

    const targetIndex = selectedPartIdx + 1;
    const targetRoleId = roleIds[selectedPartIdx];

    const out = items.filter((item) => {
      const target = Number(item.responseTarget);

      if (target === 0) return true;

      if (target === targetIndex) return true;

      if (targetRoleId !== undefined && target === targetRoleId) return true;

      return false;
    });

    return out;
  }, [form.detailItems, hasParts, roleIds, selectedPartIdx]);

  const interval = TIME_STEP[form.interviewDuration];
  const allSlots = form.interviewSchedule?.scheduleList ?? [];

  const dates = useMemo(
    () => Array.from(new Set(allSlots.map((s) => s.date))),
    [allSlots]
  );

  return (
    <Flex
      direction="column"
      paddingLeft="1.9rem"
      paddingTop="2.4rem"
      paddingRight="1.9rem"
      paddingBottom="2.4rem"
      width="100%"
    >
      <PreviewHeader />

      <div className={styles.container}>
        <Flex direction="column" width="100%" gap="5rem">
          <div className={styles.title}>
            {form.title || '[한국대학생IT경영학회] 큐시즘 32기 학회원 모집'}
          </div>
          <div className={styles.headerWrapper}>
            {applicationSchedule.map((s, i) => (
              <div key={i} className={styles.item}>
                <Text variant="md1_text_semibold" color="grayscale70">
                  {s.label}
                </Text>
                <Text variant="md2_text_medium" color="grayscale50">
                  {s.date}
                </Text>
              </div>
            ))}
          </div>
        </Flex>

        <Flex direction="column" width="100%" gap="4rem">
          <BasicInfoPreview
            profile={form.basicInfo.profile}
            gender={form.basicInfo.gender}
            birthDate={form.basicInfo.birthDate}
          />
          <AdditionalInfoPreview
            school={form.basicInfo.school}
            academicStatus={form.basicInfo.academicStatus}
            major={form.basicInfo.major}
            address={form.basicInfo.address}
          />
        </Flex>

        {form.applicationParts?.isSelected && partNames.length > 0 && (
          <ApplicationPartsPreview
            parts={partNames}
            selectedIndex={selectedPartIdx}
            onChange={setSelectedPartIdx}
          />
        )}

        <QuestionAndFileList detailItems={filteredItems} />

        {form.interviewSchedule?.scheduleList.length! > 0 && (
          <div style={{ width: '100%' }}>
            <Flex gap="0.4rem" direction="column">
              <Text variant="md1_text_semibold" color="grayscale70">
                면접 가능 일정 투표
              </Text>
              <Text variant="sm_caption_medium" color="grayscale40">
                아래 일정 중 면접이 가능한 모든 시간대를 드래그로 등록해주세요.
                (면접 시간: {form.interviewDuration} 소요)
              </Text>
            </Flex>

            <Flex
              gap="6.4rem"
              justify="center"
              width="100%"
              style={{ marginTop: '1.6rem' }}
            >
              {dates.map((isoDate) => {
                const dt = parseISO(isoDate!);
                const label = format(dt, 'yyyy년 MM월 dd일 (EEE)', {
                  locale: ko,
                });

                const scheduleListForDate = allSlots.filter(
                  (s) => s.date === isoDate
                );

                const hours = scheduleListForDate.flatMap((s) => [
                  parseInt(s.startTime.split(':')[0]!, 10),
                  parseInt(s.endTime.split(':')[0]!, 10),
                ]);
                const startHour = Math.min(...hours);
                const endHour = Math.max(...hours);

                return (
                  <SelectableTimeTable
                    key={isoDate}
                    title={label}
                    startHour={startHour}
                    endHour={endHour}
                    interval={interval}
                    width="40rem"
                    selectable={false}
                    interviewSchedule={{
                      isSelected: form.interviewSchedule?.isSelected ?? false,
                      scheduleList: scheduleListForDate,
                    }}
                  />
                );
              })}
            </Flex>
          </div>
        )}
      </div>
    </Flex>
  );
}