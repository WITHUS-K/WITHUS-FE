// src/web/store/mutation/useCreateApplication.ts
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

// ——— 요청 DTO 타입 ———
export interface CreateApplicationRequest {
  name: string;
  email: string;
  phoneNumber: string;
  gender?: 'MALE' | 'FEMALE';
  university?: string;
  major?: string;
  academicStatus?: 'ENROLLED' | 'GRADUATED' | 'LEAVE_OF_ABSENCE' | 'DEFERRED';
  birthDate?: string; // ISO 문자열(예: "2000-01-01")
  address?: string;
  recruitmentId: number;
  positionId?: number | null;
  positionIds?: number[];
  /** 질문별 답변 */
  answers: Array<{
    questionId: number;
    answerText: string;
    fileName: string | null;
  }>;
  /** 면접 가능 시각 목록 (ISO 8601) */
  availableTimes: string[];
}

// ——— 응답 DTO 타입 ———
export interface CreateApplicationResponse {
  code: number;
  message: string;
  result: {
    id: number;
    name: string;
    email: string;
    organizationRoleName : string;
    appliedPositions?: string[];
    status: string; // e.g. "PENDING"
  };
  success: boolean;
}

/**
 * 지원서 생성 API 호출 훅
 */
export function useCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation<
    CreateApplicationResponse,
    Error,
    {
      /** JSON 요청 DTO */
      payload: CreateApplicationRequest;
      /** 프로필 이미지 (없으면 undefined) */
      profileImage?: File;
      /** 질문 파일들 (없으면 빈 배열) */
      answerFiles?: File[];
    }
  >({
    mutationFn: async ({ payload, profileImage, answerFiles = [] }) => {
      const form = new FormData();

      form.append(
        'request',
        new Blob([JSON.stringify(payload)], { type: 'application/json' })
      );

      if (profileImage) {
        form.append('profileImage', profileImage, profileImage.name);
      }

      for (const file of answerFiles) {
        form.append('files', file, file.name);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/applications`,
        {
          method: 'POST',
          body: form,
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error('API error status/text:', res.status, text);
        throw new Error(`지원서 생성 실패: ${res.status} ${text}`);
      }

      return (await res.json()) as CreateApplicationResponse;
    },

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          'admin',
          'applications',
          'recruitment',
          variables.payload.recruitmentId,
        ],
      });
    },
  });
}
