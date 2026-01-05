'use client';

import { useMutation } from '@tanstack/react-query';
import type { Tokens } from '@web/api/types';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';
import { api } from '@web/api/api';

export type AdminApplicationStage =
  | 'DOCUMENT'
  | 'INTERVIEW'
  | 'FINAL_PASS'
  | 'FAIL';

export type AdminApplicationSortBy =
  | 'LATEST'
  | 'NAME'
  | 'POSITION_NAME'
  | 'DOCUMENT_EVALUATION_STATUS'
  | 'INTERVIEW_EVALUATION_STATUS'
  | 'DOCUMENT_SCORE'
  | 'INTERVIEW_SCORE'
  | 'STATUS'
  | 'IS_MAIL_SENT'
  | 'IS_SMS_SENT';

export type AdminApplicationDirection = 'ASC' | 'DESC';

export type AdminApplicationStatus =
  | 'PENDING'
  | 'DOX_PASS'
  | 'DOX_FAIL'
  | 'DOX_PENDING'
  | 'INTERVIEW_PASS'
  | 'INTERVIEW_FAIL'
  | 'INTERVIEW_PENDING';

export interface DownloadAdminApplicationsExcelParams {
  recruitmentId: number;

  stage?: AdminApplicationStage; // default DOCUMENT
  sortBy?: AdminApplicationSortBy; // default LATEST
  direction?: AdminApplicationDirection; // default DESC

  organizationRoleIds?: number[];
  statuses?: AdminApplicationStatus[];
  keyword?: string;

  tokens?: Tokens;
}

type ExcelQueryParams = {
  stage: AdminApplicationStage;
  sortBy: AdminApplicationSortBy;
  direction: AdminApplicationDirection;
  organizationRoleIds?: number[];
  statuses?: AdminApplicationStatus[];
  keyword?: string;
};

function buildExcelQuery(params: ExcelQueryParams): string {
  const qp = new URLSearchParams();

  qp.set('stage', params.stage);
  qp.set('sortBy', params.sortBy);
  qp.set('direction', params.direction);

  if (params.organizationRoleIds?.length) {
    params.organizationRoleIds.forEach((id) =>
      qp.append('organizationRoleIds', String(id))
    );
  }

  if (params.statuses?.length) {
    params.statuses.forEach((s) => qp.append('statuses', s));
  }

  const kw = params.keyword?.trim();
  if (kw) qp.set('keyword', kw);

  return qp.toString();
}

// content-disposition 에서 filename 추출 (있으면 그걸 사용)
function getFilenameFromDisposition(disposition: string | null): string | null {
  if (!disposition) return null;

  // filename*=UTF-8''xxx.xlsx 형태 우선
  const utf8Match = disposition.match(/filename\*\s*=\s*UTF-8''([^;]+)/i);
  if (utf8Match?.[1]) return decodeURIComponent(utf8Match[1].replace(/"/g, ''));

  // filename="xxx.xlsx"
  const match = disposition.match(/filename\s*=\s*("?)([^";]+)\1/i);
  if (match?.[2]) return match[2];

  return null;
}

function triggerDownload(blob: Blob, filename: string) {
  console.log('[excel] triggerDownload:', { filename, size: blob.size, type: blob.type });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;

  // Safari/일부 브라우저에서 더 안정적
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();

  // cleanup
  setTimeout(() => {
    a.remove();
    URL.revokeObjectURL(url);
  }, 1000);
}

export function useAdminApplicationsExcelDownload() {
  return useMutation({
    mutationKey: ['admin', 'applications', 'excel', 'download'],
    mutationFn: async (params: DownloadAdminApplicationsExcelParams) => {
      const {
        recruitmentId,
        stage = 'DOCUMENT',
        sortBy = 'LATEST',
        direction = 'DESC',
        organizationRoleIds,
        statuses,
        keyword,
        tokens,
      } = params;

      const tk = tokens ?? getClientSideTokens();

      const headers: Record<string, string> = {};
      if (tk.accessToken) headers['Authorization'] = `Bearer ${tk.accessToken}`;

      const query = buildExcelQuery({
        stage,
        sortBy,
        direction,
        organizationRoleIds,
        statuses,
        keyword,
      });

      const url = `api/v1/admin/applications/recruitment/${recruitmentId}/excel?${query}`;

      console.log('[excel] request:', {
        url,
        recruitmentId,
        stage,
        sortBy,
        direction,
        organizationRoleIds,
        statuses,
        keyword,
        hasAccessToken: Boolean(tk.accessToken),
      });

      // ✅ Response를 먼저 잡아서 status/headers를 콘솔로 확인
      const res = await api.get(url, { headers });

      console.log('[excel] response status:', res.status);
      console.log('[excel] response headers:', {
        'content-type': res.headers.get('content-type'),
        'content-disposition': res.headers.get('content-disposition'),
        'content-length': res.headers.get('content-length'),
      });

      // ❗️에러면 서버가 JSON을 내려줄 가능성이 높아서 text로 찍어봄
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        console.error('[excel] response not ok:', res.status, text);
        throw new Error(`엑셀 다운로드 실패 (${res.status})`);
      }

      const blob = await res.blob();

      // blob이 0이면 사실상 다운로드할 게 없음(대부분 서버에서 에러를 다른 형태로 줬거나 권한 문제)
      if (!blob || blob.size === 0) {
        console.error('[excel] empty blob:', blob);
        // 혹시 JSON/텍스트가 blob으로 와도 확인할 수 있게 찍기
        const text = await blob.text().catch(() => '');
        console.error('[excel] empty blob text preview:', text.slice(0, 300));
        throw new Error('엑셀 파일이 비어있어요(응답 blob size=0).');
      }

      const disposition = res.headers.get('content-disposition');
      const headerFilename = getFilenameFromDisposition(disposition);

      const fallbackFilename = `applications_${recruitmentId}_${stage}.xlsx`;
      const filename = headerFilename ?? fallbackFilename;

      triggerDownload(blob, filename);

      return { filename, size: blob.size };
    },
  });
}
