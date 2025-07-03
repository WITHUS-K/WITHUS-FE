'use client';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
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
import * as styles from './SettingForm.css';
import { useUserStore } from '@web/store/state/userStore';
import * as C from '@web/constants/application';
import { useToast } from '@repo/ui/hooks';

type TabKey = 'form' | 'stages' | 'criteria';
const TAB_KEYS: TabKey[] = ['form', 'stages', 'criteria'];

interface SettingFormProps {
  existentForm?: Boolean;
  slug?: string;
  organization?: string;
}

export function SettingForm({
  existentForm,
  slug,
  organization,
}: SettingFormProps) {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get('tab') as TabKey) || 'form';
  const ctx = useContext(SettingContext)!;
  const toast = useToast();

  const organizationId = useUserStore.getState().organizationId!;
  //console.log('id', organizationId);

  const draftMutation = useDraftRecruitmentMutation();
  const publishMutation = usePublishRecruitmentMutation();

  const initial = ctx.form;

  const customParts = initial.applicationParts?.isSelected
    ? initial.applicationParts.parts
    : [];
  // 최소 하나의 '공통' 섹션이 필요하므로
  const sections = customParts.length > 0 ? customParts : [null];

  const seededPaperEvaluateItems =
    initial.paperEvaluateItems && initial.paperEvaluateItems.length > 0
      ? initial.paperEvaluateItems
      : sections.map((partName) => ({
          positionName: partName,
          items: [{ evaluate: '', evaluateDetail: '' }],
        }));

  const seededInterviewEvaluateItems =
    initial.interviewEvaluateItems && initial.interviewEvaluateItems.length > 0
      ? initial.interviewEvaluateItems
      : sections.map((partName) => ({
          positionName: partName,
          items: [{ evaluate: '', evaluateDetail: '' }],
        }));

  const seeded: FormValues = {
    ...initial,
    paperEvaluateItems: seededPaperEvaluateItems,
    interviewEvaluateItems: seededInterviewEvaluateItems,

    detailItems:
      initial.detailItems && initial.detailItems.length > 0
        ? initial.detailItems
        : [
            {
              isEssential: false,
              type: 'text',
              description: '',
              addDescription: '',
              responseTarget: 0,
              typeInfo: {
                info: C.BLANK_OPTIONS[0]!,
                infoDetail: C.CHAR_LIMITS[2]!,
              },
            },
          ],
  };

  // 1. useForm 초기화 (Context에서 받은 초기값)
  const methods = useForm<FormValues>({
    defaultValues: seeded,
    mode: 'onChange',
    criteriaMode: 'all',
    shouldUnregister: false,
  });

  //console.log('폼', ctx.form);
  useEffect(() => {
    if (existentForm) {
      const next = ctx.form;
      methods.reset(next);
    }
  }, [ctx.form, methods]);

  const parts = methods.watch('applicationParts.parts') ?? [];
  useEffect(() => {
    const sections = parts.length > 0 ? parts : [null];
    const newPaper = sections.map((p) => ({
      positionName: p,
      items: [{ evaluate: '', evaluateDetail: '' }],
    }));
    const newInterview = sections.map((p) => ({
      positionName: p,
      items: [{ evaluate: '', evaluateDetail: '' }],
    }));
    methods.setValue('paperEvaluateItems', newPaper, { shouldValidate: false });
    methods.setValue('interviewEvaluateItems', newInterview, {
      shouldValidate: false,
    });
  }, [parts, methods]);

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
    paperItems.every(
      (section) =>
        section.items.length > 0 &&
        section.items.every(
          (item) =>
            item.evaluate.trim().length > 0 &&
            item.evaluateDetail.trim().length > 0
        )
    );
  const isInterviewOk =
    interviewItems.length > 0 &&
    interviewItems.every(
      (section) =>
        section.items.length > 0 &&
        section.items.every(
          (item) =>
            item.evaluate.trim().length > 0 &&
            item.evaluateDetail.trim().length > 0
        )
    );

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
  /*useEffect(() => {
    const sub = methods.watch(() => {
      ctx.setForm(methods.getValues());
    });
    return () => sub.unsubscribe();
  }, [methods, ctx]);*/

  // 6. 탭 & 버튼 핸들러
  const onTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handlePreview = useCallback(() => {
    ctx.setForm(methods.getValues());

    router.push(`${pathname}/preview`);
  }, [ctx, methods, router, pathname]);

  const handleCopyLink = useCallback(() => {
    if (!slug || !organization) return;
    const url = `${window.location.origin}/apply/${organization}/${slug}`;
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success('응답자에게 보낼 링크가 복제됐습니다.'))
      .catch(() => toast.error('링크 복사에 실패했습니다.'));
  }, [slug, organization, toast]);

  const handleSave = useCallback(() => {
    const values = methods.getValues();
    const payload = convertFormToRequest(values, recruitmentId, organizationId);
    //console.log('임시 저장:', payload);
    draftMutation.mutate(payload, {
      onSuccess: (res) => {
        /*if (pathname.endsWith('/new')) {
          router.replace(`/application-list/setting/${res.recruitmentId}`);
        }*/
        toast.success('임시 저장 되었습니다.');
      },
      onError: (err) => {
        console.error('임시 저장 실패', err);
      },
    });
  }, [draftMutation, methods, pathname, router, recruitmentId]);

  const onSubmit = useCallback(
    (data: FormValues) => {
      const payload = convertFormToRequest(data, recruitmentId, organizationId);
      // console.log('최종 저장:', payload);
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
      <div className={styles.container}>
        <Breadcrumb style={{ marginTop: '1.2rem' }}>
          <Breadcrumb.Item asChild>
            <Link href="/application-list">지원서 리스트</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>지원서 상세 설정</Breadcrumb.Item>
        </Breadcrumb>

        <Flex
          align="center"
          width="100%"
          justify="spaceBetween"
          marginTop="2.4rem"
          marginBottom="2.4rem"
        >
          <Text variant="xl_title_semibold" color="black">
            지원서 상세 설정
          </Text>
          <Flex gap="0.8rem">
            <Button
              variant="sub"
              leftIcon={<IcLinkCopy />}
              size="40"
              width="14.6rem"
              disabled={recruitmentId === null}
              onClick={handleCopyLink}
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
              disabled={recruitmentId != null}
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
        <div className={styles.scrollArea} ref={scrollAreaRef}>
          <form
            id="application-form"
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ display: 'flex', width: '100%' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
          >
            {activeTab === 'form' && <FormTab />}
            {activeTab === 'stages' && (
              <StageTab scrollContainerRef={scrollAreaRef} />
            )}
            {activeTab === 'criteria' && <CriteriaTab />}
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
