// src/web/store/mutation/useCreateApplication.ts
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

// ——— 요청 DTO 타입 ———
export interface CreateApplicationRequest {
  name: string;
  email: string;
  phoneNumber: string;
  gender: 'MALE' | 'FEMALE';
  university?: string;
  major?: string;
  academicStatus?: 'ENROLLED' | 'GRADUATED' | 'LEAVE_OF_ABSENCE' | 'DEFERRED';
  birthDate?: string; // ISO 문자열(예: "2000-01-01")
  address?: string;
  recruitmentId: number;
  positionId?: number | null;
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
    positionName: string;
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
      // 1) FormData 생성
      const form = new FormData();

      console.log('payload to be stringified:', payload);
      //console.log('JSON stringified:', JSON.stringify(payload));

      form.append(
        'request',
        new Blob([JSON.stringify(payload)], { type: 'application/json' })
      );

      // 3) 프로필 이미지 (optional)
      if (profileImage) {
        form.append('profileImage', profileImage, profileImage.name);
      }

      // 4) 질문 첨부 파일들
      /*for (const file of answerFiles) {
        const safeName = sanitizeFileName(file.name);
        // 새 File 객체로 이름만 교체
        const safeFile = new File([file], safeName, { type: file.type });
        form.append('files', safeFile, safeName);
      }*/
      for (const file of answerFiles) {
        form.append('files', file, file.name);
      }

      //console.log('FormData entries:');
      for (const [key, val] of Array.from(form.entries())) {
        //console.log(key, val);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/applications`,
        {
          method: 'POST',
          body: form,
        }
      );

      console.log('응답', res);
      if (!res.ok) {
        const text = await res.text();
        console.error('API error status/text:', res.status, text);
        throw new Error(`지원서 생성 실패: ${res.status} ${text}`);
      }

      // 6) 결과 파싱
      const json = (await res.json()) as CreateApplicationResponse;
      //console.log('API 응답 JSON:', json);
      return json;
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
