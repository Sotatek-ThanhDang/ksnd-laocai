/* eslint-disable @typescript-eslint/no-empty-object-type */
import '@mui/material/Typography';
import '@mui/material/styles';

type CustomShades = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

type CustomTypoGraphy = {
  display_xl: React.CSSProperties;
  display_lg: React.CSSProperties;
  display_md: React.CSSProperties;
  h7: React.CSSProperties;
  body_xl: React.CSSProperties;
  body_lg: React.CSSProperties;
  body_md: React.CSSProperties;
  body_sm: React.CSSProperties;
  body_xs: React.CSSProperties;
};

type ExtendColor = {
  tertiary: string;
  senary: string;
  brand: string;
  quaternary: string;
};

declare module '@mui/material/styles' {
  interface PaletteColor extends CustomShades {}
  interface SimplePaletteColorOptions extends Partial<CustomShades> {}

  interface TypographyVariants extends CustomTypoGraphy {}
  interface TypographyVariantsOptions extends Partial<CustomTypoGraphy> {}

  // Extend background
  interface PaletteBackground extends ExtendColor {
    primary: string;
    secondary: string;
    error: string;
    'brand-subtle': string;
  }
  interface TypeBackground extends Partial<ExtendColor> {
    primary?: string;
    secondary?: string;
    error?: string;
    'brand-subtle'?: string;
  }

  // Add a custom border palette section
  interface Palette {
    border: Pick<ExtendColor, 'tertiary' | 'brand'> & {
      primary: string;
      secondary: string;
      error: string;
      white: string;
    };
    cyan: PaletteColor;
    blue: PaletteColor;
  }
  interface PaletteOptions {
    border?: Optional<Pick<ExtendColor, 'tertiary' | 'brand'>> & {
      primary?: string;
      secondary?: string;
      error?: string;
      white?: string;
    };
    cyan?: SimplePaletteColorOptions;
    blue?: SimplePaletteColorOptions;
  }

  // Extend text colors with an extra level
  interface PaletteText extends ExtendColor {
    link: string;
    success: string;
    warning: string;
    error: string;
    inverse: string;
  }

  interface TypeText extends Partial<ExtendColor> {
    link?: string;
    success?: string;
    warning?: string;
    error?: string;
    inverse?: string;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display_xl: true;
    display_lg: true;
    display_md: true;
    h7: true;
    body_xl: true;
    body_lg: true;
    body_md: true;
    body_sm: true;
    body_xs: true;
  }
}
