import { Layout, Layouts } from 'react-grid-layout';

const DEFAULT_LG_LAYOUT: Layout[] = [
  { w: 2, h: 3, x: 0, y: 0, i: 'failed-total' },
  { w: 2, h: 3, x: 2, y: 0, i: 'failed-current' },
  { w: 3, h: 3, x: 4, y: 0, i: 'failed-graph' },
  { w: 2, h: 3, x: 0, y: 3, i: 'banned-total' },
  { w: 2, h: 3, x: 2, y: 3, i: 'banned-current' },
  { w: 3, h: 3, x: 4, y: 3, i: 'banned-graph' },
  { w: 6, h: 15, x: 0, y: 6, i: 'ip-banned' },
  { w: 6, h: 15, x: 6, y: 6, i: 'last-events' },
  { w: 5, h: 3, x: 7, y: 0, i: 'ban-now' },
  { w: 5, h: 3, x: 7, y: 3, i: 'config' },
];

const DEFAULT_MD_LAYOUT: Layout[] = [
  { w: 2, h: 3, x: 0, y: 0, i: 'failed-total' },
  { w: 2, h: 3, x: 2, y: 0, i: 'failed-current' },
  { w: 3, h: 3, x: 4, y: 0, i: 'failed-graph' },
  { w: 2, h: 3, x: 0, y: 3, i: 'banned-total' },
  { w: 2, h: 3, x: 2, y: 3, i: 'banned-current' },
  { w: 3, h: 3, x: 4, y: 3, i: 'banned-graph' },
  { w: 10, h: 13, x: 0, y: 19, i: 'ip-banned' },
  { w: 10, h: 13, x: 0, y: 6, i: 'last-events' },
  { w: 3, h: 3, x: 7, y: 0, i: 'ban-now' },
  { w: 3, h: 3, x: 7, y: 3, i: 'config' },
];

const DEFAULT_SM_LAYOUT: Layout[] = [
  { w: 2, h: 3, x: 0, y: 0, i: 'failed-total' },
  { w: 2, h: 3, x: 2, y: 0, i: 'failed-current' },
  { w: 2, h: 3, x: 4, y: 0, i: 'failed-graph' },
  { w: 2, h: 3, x: 0, y: 3, i: 'banned-total' },
  { w: 2, h: 3, x: 2, y: 3, i: 'banned-current' },
  { w: 2, h: 3, x: 4, y: 3, i: 'banned-graph' },
  { w: 6, h: 13, x: 0, y: 21, i: 'ip-banned' },
  { w: 6, h: 12, x: 0, y: 9, i: 'last-events' },
  { w: 3, h: 3, x: 3, y: 6, i: 'ban-now' },
  { w: 3, h: 3, x: 0, y: 6, i: 'config' },
];

const DEFAULT_XS_LAYOUT: Layout[] = [
  { w: 2, h: 3, x: 0, y: 0, i: 'failed-total' },
  { w: 2, h: 3, x: 2, y: 0, i: 'failed-current' },
  { w: 4, h: 4, x: 0, y: 3, i: 'failed-graph' },
  { w: 2, h: 3, x: 0, y: 7, i: 'banned-total' },
  { w: 2, h: 3, x: 2, y: 7, i: 'banned-current' },
  { w: 4, h: 4, x: 0, y: 10, i: 'banned-graph' },
  { w: 4, h: 14, x: 0, y: 35, i: 'ip-banned' },
  { w: 4, h: 15, x: 0, y: 20, i: 'last-events' },
  { w: 4, h: 3, x: 0, y: 14, i: 'ban-now' },
  { w: 4, h: 3, x: 0, y: 17, i: 'config' },
];

export const DEFAULT_JAIL_LAYOUTS: Layouts = {
  lg: DEFAULT_LG_LAYOUT,
  md: DEFAULT_MD_LAYOUT,
  sm: DEFAULT_SM_LAYOUT,
  xs: DEFAULT_XS_LAYOUT,
};
