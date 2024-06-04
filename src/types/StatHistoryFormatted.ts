export type Stats = {
  banned: number;
  currently_banned: number;
  currently_failed: number;
  failed: number;
};

export type StatsHistory = Record<string, Stats>;

export type StatsHistoryFormatted = Record<string, StatsHistory>;
