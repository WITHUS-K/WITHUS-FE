'use client';
import React, { useCallback, useContext, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import { Button } from '@repo/ui/Button';
import { TabBar } from '@repo/ui/TabBar';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { IcLinkCopy, IcPreview, IcSave } from '@repo/ui/icons/mono';
import { SettingContext } from '@web/app/(main)/application-list/setting/_context/SettingContext';
import { FormValues } from '@web/types/application';
import FormTab from '@web/app/(main)/application-list/setting/_components/FormTab/FormTab';
import StageTab from '@web/app/(main)/application-list/setting/_components/StageTab/StageTab';
import CriteriaTab from '@web/app/(main)/application-list/setting/_components/CriteriaTab/CriteriaTab';
import { useDraftRecruitmentMutation } from '@web/store/mutation/useDraftRecruitmentMutation';
import { usePublishRecruitmentMutation } from '@web/store/mutation/usePublishRecruitmentMutation';
import { convertFormToRequest } from '@web/utils/convertFormToRequest';

type TabKey = 'form' | 'stages' | 'criteria';
const TAB_KEYS: TabKey[] = ['form', 'stages', 'criteria'];

export function SettingForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get('tab') as TabKey) || 'form';
  const ctx = useContext(SettingContext)!;

  const draftMutation = useDraftRecruitmentMutation();
  const publishMutation = usePublishRecruitmentMutation();

  // 1. useForm 초기화 (Context에서 받은 초기값)
  const methods = useForm<FormValues>({
    defaultValues: ctx.form,
    mode: 'onChange',
    criteriaMode: 'all',
    shouldUnregister: false,
  });

  // 2. watch 해서 필드값 가져오기
  const title = methods.watch('title') || '';
  const basicInfo = methods.watch('basicInfo')!;
  const detailItems = methods.watch('detailItems')!;
  const deadline = methods.watch('deadline')!;
  const interviewDuration = methods.watch('interviewDuration')!;
  const finalResultDate = methods.watch('finalResultDate')!;
  const paperItems = methods.watch('paperEvaluateItems')!;
  const interviewItems = methods.watch('interviewEvaluateItems')!;

  const last = pathname.split('/').pop()!;
  const recruitmentId = last === 'new' ? null : Number(last);

  // 3. 개별 검증
  const isTitleOk = !!title.trim();
  const isBasicInfoOk = true;
  const isDetailItemsOk =
    detailItems.length > 0 &&
    detailItems.every((d) => d.description.trim().length > 0);
  const isDeadlineOk = !!deadline;
  const isDurationOk = !!interviewDuration;
  const isFinalOk = !!finalResultDate;
  const isPaperOk =
    paperItems.length > 0 &&
    paperItems.every((p) => p.evaluate.trim() && p.evaluateDetail.trim());
  const isInterviewOk =
    interviewItems.length > 0 &&
    interviewItems.every((i) => i.evaluate.trim() && i.evaluateDetail.trim());

  useEffect(() => {
    console.log({
      isTitleOk,
      isBasicInfoOk,
      isDetailItemsOk,
      isDeadlineOk,
      isDurationOk,
      isFinalOk,
      isPaperOk,
      isInterviewOk,
    });
  }, [
    isTitleOk,
    isBasicInfoOk,
    isDetailItemsOk,
    isDeadlineOk,
    isDurationOk,
    isFinalOk,
    isPaperOk,
    isInterviewOk,
  ]);

  // 4. 최종 버튼 활성 조건
  const canSubmit =
    isTitleOk &&
    isBasicInfoOk &&
    isDetailItemsOk &&
    isDeadlineOk &&
    isDurationOk &&
    isFinalOk &&
    isPaperOk &&
    isInterviewOk;

  // 5. 폼 변경 시 Context 동기화
  useEffect(() => {
    const sub = methods.watch(() => {
      ctx.setForm(methods.getValues());
    });
    return () => sub.unsubscribe();
  }, [methods, ctx]);

  // 6. 탭 & 버튼 핸들러
  const onTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handlePreview = () => router.push('/application-list/setting/preview');

  const handleSave = useCallback(() => {
    const values = methods.getValues();
    const payload = convertFormToRequest(values, recruitmentId);
    console.log('저장 값:', payload);
    draftMutation.mutate(payload, {
      onSuccess: (res) => {
        if (pathname.endsWith('/new')) {
          router.replace(`/application-list/setting/${res.recruitmentId}`);
        }
      },
      onError: (err) => {
        console.error('임시 저장 실패', err);
      },
    });
  }, [draftMutation, methods, pathname, router, recruitmentId]);

  const onSubmit = useCallback(
    (data: FormValues) => {
      const payload = convertFormToRequest(data, recruitmentId);
      publishMutation.mutate(payload, {
        onSuccess: () => {
          router.push('/application-list');
        },
      });
    },
    [publishMutation, router, recruitmentId]
  );

  return (
    <FormProvider {...methods}>
      <Flex
        direction="column"
        paddingLeft="2.4rem"
        paddingTop="2.4rem"
        paddingRight="2.4rem"
        paddingBottom="2.4rem"
        gap="2.4rem"
        height="100%"
        width="100%"
      >
        <Breadcrumb style={{ marginTop: '1.2rem' }}>
          <Breadcrumb.Item asChild>
            <Link href="/application-list">지원서 리스트</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>지원서 상세 설정</Breadcrumb.Item>
        </Breadcrumb>

        <Flex align="center" width="100%" justify="spaceBetween">
          <Text variant="xl_title_semibold" color="black">
            지원서 상세 설정
          </Text>
          <Flex gap="0.8rem">
            <Button
              variant="sub"
              leftIcon={<IcLinkCopy />}
              size="40"
              width="14.6rem"
            >
              응답자 링크
            </Button>
            <Button
              variant="sub"
              leftIcon={<IcPreview />}
              onClick={handlePreview}
              size="40"
              width="12.8rem"
            >
              미리보기
            </Button>
            <Button
              variant="sub"
              leftIcon={<IcSave />}
              size="40"
              width="13.2rem"
              onClick={handleSave}
            >
              임시 저장
            </Button>
            <Button
              variant="main"
              type="submit"
              form="application-form"
              disabled={!canSubmit}
              size="40"
              width="10rem"
            >
              완료
            </Button>
          </Flex>
        </Flex>

        {/* Tabs */}
        <TabBar
          tabs={TAB_KEYS}
          active={activeTab}
          onChange={onTabChange}
          showIndicator
        />

        {/* Form */}
        <form
          id="application-form"
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{ display: 'flex', width: '100%' }}
        >
          {activeTab === 'form' && <FormTab />}
          {activeTab === 'stages' && <StageTab />}
          {activeTab === 'criteria' && <CriteriaTab />}
        </form>

        {/* <form
          id="application-form"
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{ position: 'relative', width: '100%' }}
        >
          <div
            style={{
              display: activeTab === 'form' ? 'block' : 'none',
              width: '100%',
              position: activeTab === 'form' ? 'static' : 'absolute',
              top: 0,
              left: 0,
            }}
          >
            <FormTab />
          </div>
          <div
            style={{
              display: activeTab === 'stages' ? 'block' : 'none',
              width: '100%',
              position: activeTab === 'stages' ? 'static' : 'absolute',
              top: 0,
              left: 0,
            }}
          >
            <StageTab />
          </div>
          <div
            style={{
              display: activeTab === 'criteria' ? 'block' : 'none',
              width: '100%',
              position: activeTab === 'criteria' ? 'static' : 'absolute',
              top: 0,
              left: 0,
            }}
          >
            <CriteriaTab />
          </div>
        </form> */}
      </Flex>
    </FormProvider>
  );
}
