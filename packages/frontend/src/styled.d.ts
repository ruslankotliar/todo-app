import 'styled-components';
import { Theme } from '@mui/material/styles';

interface CustomTheme {
  colors: {
    white: string;
    black: string;
    primary: string;
    secondary: string;
  };
  fonts: {
    sizes: {
      l: string;
      m: string;
      s: string;
    };
    families: {
      normal: string;
    };
    weights: {
      bold: string;
      normal: string;
    };
  };
  spaces: {
    l: string;
    m: string;
    s: string;
  };
}
declare module '@mui/material/styles' {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
