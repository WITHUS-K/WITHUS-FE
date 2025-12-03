import { useContext, useEffect, useRef } from 'react';
import { FormFieldStatusContext } from './FormFieldStatusContext';

export function PartStatusResetter({
  selectedPartLabel,
  detailItems,
  commonTextCount,
  commonFileCount,
}: {
  selectedPartLabel: string | undefined;
  detailItems: { type: 'text' | 'file' }[];
  commonTextCount: number;
  commonFileCount: number;
}) {
  const { getStatus } = useContext(FormFieldStatusContext);
  // ★ 제네릭을 string | undefined 로, 초기값은 undefined 로 지정
  const prev = useRef<string | undefined>(undefined);

  useEffect(() => {
    // 파트가 바뀌었을 때만 실행
    if (prev.current !== selectedPartLabel) {
      // text 질문 전체 개수
      const textCount = detailItems.filter((d) => d.type === 'text').length;
      // file 질문 전체 개수
      const fileCount = detailItems.filter((d) => d.type === 'file').length;

      // 공통(Common) 이후 인덱스(파트별)만 초기화
      for (let i = commonTextCount; i < textCount; i++) {
        getStatus(`question-text-${i}`).setDefault();
      }
      for (let i = commonFileCount; i < fileCount; i++) {
        getStatus(`question-file-${i}`).setDefault();
      }

      // prev.current 에도 string | undefined 허용하므로 문제없음
      prev.current = selectedPartLabel;
    }
  }, [
    selectedPartLabel,
    detailItems,
    commonTextCount,
    commonFileCount,
    getStatus,
  ]);

  return null;
}
