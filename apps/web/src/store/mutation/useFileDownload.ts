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

      const payload = { imageUrl, fileName };
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

      try {
        const cloned = res.clone(); // blob 변환 전에 clone
        const text = await cloned.text();
        console.log('[useFileDownload] response body (as text):', text);
      } catch (e) {
        console.warn('[useFileDownload] failed to read response body as text');
      }

      // blob 변환 후 다운로드
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    },
  });
}
