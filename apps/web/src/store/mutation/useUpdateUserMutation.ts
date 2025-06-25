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

      const jsonBlob = new Blob([JSON.stringify(data)], {
        type: 'application/json',
      });
      fd.append('request', jsonBlob);

      if (profileImageFile) {
        fd.append('profileImage', profileImageFile, profileImageFile.name);
      }

      return updateUser(fd);
    },

    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.user.myPage() });
    },
  });
}
