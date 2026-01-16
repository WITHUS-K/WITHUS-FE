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
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  fontSize?: string;
  color?: string;
  children: Descendant[];
};
type ParagraphElement = {
  type: 'paragraph';
  // 정렬 정보 (left / center / right)
  align?: 'left' | 'center' | 'right';
  children: Descendant[];
};

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
  
        // element 에서 직접 스타일 읽어오기
        const style: React.CSSProperties = {};
        if (varEl.bold) style.fontWeight = 'bold';
        if (varEl.italic) style.fontStyle = 'italic';
        if (varEl.underline) style.textDecoration = 'underline';
        if (varEl.fontSize) style.fontSize = varEl.fontSize;
        if (varEl.color) style.color = varEl.color;
  
        return (
          <span
            {...attributes}
            contentEditable={false}
            className={cls}
            style={style}
          >
            {DISPLAY_LABEL[varEl.varType]}
          </span>
        );
      }
  
      // paragraph 정렬 처리
      const paragraph = element as ParagraphElement;
  
      return (
        <p
          {...attributes}
          style={{
            textAlign: paragraph.align ?? 'left',
            margin: 0,
          }}
        >
          {children}
        </p>
      );
    },
    []
  );
  // 리프 렌더러 (bold/italic/underline + fontSize + color)
  const renderLeaf = useCallback((props: RenderLeafProps) => {
    const { attributes, children, leaf } = props as any;

    const style: React.CSSProperties = {};

    if (leaf.bold) style.fontWeight = 'bold';
    if (leaf.italic) style.fontStyle = 'italic';
    if (leaf.underline) style.textDecoration = 'underline';
    if (leaf.fontSize) style.fontSize = leaf.fontSize;
    if (leaf.color) style.color = leaf.color;

    return (
      <span {...attributes} style={style}>
        {children}
      </span>
    );
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
            (n as any).type === 'variable',
            voids: true,
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
          (n as any).type === 'variable',
          voids: true,
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
              } as ParagraphElement);
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

// ========================= withVariables =========================

export function withVariables(ed: Editor) {
  const { isInline, isVoid, deleteBackward, deleteForward } = ed;

  ed.isInline = (element) =>
    (SlateElement.isElement(element) && (element as any).type === 'variable') ||
    isInline(element);

    ed.isVoid = (element) =>
    SlateElement.isElement(element) && (element as any).type === 'variable'
      ? false
      : isVoid(element);

  ed.deleteBackward = (unit) => {
    const { selection } = ed;

    if (selection && Range.isCollapsed(selection)) {
      const [match] = Editor.nodes(ed, {
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          (n as any).type === 'variable',
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
        if (
          SlateElement.isElement(node) &&
          (node as any).type === 'variable'
        ) {
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

// ========================= helpers =========================

export function insertVariable(editor: Editor, varType: VariableType) {
  const node: VariableElement = {
    type: 'variable',
    varType,
    children: [{ text: '\u200B' }],
  };

  // 이하 그대로
  const { selection } = editor;
  if (selection) {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        (n as any).type === 'variable',
        voids: true,
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

function applyMarkToVariables(
  editor: Editor,
  key: 'bold' | 'italic' | 'underline' | 'fontSize' | 'color',
  value: boolean | string | undefined
) {
  if (!editor.selection) return;

  const isCollapsed = Range.isCollapsed(editor.selection);

  // 커서만 있는 경우 → 현재 paragraph 안을 기준으로
  let at: any = editor.selection;

  if (isCollapsed) {
    const paragraphEntry = Editor.above(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        (n as any).type === 'paragraph',
      voids: true,          // paragraph 위로 올라갈 때도 void 허용
    });

    if (paragraphEntry) {
      const [, paragraphPath] = paragraphEntry;
      at = paragraphPath;
    }
  }

  const newProps: any = {};
  if (value === undefined) newProps[key] = undefined;
  else newProps[key] = value;

  // 핵심: voids: true 추가
  Transforms.setNodes<SlateElement>(editor, newProps, {
    at,
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      (n as any).type === 'variable',
    voids: true,
  });
}

// bold / italic / underline
export function toggleMark(
  editor: Editor,
  format: 'bold' | 'italic' | 'underline'
) {
  const marks = (Editor.marks(editor) as Record<string, boolean>) || {};
  const isActive = marks[format] === true;

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }

  // variable 자식에도 동일하게 적용
  applyMarkToVariables(editor, format, isActive ? undefined : true);
}


// 폰트 사이즈 설정
export function setFontSize(editor: Editor, fontSize: string) {
  if (!fontSize) {
    Editor.removeMark(editor, 'fontSize');
    applyMarkToVariables(editor, 'fontSize', undefined);
    return;
  }

  Editor.addMark(editor, 'fontSize', fontSize);
  applyMarkToVariables(editor, 'fontSize', fontSize);
}

// 글자 색상 설정
export function setColor(editor: Editor, color: string) {
  if (!color) {
    Editor.removeMark(editor, 'color');
    applyMarkToVariables(editor, 'color', undefined);
    return;
  }

  Editor.addMark(editor, 'color', color);
  applyMarkToVariables(editor, 'color', color);
}

// 정렬 설정
export type TextAlign = 'left' | 'center' | 'right';

export function setAlign(editor: Editor, align: TextAlign) {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      (n as any).type === 'paragraph' &&
      (n as any).align === align,
  });

  const isActive = !!match;

  Transforms.setNodes<SlateElement>(
    editor,
    { align: isActive ? undefined : align } as any,
    {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        (n as any).type === 'paragraph',
    }
  );
}

// ========================= serialize =========================

export function serialize(nodes: Descendant[]): string {
  if (!Array.isArray(nodes)) return '';

  return nodes
    .filter((n): n is Descendant => !!n) 
    .map(nodeToStringSafe)
    .join('\n');
}

function nodeToStringSafe(node: Descendant): string {
  if (!node) return '';

  if (Text.isText(node)) {
    return (node as any).text ?? '';
  }

  if (!SlateElement.isElement(node)) {
    return '';
  }

  // variable → 토큰으로 치환
  if ((node as any).type === 'variable') {
    const varEl = node as VariableElement;
    return VAR_KEY[varEl.varType] ?? '';
  }

  const children = (node as any).children;
  if (!Array.isArray(children)) {
    return '';
  }

  return children
    .filter((child: any) => !!child)
    .map((child: any) => nodeToStringSafe(child as Descendant))
    .join('');
}
