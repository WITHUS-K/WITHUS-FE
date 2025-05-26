import 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

declare module 'slate' {
  // 우리가 사용하는 커스텀 Element
  interface CustomTypes {
    Editor: ReactEditor & HistoryEditor;
    Element: VariableElement | ParagraphElement;
    Text: {
      text: string;
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
    };
  }

  // 아래 두 타입은 Augmentation 대상이니까 전역 선언에 포함시켜주세요.
  export type VariableElement = {
    type: 'variable';
    varType: VariableType;
    children: Descendant[];
  };
  export type ParagraphElement = {
    type: 'paragraph';
    children: Descendant[];
  };

  export type VariableType =
    | 'name'
    | 'position'
    | 'interviewRoom'
    | 'interviewDateTime';
}
