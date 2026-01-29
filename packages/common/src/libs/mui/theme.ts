import { cyan } from '@mui/material/colors';
import { createTheme, type Theme } from '@mui/material/styles';
// Refer: https:mui.com/x/react-charts/quickstart/#theme-augmentation
import type {} from '@mui/x-charts/themeAugmentation';
// Refer: https://mui.com/x/react-data-grid/quickstart/#theme-augmentation
import type {} from '@mui/x-data-grid/themeAugmentation';
// Refer: https://mui.com/x/react-date-pickers/quickstart/#theme-augmentation
import type {} from '@mui/x-date-pickers/themeAugmentation';

import { elevation } from '../../common';
import {
  base,
  blue,
  brand,
  error,
  gray,
  orange,
  success,
  warning,
} from '../../common/tokens/colors';
import components from './components';
import typography from './typography';

const newShadows = new Array(25).fill(
  elevation['3xl']
) as unknown as Theme['shadows'];

// Override important Elevation levels (index 0 to 24):

// Elevation 0: Always 'none'
newShadows[0] = 'none';

// Low Level (xs, sm)
newShadows[1] = elevation.xs; // Used for basic Cards, Paper
newShadows[2] = elevation.sm;
newShadows[3] = elevation.sm;

// Medium Level (md, lg)
newShadows[4] = elevation.md; // Used for Tooltip or surface with relief
newShadows[5] = elevation.md;
newShadows[6] = elevation.md;
newShadows[8] = elevation.lg; // Used for FAB (Floating Action Button)

// Height Level (xl, 2xl, 3xl)
newShadows[12] = elevation.xl; // Used for Menu, Popover
newShadows[16] = elevation['2xl'];
newShadows[24] = elevation['3xl'];

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      ...brand,
      main: brand[500],
      light: brand[300],
      dark: brand[800],
    },
    secondary: { main: gray[700], light: gray[500], dark: gray[900] },
    error: {
      ...error,
      main: error[500],
      light: error[300],
      dark: error[700],
    },
    success: {
      ...success,
      main: success[500],
      light: success[300],
      dark: success[800],
    },
    warning: {
      ...orange,
      main: orange[700],
      light: orange[500],
      dark: orange[900],
      contrastText: orange[100],
    },
    grey: {
      ...gray,
    },
    cyan: {
      ...cyan,
      main: cyan[500],
      light: cyan[300],
      dark: cyan[700],
    },
    blue: {
      ...blue,
      main: blue[500],
      light: blue[300],
      dark: blue[700],
    },
    text: {
      primary: gray[900],
      secondary: gray[700],
      tertiary: gray[600],
      quaternary: gray[500],
      senary: gray[400],
      brand: brand[500],
      link: blue[500],
      success: success[500],
      warning: warning[500],
      error: error[500],
      inverse: base.white,
    },
    background: {
      primary: base.white,
      secondary: gray[50],
      tertiary: gray[100],
      quaternary: gray[200],
      senary: gray[300],
      brand: brand[500],
      error: error[500],
      'brand-subtle': brand[50],
    },
    border: {
      primary: gray[300],
      secondary: gray[200],
      tertiary: gray[100],
      brand: brand[500],
      white: base.white,
      error: error[500],
    },
  },
  shadows: newShadows,
  typography,
  components,
});

export { theme };
