'use client';

import { useToast } from '@repo/ui/hooks';
import { useCallback } from 'react';

type BasicInfo = {
  name: string;
  email: string;
  phone: string;
  gender?: 'MALE' | 'FEMALE' | string | undefined | null;
  birthDate?: string | undefined | null;
};

type AdditionalInfo = {
  school?: string;
  academicStatus?: string | null;
  major?: string;
  address?: string;
  profileImage?: File | null;
};

type DetailItem =
  | {
      questionId: number;
      required: boolean;
      type: 'text';
      description: string;
      addDescription?: string;
      typeInfo: { info: string; infoDetail?: string };
    }
  | {
      questionId: number;
      required: boolean;
      type: 'file';
      description: string;
      addDescription?: string;
      typeInfo: { info: string; infoDetail?: string };
    };

export function useMissingFieldToast(params: {
  // 필요 여부 플래그
  needImage?: boolean;
  needGender?: boolean;
  needBirthDate?: boolean;
  needSchool?: boolean;
  needAcademicStatus?: boolean;
  needMajor?: boolean;
  needAddress?: boolean;
  needInterview?: boolean;

  // 값들
  basicInfo: BasicInfo;
  additionalInfo: AdditionalInfo;
  hasPositions: boolean;
  selectedPartLabel?: string | null;

  // 질문/답변
  detailItems: DetailItem[];
  textAnswers: string[];
  fileAnswers: File[][];

  // 인터뷰 스케줄
  scheduleList: unknown[]; // 길이만 보면 되므로 any OK
}) {
  const toast = useToast();

  const check = useCallback(() => {
    const {
      needImage,
      needGender,
      needBirthDate,
      needSchool,
      needAcademicStatus,
      needMajor,
      needAddress,
      needInterview,

      basicInfo,
      additionalInfo,
      hasPositions,
      selectedPartLabel,

      detailItems,
      textAnswers,
      fileAnswers,

      scheduleList,
    } = params;

    // 1) 기본정보
    if (!basicInfo.name?.trim()) {
      toast.error('이름을 작성해주세요.');
      return false;
    }
    if (needGender && (basicInfo.gender == null || basicInfo.gender === '')) {
      toast.error('성별을 선택해주세요.');
      return false;
    }
    if (!basicInfo.phone?.trim()) {
      toast.error('전화번호를 작성해주세요.');
      return false;
    }
    if (needBirthDate && !basicInfo.birthDate) {
      toast.error('생년월일을 선택해주세요.');
      return false;
    }
    if (!basicInfo.email?.trim()) {
      toast.error('이메일을 작성해주세요.');
      return false;
    }

    // 2) 추가정보
    if (needImage && !additionalInfo.profileImage) {
      toast.error('사진을 업로드해주세요.');
      return false;
    }
    if (needSchool && !additionalInfo.school?.trim()) {
      toast.error('학교를 작성해주세요.');
      return false;
    }
    if (
      needAcademicStatus &&
      (additionalInfo.academicStatus == null ||
        additionalInfo.academicStatus === '')
    ) {
      toast.error('학적 상태를 선택해주세요.');
      return false;
    }
    if (needMajor && !additionalInfo.major?.trim()) {
      toast.error('전공을 작성해주세요.');
      return false;
    }
    if (needAddress && !additionalInfo.address?.trim()) {
      toast.error('주소를 작성해주세요.');
      return false;
    }

    // 3) 지원 파트
    if (hasPositions && !selectedPartLabel) {
      toast.error('지원 파트를 선택해주세요.');
      return false;
    }

    // 4) 질문 체크
    let tIdx = 0;
    let fIdx = 0;
    for (let i = 0; i < detailItems.length; i++) {
      const item = detailItems[i];
      const qNo = i + 1;

      if (item!.type === 'text') {
        const ans = (textAnswers[tIdx++] ?? '').trim();
        if (item!.required && !ans) {
          toast.error(`"질문-${qNo - 1}" 항목을 작성해주세요.`);
          return false;
        }
      } else {
        const files = fileAnswers[fIdx++] ?? [];
        if (item!.required && (!Array.isArray(files) || files.length === 0)) {
          toast.error('파일을 업로드해주세요.');
          return false;
        }
      }
    }

    // 5) 인터뷰 스케줄
    if (
      needInterview &&
      (!Array.isArray(scheduleList) || scheduleList.length === 0)
    ) {
      toast.error('면접 가능 일정을 선택해주세요.');
      return false;
    }

    return true;
  }, [params, toast]);

  return check;
}
