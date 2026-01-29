import { useMediaQuery, useTheme } from '@mui/material';

export interface BreakpointState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  isSmallMobile: boolean;
  currentBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const useThemeBreakpoints = (): BreakpointState => {
  const theme = useTheme();

  const isSmallMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up('xl'));

  let currentBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  if (isSmallMobile) {
    currentBreakpoint = 'xs';
  } else if (isMobile && !isTablet) {
    currentBreakpoint = 'sm';
  } else if (isTablet && !isDesktop) {
    currentBreakpoint = 'md';
  } else if (!isLargeDesktop) {
    currentBreakpoint = 'lg';
  } else {
    currentBreakpoint = 'xl';
  }

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isSmallMobile,
    currentBreakpoint,
  };
};
