'use client';
import React, { useCallback, useRef, useEffect } from 'react';
import {
  Descendant,
  Transforms,
  Text,
  Editor,
  Element as SlateElement,
  Range,
} from 'slate';
import {
  Slate,
  Editable,
  RenderLeafProps,
  RenderElementProps,
  ReactEditor,
} from 'slate-react';
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
  // IME 상태 추적을 위한 ref
  const isComposingRef = useRef(false);
  const compositionDataRef = useRef('');
  const lastSelectionRef = useRef<Range | null>(null);
  const preventNextChangeRef = useRef(false);

  useEffect(() => {
    if (editor.selection) {
      lastSelectionRef.current = editor.selection;
    }
  }, [editor.selection]);

  // 엘리먼트 렌더러
  const renderElement = useCallback(
    (props: RenderElementProps) => {
      const { element, attributes, children } = props;
      if ((element as any).type === 'variable') {
        const varEl = element as VariableElement;
        const cls = styles.variableStyles[varEl.varType];

        return (
          <span {...attributes} contentEditable={false} className={cls}>
            {DISPLAY_LABEL[varEl.varType]}
            {children}
          </span>
        );
      }
      return <p {...attributes}>{children}</p>;
    },
    [editor]
  );

  // 리프 렌더러
  const renderLeaf = useCallback((props: RenderLeafProps) => {
    let { children } = props;
    if (props.leaf.bold) children = <strong>{children}</strong>;
    if (props.leaf.italic) children = <em>{children}</em>;
    if (props.leaf.underline) children = <u>{children}</u>;
    return <span {...props.attributes}>{children}</span>;
  }, []);

  const onCompositionStart = useCallback(
    (event: React.CompositionEvent) => {
      isComposingRef.current = true;
      compositionDataRef.current = '';

      const { selection } = editor;
      if (selection) {
        const [match] = Editor.nodes(editor, {
          match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === 'variable',
        });

        if (match) {
          const [, path] = match;
          const after = Editor.after(editor, path);
          if (after) {
            Transforms.select(editor, after);
            lastSelectionRef.current = { anchor: after, focus: after };
          }
        }
      }
    },
    [editor]
  );

  const onCompositionUpdate = useCallback((event: React.CompositionEvent) => {
    compositionDataRef.current = event.data;
  }, []);

  const onCompositionEnd = useCallback((event: React.CompositionEvent) => {
    isComposingRef.current = false;
    compositionDataRef.current = '';

    setTimeout(() => {
      if (!isComposingRef.current) {
        preventNextChangeRef.current = false;
      }
    }, 0);
  }, []);

  const handleChange = useCallback(
    (newValue: Descendant[]) => {
      if (preventNextChangeRef.current) {
        preventNextChangeRef.current = false;
        return;
      }

      onChange(newValue);
    },
    [onChange]
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (isComposingRef.current) {
        return;
      }

      const { selection } = editor;
      if (!selection) return;

      const [match] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === 'variable',
      });

      if (match) {
        const [, path] = match;

        if (event.key === 'Backspace' || event.key === 'Delete') {
          event.preventDefault();
          Transforms.removeNodes(editor, { at: path });
          return;
        }

        if (event.key.length === 1 || event.key === 'Enter') {
          event.preventDefault();
          const after = Editor.after(editor, path);
          if (after) {
            Transforms.select(editor, after);
            if (event.key === 'Enter') {
              Transforms.insertNodes(editor, {
                type: 'paragraph',
                children: [{ text: '' }],
              });
            } else if (event.key.length === 1) {
              Transforms.insertText(editor, event.key);
            }
          }
          return;
        }
      }
    },
    [editor]
  );

  return (
    <Slate editor={editor} initialValue={value} onChange={handleChange}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder={placeholder}
        spellCheck={false}
        autoFocus
        className={styles.textarea}
        onKeyDown={onKeyDown}
        onCompositionStart={onCompositionStart}
        onCompositionUpdate={onCompositionUpdate}
        onCompositionEnd={onCompositionEnd}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        data-testid="rich-text-editor"
      />
    </Slate>
  );
}

export function withVariables(ed: Editor) {
  const { isInline, isVoid, deleteBackward, deleteForward } = ed;

  ed.isInline = (element) =>
    (SlateElement.isElement(element) && (element as any).type === 'variable') ||
    isInline(element);

  ed.isVoid = (element) =>
    (SlateElement.isElement(element) && element.type === 'variable') ||
    isVoid(element);

  ed.deleteBackward = (unit) => {
    const { selection } = ed;

    if (selection && Range.isCollapsed(selection)) {
      const [match] = Editor.nodes(ed, {
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === 'variable',
      });

      if (match) {
        const [, path] = match;
        Transforms.removeNodes(ed, { at: path });
        return;
      }
    }

    deleteBackward(unit);
  };

  ed.deleteForward = (unit) => {
    const { selection } = ed;

    if (selection && Range.isCollapsed(selection)) {
      const after = Editor.after(ed, selection);
      if (after) {
        const [node] = Editor.node(ed, after);
        if (SlateElement.isElement(node) && node.type === 'variable') {
          const path = Editor.path(ed, after);
          Transforms.removeNodes(ed, { at: path });
          return;
        }
      }
    }

    deleteForward(unit);
  };

  return ed;
}

export function insertVariable(editor: Editor, varType: VariableType) {
  const node: VariableElement = {
    type: 'variable',
    varType,
    children: [{ text: '' }],
  };

  const { selection } = editor;
  if (selection) {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n.type === 'variable',
    });

    if (match) {
      const [, path] = match;
      const after = Editor.after(editor, path);
      if (after) {
        Transforms.select(editor, after);
      }
    }
  }

  Transforms.insertNodes(editor, node);

  const currentSelection = editor.selection;
  if (currentSelection) {
    const after = Editor.after(editor, currentSelection, { unit: 'offset' });
    if (after) {
      Transforms.select(editor, after);
    } else {
      Transforms.insertText(editor, ' ');
      const newAfter = Editor.after(editor, currentSelection);
      if (newAfter) {
        Transforms.select(editor, newAfter);
      }
    }
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
