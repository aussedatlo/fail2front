import { Layouts } from 'react-grid-layout';

export * from '@/constants/layout/ip';
export * from '@/constants/layout/jail';

export type LayoutType = 'jail' | 'dashboard' | 'ip';

export const DEFAULT_EMPTY_LAYOUTS: Layouts = {
  lg: [],
  md: [],
  sm: [],
  xs: [],
};

export const DEFAULT_ALL_EMPTY_LAYOUTS: Record<LayoutType, Layouts> = {
  jail: DEFAULT_EMPTY_LAYOUTS,
  dashboard: DEFAULT_EMPTY_LAYOUTS,
  ip: DEFAULT_EMPTY_LAYOUTS,
};
