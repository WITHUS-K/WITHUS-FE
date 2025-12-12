import {
  VAR_KEY,
  VariableType,
} from '@web/app/(main)/apply-management/_components/SideTabs/RichTextEditor/RichTextEditor';
import { Descendant, Element as SlateElement, Text } from 'slate';

type VariableElement = SlateElement & {
  type: 'variable';
  varType: VariableType;
  children: Descendant[];
};

type ParagraphElement = SlateElement & {
  type: 'paragraph';
  align?: 'left' | 'center' | 'right';
  children: Descendant[];
};

// ---- 공통: HTML escape ----
const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// 전체 직렬화 진입점
export function serializeHtml(nodes: Descendant[]): string {
  return nodes.map(nodeToHtml).join('');
}

function nodeToHtml(node: Descendant): string {
  // 1) 텍스트 노드
  if (Text.isText(node)) {
    const leaf: any = node;
    let txt = escapeHtml(leaf.text ?? '');

    if (leaf.bold) txt = `<strong>${txt}</strong>`;
    if (leaf.italic) txt = `<em>${txt}</em>`;
    if (leaf.underline) txt = `<u>${txt}</u>`;

    const styleParts: string[] = [];
    if (leaf.fontSize) styleParts.push(`font-size:${leaf.fontSize}`);
    if (leaf.color) styleParts.push(`color:${leaf.color}`);

    if (styleParts.length > 0) {
      const styleAttr = styleParts.join(';');
      txt = `<span style="${styleAttr}">${txt}</span>`;
    }

    return txt;
  }

  // 2) 엘리먼트 노드
  if (!SlateElement.isElement(node)) return '';

  const el = node as VariableElement | ParagraphElement | SlateElement;

  // ariable: element 에서 스타일 우선 읽기
  if (el.type === 'variable') {
    const varEl = el as VariableElement;

    // element-level 스타일
    const eb: any = varEl;
    // 혹시라도 child leaf 에 스타일이 있다면 fallback
    const leaf: any = (varEl.children[0] as any) ?? {};

    const bold = eb.bold ?? leaf.bold;
    const italic = eb.italic ?? leaf.italic;
    const underline = eb.underline ?? leaf.underline;
    const fontSize = eb.fontSize ?? leaf.fontSize;
    const color = eb.color ?? leaf.color;

    let tokenHtml = VAR_KEY[varEl.varType];

    if (bold) tokenHtml = `<strong>${tokenHtml}</strong>`;
    if (italic) tokenHtml = `<em>${tokenHtml}</em>`;
    if (underline) tokenHtml = `<u>${tokenHtml}</u>`;

    const styleParts: string[] = [];
    if (fontSize) styleParts.push(`font-size:${fontSize}`);
    if (color) styleParts.push(`color:${color}`);

    if (styleParts.length > 0) {
      const styleAttr = styleParts.join(';');
      tokenHtml = `<span style="${styleAttr}">${tokenHtml}</span>`;
    }

    return tokenHtml;
  }

  // paragraph + 기타
  const childrenHtml = el.children.map(nodeToHtml).join('');

  if (el.type === 'paragraph') {
    const p = el as ParagraphElement;
    const styleParts: string[] = [];

    if (p.align && p.align !== 'left') {
      styleParts.push(`text-align:${p.align}`);
    }

    const styleAttr =
      styleParts.length > 0 ? ` style="${styleParts.join(';')}"` : '';

    return `<p${styleAttr}>${childrenHtml}</p>`;
  }

  return childrenHtml;
}


// 파일명에서 공백·콜론·한글 등 제거하고 _ 로 치환
export function sanitizeFileName(name: string) {
  return name
    .normalize('NFC') // 유니코드 정규화
    .replace(/\s+/g, '_') // 공백 → _
    .replace(/[:]/g, '-') // 콜론 → -
    .replace(/[^0-9A-Za-z_.-]/g, ''); // 나머지 특수문자/한글 제거
}
