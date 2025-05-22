// app/docs-evaluation/mockData.ts

import type { TagColor } from '@repo/utils';

export interface Item {
  /** 고유 ID */
  id: number;
  /** 지원자 이름 */
  name: string;
  /** 파트 이름 (Tag 컴포넌트에 표시) */
  positionName: string;
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
  /** 클럽 필터용 ID */
  clubId: string;
}

export const ITEMS: Item[] = [
  {
    id: 1,
    name: '장지원',
    positionName: '기획',
    tagColor: '#EE6B00',
    evaluationStatus: 'BEFORE',
    clubId: 'A',
  },
  {
    id: 2,
    name: '김백엔',
    positionName: '백엔드',
    tagColor: '#009857',
    evaluationStatus: 'COMPLETED',
    pass: true,
    evaluationScore: 85,
    interviewDate: '4/18 (금)',
    interviewTime: '10:00 - 10:30',
    clubId: 'B',
  },
  {
    id: 3,
    name: '이불합격',
    positionName: '디자인',
    tagColor: '#2C60FF',
    evaluationStatus: 'COMPLETED',
    pass: false,
    clubId: 'A',
  },
  {
    id: 4,
    name: '박테스트',
    positionName: '프론트엔드',
    tagColor: '#813DFF',
    evaluationStatus: 'BEFORE',
    clubId: 'C',
  },
  {
    id: 5,
    name: '최합격',
    positionName: '백엔드',
    tagColor: '#009857',
    evaluationStatus: 'COMPLETED',
    pass: true,
    evaluationScore: 90,
    interviewDate: '4/19 (토)',
    interviewTime: '14:00 - 14:30',
    clubId: 'C',
  },
  {
    id: 6,
    name: '장지원',
    positionName: '기획',
    tagColor: '#EE6B00',
    evaluationStatus: 'BEFORE',
    clubId: 'A',
  },
  {
    id: 7,
    name: '김백엔',
    positionName: '백엔드',
    tagColor: '#009857',
    evaluationStatus: 'COMPLETED',
    pass: true,
    evaluationScore: 85,
    interviewDate: '4/18 (금)',
    interviewTime: '10:00 - 10:30',
    clubId: 'B',
  },
  {
    id: 8,
    name: '이불합격',
    positionName: '디자인',
    tagColor: '#2C60FF',
    evaluationStatus: 'COMPLETED',
    pass: false,
    clubId: 'A',
  },
  {
    id: 9,
    name: '박테스트',
    positionName: '프론트엔드',
    tagColor: '#813DFF',
    evaluationStatus: 'BEFORE',
    clubId: 'C',
  },
  {
    id: 10,
    name: '최합격',
    positionName: '백엔드',
    tagColor: '#009857',
    evaluationStatus: 'COMPLETED',
    pass: true,
    evaluationScore: 90,
    interviewDate: '4/19 (토)',
    interviewTime: '14:00 - 14:30',
    clubId: 'C',
  },
];
