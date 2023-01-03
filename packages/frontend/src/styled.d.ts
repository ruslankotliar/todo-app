import 'styled-components';
import { Theme } from '@mui/material/styles';

interface CustomTheme {
  colors: {
    white: string;
    black: string;
    red: string;
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
    l40: string;
    l15: string;
    l10: string;
    l7: string;
    l5: string;
    l4: string;
    l3: string;
    l2: string;
    l: string;
    m: string;
    s: string;
    xs: string;
  };
}
declare module '@mui/material/styles' {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
