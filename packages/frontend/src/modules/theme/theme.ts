import { createTheme } from '@mui/material/styles';
import { COLORS } from './colors.const';
import { FAMILIES, SIZES, WEIGHTS } from './fonts.const';
import { SPACES } from './spaces.const';
import { BREAKPOINTS } from './breakpoints.const';

export const theme = createTheme({
  typography: {
    fontFamily: FAMILIES.normal,
    fontWeightBold: WEIGHTS.bold,
    fontWeightRegular: WEIGHTS.normal
  },
  palette: {
    primary: {
      main: '#3F8AE0'
    },
    secondary: {
      main: '#326eb3'
    }
  },
  colors: COLORS,
  fonts: {
    sizes: SIZES,
    families: FAMILIES,
    weights: WEIGHTS
  },
  spaces: SPACES,
  breakpoints: BREAKPOINTS
});
