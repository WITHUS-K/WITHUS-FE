import { useMutation } from '@tanstack/react-query';
import { api } from '@web/api/api';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';

export interface DownloadParams {
  imageUrl: string;
  fileName: string;
}

export function useFileDownload() {
  return useMutation<void, Error, DownloadParams>({
    mutationFn: async ({ imageUrl, fileName }: DownloadParams) => {
      const { accessToken } = getClientSideTokens();

      // 한글을 포함한 URL 경로만 인코딩
      const safeImageUrl = encodeURI(imageUrl);
      const payload = { imageUrl: safeImageUrl, fileName };
      console.log('[useFileDownload] request payload:', payload);

      const res = await api.post('api/v1/files/download', {
        json: payload,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      console.log('[useFileDownload] response status:', res.status);
      console.log(
        '[useFileDownload] response headers:',
        Array.from(res.headers.entries())
      );

      // 2xx 외에는 에러 처리
      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        throw new Error(
          `[useFileDownload] 다운로드 실패: ${res.status} ${errText}`
        );
      }

      // blob 받아서 다운로드
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName; // 한글 파일명 그대로 사용
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    },
  });
}
