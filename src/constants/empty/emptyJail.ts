import { Jail } from '@/types/Jail';

export const EMPTY_JAIL: Jail = {
  filter: { currently_failed: 0, failed: 0, file_list: [] },
  name: '',
  stats: { banned: 0, currently_banned: 0, ip_list: [] },
};
