import { tokens } from '..';

export type ThemeContract = {
  colors: {
    [K in keyof typeof tokens.colors]: string;
  };
  borderRadius: {
    [K in keyof typeof tokens.radius]: string;
  };
  typography: {
    fontSize: {
      [K in keyof typeof tokens.typography.fontSize]: string;
    };
    fontWeight: {
      [K in keyof typeof tokens.typography.fontWeight]: string;
    };
  };
};
