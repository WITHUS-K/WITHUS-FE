/**
 * evaluatorStore.ts
 *
 * 지원자 평가자 목록을 전역으로 관리하는 Zustand 스토어
 */
import {create} from 'zustand';

// EvaluateModal 에서 사용되는 Evaluator 타입 정의 (필요 시 수정)
export interface Evaluator {
  userId: number;
  name: string;
  profileImageUrl?: string;
  profileColor: string;
}

interface EvaluatorState {
  /** 현재 선택된 평가자 목록 */
  selectedEvaluators: Evaluator[];
  /** 평가자 목록 설정 */
  setSelectedEvaluators: (evaluators: Evaluator[]) => void;
  /** 평가자 목록 초기화 */
  clearSelectedEvaluators: () => void;
}

export const useEvaluatorStore = create<EvaluatorState>((set) => ({
  selectedEvaluators: [],
  setSelectedEvaluators: (evaluators) => set({ selectedEvaluators: evaluators }),
  clearSelectedEvaluators: () => set({ selectedEvaluators: [] }),
}));
