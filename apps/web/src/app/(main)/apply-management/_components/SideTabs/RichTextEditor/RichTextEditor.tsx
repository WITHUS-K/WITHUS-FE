'use client';
import React, { useCallback } from 'react';
import {
  createEditor,
  Descendant,
  Transforms,
  Text,
  Editor,
  Element as SlateElement,
} from 'slate';
import {
  Slate,
  Editable,
  withReact,
  RenderLeafProps,
  RenderElementProps,
} from 'slate-react';
import { withHistory } from 'slate-history';
import * as styles from './RichTextEditor.css';

// 1) 변수 타입 & 머스타시 키
export type VariableType =
  | 'name'
  | 'position'
  | 'interviewRoom'
  | 'interviewDateTime';
export const VAR_KEY: Record<VariableType, string> = {
  name: '{{name}}',
  position: '{{position}}',
  interviewRoom: '{{interviewRoom}}',
  interviewDateTime: '{{interviewDateTime}}',
};

// 2) 화면에 보여줄 레이블
export const DISPLAY_LABEL: Record<VariableType, string> = {
  name: '이름',
  position: '지원한 파트명',
  interviewRoom: '면접실',
  interviewDateTime: '면접일시',
};

// 3) Slate 노드 타입
type VariableElement = {
  type: 'variable';
  varType: VariableType;
  children: Descendant[];
};
type ParagraphElement = { type: 'paragraph'; children: Descendant[] };

interface RichTextEditorProps {
  editor: Editor;
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
  placeholder?: string;
}
export function RichTextEditor({
  editor,
  value,
  onChange,
  placeholder,
}: RichTextEditorProps) {
  // 엘리먼트 렌더러
  const renderElement = useCallback((props: RenderElementProps) => {
    const { element, attributes, children } = props;
    if ((element as any).type === 'variable') {
      const varEl = element as VariableElement;
      const cls = styles.variableStyles[varEl.varType];
      // children으로 DISPLAY_LABEL 텍스트를 받고, 마크(굵게/이탤릭/밑줄)도 적용 가능
      return (
        <span {...attributes} contentEditable={false} className={cls}>
          {DISPLAY_LABEL[varEl.varType]}
          {children}
        </span>
      );
    }
    return <p {...attributes}>{children}</p>;
  }, []);

  // 리프 렌더러
  const renderLeaf = useCallback((props: RenderLeafProps) => {
    let { children } = props;
    if (props.leaf.bold) children = <strong>{children}</strong>;
    if (props.leaf.italic) children = <em>{children}</em>;
    if (props.leaf.underline) children = <u>{children}</u>;
    return <span {...props.attributes}>{children}</span>;
  }, []);

  return (
    <Slate
      editor={editor}
      initialValue={value}
      key={JSON.stringify(value)}
      onChange={onChange}
    >
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder={placeholder}
        spellCheck
        autoFocus
        className={styles.textarea}
      />
    </Slate>
  );
}

export function withVariables(ed: Editor) {
  const { isInline, isVoid } = ed;
  ed.isInline = (element) =>
    (SlateElement.isElement(element) && (element as any).type === 'variable') ||
    isInline(element);
  ed.isVoid = (element) =>
    (SlateElement.isElement(element) && element.type === 'variable') ||
    isVoid(element);
  return ed;
}

export function insertVariable(editor: Editor, varType: VariableType) {
  const node: VariableElement = {
    type: 'variable',
    varType,
    // children에 DISPLAY_LABEL을 넣어 두어 마크 스타일이 적용되도록 함
    children: [{ text: '' }],
  };
  Transforms.insertNodes(editor, node);
  const { anchor } = editor.selection!;
  const after = Editor.after(editor, anchor, { unit: 'offset' });

  if (after) {
    Transforms.select(editor, after);
  }
}

export function toggleMark(
  editor: Editor,
  format: 'bold' | 'italic' | 'underline'
) {
  const marks = (Editor.marks(editor) as Record<string, boolean>) || {};
  const isActive = marks[format] === true;
  if (isActive) Editor.removeMark(editor, format);
  else Editor.addMark(editor, format, true);
}

export function serialize(nodes: Descendant[]): string {
  return nodes.map((n) => nodeToString(n)).join('\n');
}
function nodeToString(node: Descendant): string {
  if (Text.isText(node)) return node.text;
  if (!SlateElement.isElement(node)) return '';
  if (node.type === 'variable')
    return VAR_KEY[(node as VariableElement).varType];
  return node.children.map(nodeToString).join('');
}
