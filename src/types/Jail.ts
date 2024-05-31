export type JailIp = {
  ip: string;
};

export type JailStats = {
  currently_banned: number;
  banned: number;
  ip_list: JailIp[];
};

export type JailFilter = {
  currently_failed: number;
  failed: number;
  file_list: string[];
};

export type Jail = {
  name: string;
  filter: JailFilter;
  stats: JailStats;
};
