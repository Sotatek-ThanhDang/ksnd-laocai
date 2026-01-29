import type { Components, Theme } from '@mui/material/styles';

export type MuiComponents = Components<Omit<Theme, 'components'>>;

export type MuiComponent<T extends keyof MuiComponents> = MuiComponents[T];
