import { MyPageData, UpdateUserRequestDTO } from '../query/useGetMyPageQuery';

export type UpdateUserResponseData = MyPageData;

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../constants/queryKeys';
import { Tokens } from '@web/api/types';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';
import { api } from '@web/api/api';

function updateUser(
  formData: FormData,
  tokens?: Tokens
): Promise<UpdateUserResponseData> {
  const tk = tokens ?? getClientSideTokens();
  const headers: Record<string, string> = {};
  if (tk.accessToken) headers['Authorization'] = `Bearer ${tk.accessToken}`;

  return api
    .patch('api/v1/users', {
      body: formData,
      headers,
    })
    .json<{
      result: UpdateUserResponseData;
    }>()
    .then((res) => res.result);
}

export function useUpdateUserMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      profileImageFile,
    }: {
      data: UpdateUserRequestDTO;
      profileImageFile?: File;
    }) => {
      const fd = new FormData();

      // ✅ 핵심: data를 JSON으로 묶어서 "request" 필드에 넣기
      const jsonBlob = new Blob([JSON.stringify(data)], {
        type: 'application/json',
      });
      fd.append('request', jsonBlob);

      // ✅ 이미지도 함께 전송
      if (profileImageFile) {
        fd.append('profileImage', profileImageFile, profileImageFile.name);
      }

      console.log('[PATCH 요청 FormData]');
      for (const [key, val] of fd.entries()) {
        console.log(`${key}:`, val);
      }

      return updateUser(fd); // → 기존 patch 호출 유지
    },

    onSuccess: (data) => {
      console.log('[회원정보 수정 성공]', data);
      qc.invalidateQueries({ queryKey: queryKeys.user.myPage() });
    },

    onError: (error) => {
      console.error('[회원정보 수정 실패]', error);
    },
  });
}
