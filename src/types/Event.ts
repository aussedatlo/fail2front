export type Event = {
  date: number;
  type: 'Banned' | 'Failed';
  ip: string;
  match: string;
};
