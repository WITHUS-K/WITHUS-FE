import {
  VAR_KEY,
  VariableType,
} from '@web/app/(main)/apply-management/_components/SideTabs/RichTextEditor/RichTextEditor';
import { Descendant, Element as SlateElement, Text } from 'slate';

// `SlateElement` 기반으로, 판별 가능한 유니언 타입을 만듭니다.
type VariableElement = SlateElement & {
  type: 'variable';
  varType: VariableType;
  children: Descendant[];
};
type ParagraphElement = SlateElement & {
  type: 'paragraph';
  children: Descendant[];
};

// 전체 직렬화 진입점
export function serializeHtml(nodes: Descendant[]): string {
  return nodes.map(nodeToHtml).join('');
}

function nodeToHtml(node: Descendant): string {
  // 1) 텍스트 노드: 마크(굵게/이탤릭/밑줄) + HTML escape
  if (Text.isText(node)) {
    const escape = (s: string) =>
      s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    let txt = escape(node.text);
    const leaf = node as any;
    if (leaf.bold) txt = `<strong>${txt}</strong>`;
    if (leaf.italic) txt = `<em>${txt}</em>`;
    if (leaf.underline) txt = `<u>${txt}</u>`;
    return txt;
  }

  // 2) 엘리먼트 노드
  if (!SlateElement.isElement(node)) return '';

  // 두 타입의 유니언으로 취급
  const el = node as VariableElement | ParagraphElement | SlateElement;

  // 2-1) variable 타입일 때만 varType 을 꺼내고 토큰 반환
  if (el.type === 'variable') {
    // 이제 TS는 `el` 이 `VariableElement` 라고 알고 varType 에 접근 OK
    const varEl = el as VariableElement;
    // 실제 토큰
    let tokenHtml = VAR_KEY[varEl.varType];

    // 자식의 마크(leaf) 정보 꺼내기
    const leaf = varEl.children[0] as any;
    if (leaf.bold) tokenHtml = `<strong>${tokenHtml}</strong>`;
    if (leaf.italic) tokenHtml = `<em>${tokenHtml}</em>`;
    if (leaf.underline) tokenHtml = `<u>${tokenHtml}</u>`;

    return tokenHtml;
  }

  // 2-2) paragraph 이거나 다른 element
  const childrenHtml = el.children.map(nodeToHtml).join('');

  // paragraph 면 <p> 래핑, 아니면 그냥 자식만 반환
  if (el.type === 'paragraph') {
    return `<p>${childrenHtml}</p>`;
  } else {
    return childrenHtml;
  }
}
