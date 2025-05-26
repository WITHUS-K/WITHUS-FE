import {
  DISPLAY_LABEL,
  VariableType,
} from '@web/app/(main)/apply-management/_components/SideTabs/RichTextEditor/RichTextEditor';
import { Descendant, Text, Element as SlateElement } from 'slate';

// 변수(span)와 일반 태그를 모두 처리하는 재귀 함수
export function deserializeHtml(html: string): Descendant[] {
  const container = new DOMParser().parseFromString(html, 'text/html').body;
  // 1) 뽑아낸 노드들
  const raw = Array.from(container.childNodes).flatMap(deserializeNode);

  // 2) 만약 원본에 <p>나 다른 블록 태그가 전혀 없었다면
  //    → 한 줄짜리 템플릿으로 간주하고 전부 하나의 paragraph 로 감싸기
  const hasBlock = /<\/(p|div|ul|ol|h[1-6])>/i.test(html);
  if (!hasBlock) {
    return [
      {
        type: 'paragraph',
        children: raw.length ? raw : [{ text: '' }],
      } as SlateElement,
    ];
  }

  // 3) 블록 태그가 있었다면, 기존 로직대로 raw 를 리턴
  return raw;
}

// utils/deserializeHtml.ts

const TOKEN_REGEX = /\{\{(name|position|interviewRoom|interviewDateTime)\}\}/g;

export function deserializeNode(node: Node): Descendant[] {
  // 1) 텍스트 노드: 머스타시 토큰 분리
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent || '';
    const parts: Descendant[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = TOKEN_REGEX.exec(text)) !== null) {
      const [full, varType] = match;
      // 1-1) 토큰 앞의 일반 텍스트
      if (match.index > lastIndex) {
        parts.push({ text: text.slice(lastIndex, match.index) });
      }
      // 1-2) 변수 노드
      parts.push({
        type: 'variable',
        varType: varType as VariableType,
        // 표시용 텍스트: DISPLAY_LABEL[varType]
        children: [{ text: DISPLAY_LABEL[varType as VariableType] }],
      } as SlateElement);
      lastIndex = match.index + full.length;
    }
    // 1-3) 뒤에 남은 일반 텍스트
    if (lastIndex < text.length) {
      parts.push({ text: text.slice(lastIndex) });
    }
    return parts.length > 0 ? parts : [{ text: '' }];
  }

  // 2) ELEMENT_NODE 처리 (기존 로직)
  if (node.nodeType === Node.ELEMENT_NODE) {
    const el = node as HTMLElement;
    const children = Array.from(el.childNodes).flatMap(deserializeNode);

    switch (el.tagName) {
      case 'STRONG':
      case 'B':
        return children.map((child) =>
          Text.isText(child) ? { ...child, bold: true } : child
        );
      case 'EM':
      case 'I':
        return children.map((child) =>
          Text.isText(child) ? { ...child, italic: true } : child
        );
      case 'U':
        return children.map((child) =>
          Text.isText(child) ? { ...child, underline: true } : child
        );

      // span 태그로 래핑된 변수(예: contentEditable=false로 삽입된 경우)는
      // 이미 위의 TEXT_NODE 단계에서 머스타시 토큰을 잡아냈으므로,
      // 단순히 children을 이어붙여도 OK입니다.
      case 'SPAN':
        return children;

      // 단락
      case 'P':
      default: {
        const safeChildren = children.length ? children : [{ text: '' }];
        return [
          {
            type: 'paragraph',
            children: safeChildren,
          } as SlateElement,
        ];
      }
    }
  }

  return [];
}
