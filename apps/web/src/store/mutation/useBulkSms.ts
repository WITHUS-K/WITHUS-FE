import { useMutation } from '@tanstack/react-query';
import { api } from '@web/api/api';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';
import ky from 'ky';

export interface BulkSmsRequest {
  applicationIds: number[];
  message: string;
  attachment?: File;
}

export function useBulkSms() {
  return useMutation<void, Error, BulkSmsRequest>({
    mutationFn: async ({ applicationIds, message, attachment }) => {
      // 1) FormData 구성
      const form = new FormData();
      const { accessToken } = getClientSideTokens();
      applicationIds.forEach((id) => form.append('applicationIds', String(id)));
      form.append('message', message);
      if (attachment) form.append('attachment', attachment);

      // 2) 보내는 데이터 콘솔
      console.log('[useBulkSms] Request FormData entries:');
      for (const [key, value] of form.entries()) {
        console.log(`  ${key}:`, value);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/applications/bulk-sms`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: form,
        }
      );

      console.log('[useBulkSms] HTTP status:', res);

      // 1) JSON 으로 내려주면 파싱, 아니면 텍스트로
      let text: string;
      try {
        const json = await res.json();
        console.log('[useBulkSms] Response JSON:', json);
      } catch {
        text = await res.text();
        console.log('[useBulkSms] Response text:', text);
      }

      if (!res.ok) {
        throw new Error(`bulk-sms failed: ${res.status}`);
      }
    },
  });
}
