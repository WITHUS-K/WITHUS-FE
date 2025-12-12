// app/docs-evaluation/mockData.ts

import type { TagColor } from '@repo/utils';

export interface Item {
  /** 고유 ID */
  id: number;
  /** 지원자 이름 */
  name: string;
  /** 파트 이름 (Tag 컴포넌트에 표시) */
  organizationRoleName : string;
  /** Tag 컴포넌트에 넘길 헥스 컬러 (vanilla-extract TagColor) */
  tagColor: TagColor;
  /** 평가 상태: BEFORE(평가 전) | COMPLETED(평가 완료) */
  evaluationStatus: 'BEFORE' | 'COMPLETED';
  /** 평가 완료 시 합격 여부 */
  pass?: boolean;
  /** 평가 완료 · 합격일 때만 점수 */
  evaluationScore?: number;
  /** 평가 완료 · 합격일 때만 면접 날짜 (ex. "4/18 (금)") */
  interviewDate?: string;
  /** 평가 완료 · 합격일 때만 면접 시간 (ex. "10:00 - 10:30") */
  interviewTime?: string;
}

