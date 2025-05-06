'use client';

import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import { Button } from '@repo/ui/Button';
import { TabBar } from '@repo/ui/TabBar';
import { IcLinkCopy, IcPreview, IcSave } from '@repo/ui/icons/mono';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';

import { FormValues } from '@web/types/application';
import FormTab from './_components/FormTab/FormTab';
import { SettingContext } from './_context/SettingContext';
import StageTab from './_components/StageTab/StageTab';

type TabKey = 'form' | 'stages' | 'criteria';
const TAB_KEYS: TabKey[] = ['form', 'stages', 'criteria'];

export default function SettingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get('tab') as TabKey) || 'form';

  // ② Context에서 form 상태와 setter를 꺼내오기
  const ctx = useContext(SettingContext)!;

  // ③ useForm을 Context의 form을 기본값(defaultValues)으로 초기화
  const methods = useForm<FormValues>({
    defaultValues: ctx.form,
    mode: 'onChange',
  });

  // ④ form 값이 변경될 때마다 Context에도 동기화
  useEffect(() => {
    const subscription = methods.watch(() => {
      // getValues()는 FormValues 타입을 그대로 반환합니다.
      const fullValues = methods.getValues() as FormValues;
      ctx.setForm(fullValues);
    });
    return () => subscription.unsubscribe();
  }, [methods, ctx]);

  // ⑤ 탭 변경 함수 (string → TabKey 캐스팅)
  const onTabChange = (tab: string) => {
    const key = tab as TabKey;
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', key);
    router.replace(`/application-list/setting?${params.toString()}`);
  };

  // ⑥ 미리보기: Context에 저장된 form을 그대로 사용하므로 query 없이 이동
  const handlePreview = () => {
    router.push('/application-list/setting/preview');
  };

  const onSubmit = (data: FormValues) => {};

  return (
    <FormProvider {...methods}>
      <Flex
        direction="column"
        padding="2.4rem"
        width="100%"
        height="100%"
        gap="1.2rem"
      >
        <Breadcrumb style={{ marginTop: '1.2rem' }}>
          <Breadcrumb.Item asChild>
            <Link href="/application-list">지원서 리스트</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>지원서 상세 설정</Breadcrumb.Item>
        </Breadcrumb>

        <Flex align="center" justify="spaceBetween" width="100%">
          <Text variant="xl_title_semibold" color="black">
            지원서 상세 설정
          </Text>
          <Flex align="center" gap="0.8rem">
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
              size="40"
              width="12.8rem"
              onClick={handlePreview}
            >
              미리보기
            </Button>
            <Button
              variant="sub"
              leftIcon={<IcSave />}
              size="40"
              width="13.2rem"
            >
              임시 저장
            </Button>
            <Button
              variant="main"
              size="40"
              width="10rem"
              type="submit"
              form="application-form"
              disabled={!methods.formState.isValid}
            >
              완료
            </Button>
          </Flex>
        </Flex>

        <TabBar
          tabs={TAB_KEYS}
          active={activeTab}
          onChange={onTabChange}
          showIndicator
        />

        <form
          id="application-form"
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{ width: '100%', display: 'flex' }}
        >
          {activeTab === 'form' && <FormTab />}
          {activeTab === 'stages' && <StageTab />}
          {activeTab === 'criteria' && <>criteria</>}
        </form>
      </Flex>
    </FormProvider>
  );
}
