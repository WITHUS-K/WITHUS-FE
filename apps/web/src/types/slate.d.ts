import 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

declare module 'slate' {
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
