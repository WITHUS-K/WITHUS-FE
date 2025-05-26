import { useMutation } from '@tanstack/react-query';
import { api } from '@web/api/api';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';
import ky from 'ky';

export interface BulkMailRequest {
  applicationIds: number[];
  subject: string;
  body: string;
  attachments?: File[];
}

export function useBulkMail() {
  return useMutation<void, Error, BulkMailRequest>({
    mutationFn: async ({ applicationIds, subject, body, attachments }) => {
      // 1) FormData 구성
      const form = new FormData();
      const { accessToken } = getClientSideTokens();
      applicationIds.forEach((id) => form.append('applicationIds', String(id)));
      form.append('subject', subject);
      form.append('body', body);
      (attachments ?? []).forEach((file) => form.append('attachments', file));

      // 2) 보내는 데이터 콘솔
      console.log('[useBulkMail] Request FormData entries:');
      for (const [key, value] of form.entries()) {
        console.log(`  ${key}:`, value);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/applications/bulk-mail`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: form,
        }
      );

      // 3) 요청 & 응답
      console.log('[useBulkEmail] HTTP status:', res);

      // 1) JSON 으로 내려주면 파싱, 아니면 텍스트로
      let text: string;
      try {
        const json = await res.json();
        console.log('[useBulkEmail] Response JSON:', json);
      } catch {
        text = await res.text();
        console.log('[useBulkEmail] Response text:', text);
      }

      if (!res.ok) {
        throw new Error(`bulk-email failed: ${res.status}`);
      }
    },
  });
}
