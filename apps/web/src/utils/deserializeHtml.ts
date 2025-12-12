import {
  DISPLAY_LABEL,
  TextAlign,
  VariableType,
} from '@web/app/(main)/apply-management/_components/SideTabs/RichTextEditor/RichTextEditor';
import { Descendant, Text, Element as SlateElement } from 'slate';

// marks(스타일 상태)를 위에서 아래로 전달하기 위한 타입
type LeafMarks = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  fontSize?: string;
  color?: string;
};

// 머스타시 토큰
const TOKEN_REGEX =
  /\{\{(name|position|interviewRoom|interviewDateTime)\}\}/g;

// 전체 진입점
export function deserializeHtml(html: string): Descendant[] {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const body = doc.body;

  const raw: Descendant[] = [];
  body.childNodes.forEach((node) => {
    const res = deserializeNode(node, {});
    if (!res) return;
    if (Array.isArray(res)) raw.push(...res);
    else raw.push(res);
  });

  const hasBlock = /<\/(p|div|ul|ol|h[1-6])>/i.test(html);
  if (!hasBlock) {
    return [
      {
        type: 'paragraph',
        children: raw.length ? raw : [{ text: '' }],
      } as SlateElement,
    ];
  }

  return raw.length
    ? raw
    : [
        {
          type: 'paragraph',
          children: [{ text: '' }],
        } as SlateElement,
      ];
}

// 텍스트에서 토큰 → variable element(bold/fontSize 등은 element 필드)
function textToNodes(text: string, marks: LeafMarks): Descendant[] {
  const parts: Descendant[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  TOKEN_REGEX.lastIndex = 0;

  while ((match = TOKEN_REGEX.exec(text)) !== null) {
    const [full, varType] = match;

    // 토큰 앞 일반 텍스트
    if (match.index > lastIndex) {
      parts.push({
        text: text.slice(lastIndex, match.index),
        ...marks,
      } as any);
    }

    // 🔥 variable element 에 marks를 직접 싣기
    parts.push({
      type: 'variable',
      varType: varType as VariableType,
      bold: marks.bold,
      italic: marks.italic,
      underline: marks.underline,
      fontSize: marks.fontSize,
      color: marks.color,
      children: [
        {
          text: '\u200B', // selection용 더미
        } as any,
      ],
    } as SlateElement);

    lastIndex = match.index + full.length;
  }

  // 뒤에 남은 텍스트
  if (lastIndex < text.length) {
    parts.push({
      text: text.slice(lastIndex),
      ...marks,
    } as any);
  }

  return parts.length ? parts : [{ text: '', ...marks } as any];
}

function deserializeNode(
  node: Node,
  marks: LeafMarks
): Descendant | Descendant[] | null {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent || '';
    if (!text) return null;
    return textToNodes(text, marks);
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();

    const parseChildren = (nextMarks: LeafMarks): Descendant[] => {
      const children: Descendant[] = [];
      el.childNodes.forEach((child) => {
        const res = deserializeNode(child, nextMarks);
        if (!res) return;
        if (Array.isArray(res)) children.push(...res);
        else children.push(res);
      });
      return children;
    };

    if (tag === 'strong' || tag === 'b') {
      return parseChildren({ ...marks, bold: true });
    }
    if (tag === 'em' || tag === 'i') {
      return parseChildren({ ...marks, italic: true });
    }
    if (tag === 'u') {
      return parseChildren({ ...marks, underline: true });
    }

    if (tag === 'span') {
      const nextMarks: LeafMarks = { ...marks };
      if (el.style.fontSize) nextMarks.fontSize = el.style.fontSize;
      if (el.style.color) nextMarks.color = el.style.color;
      return parseChildren(nextMarks);
    }

    if (tag === 'p') {
      const alignStyle = (el.style.textAlign || 'left') as TextAlign;
      const children = parseChildren(marks);
      const safeChildren = children.length ? children : [{ text: '' } as any];

      return {
        type: 'paragraph',
        align: alignStyle === 'left' ? undefined : alignStyle,
        children: safeChildren,
      } as SlateElement;
    }

    return parseChildren(marks);
  }

  return null;
}
