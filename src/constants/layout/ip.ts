import { Layout } from 'react-grid-layout';

const DEFAULT_LG_LAYOUT: Layout[] = [
  { w: 2, h: 4, x: 0, y: 0, i: 'status', moved: false, static: true },
];

export const DEFAULT_IP_LAYOUTS = {
  lg: DEFAULT_LG_LAYOUT,
  md: DEFAULT_LG_LAYOUT,
  sm: DEFAULT_LG_LAYOUT,
  xs: DEFAULT_LG_LAYOUT,
};
