import type { TypographyVariantsOptions } from '@mui/material/styles';
const typography: TypographyVariantsOptions = {
  fontFamily: ['Inter', 'sans-serif'].join(','),

  // --- DISPLAY VARIANTS ---

  // Display xl: Font size: 72px (4.5rem) | Line height: 78px (4.875rem)
  display_xl: {
    fontSize: '4.5rem',
    lineHeight: '4.875rem',
  },

  // Display lg: Font size: 64px (4rem) | Line height: 70px (4.375rem)
  display_lg: {
    fontSize: '4rem',
    lineHeight: '4.375rem',
  },

  // Display md: Font size: 56px (3.5rem) | Line height: 64px (4rem)
  display_md: {
    fontSize: '3.5rem',
    lineHeight: '4rem',
  },

  // --- HEADING VARIANTS ---

  // Heading 3xl: Font size: 48px (3rem) | Line height: 56px (3.5rem)
  h1: {
    fontSize: '3rem',
    lineHeight: '3.5rem',
  },

  // Heading 2xl: Font size: 40px (2.5rem) | Line height: 48px (3rem)
  h2: {
    fontSize: '2.5rem',
    lineHeight: '3rem',
  },

  // Heading xl: Font size: 36px (2.25rem) | Line height: 44px (2.75rem)
  h3: {
    fontSize: '2.25rem',
    lineHeight: '2.75rem',
  },

  // Heading lg: Font size: 32px (2rem) | Line height: 40px (2.5rem)
  h4: {
    fontSize: '2rem',
    lineHeight: '2.5rem',
  },

  // Heading md: Font size: 28px (1.75rem) | Line height: 36px (2.25rem)
  h5: {
    fontSize: '1.75rem',
    lineHeight: '2.25rem',
  },

  // Heading sm: Font size: 24px (1.5rem) | Line height: 32px (2rem)
  h6: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
  },

  // Heading xs: Font size: 20px (1.25rem) | Line height: 28px (1.75rem)
  h7: {
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
  },

  // --- BODY VARIANTS ---

  // Body xl: Font size: 18px (1.125rem) | Line height: 28px (1.75rem)
  body_xl: {
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
  },

  // Body lg: Font size: 16px (1rem) | Line height: 24px (1.5rem)
  body_lg: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },

  // Body md: Font size: 14px (0.875rem) | Line height: 20px (1.25rem)
  body_md: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },

  // Body sm: Font size: 12px (0.75rem) | Line height: 16px (1rem)
  body_sm: {
    fontSize: '0.75rem',
    lineHeight: '1rem',
  },

  // Body xs: Font size: 10px (0.625rem) | Line height: 14px (0.875rem)
  body_xs: {
    fontSize: '0.625rem',
    lineHeight: '0.875rem',
  },
};
export default typography;
