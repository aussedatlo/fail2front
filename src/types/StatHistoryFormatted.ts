export type StatsHistory = {
  banned: number;
  currently_banned: number;
  currently_failed: number;
  failed: number;
};

export type StatHistoryFormatted = Record<
  string,
  {
    banned: number;
    currently_banned: number;
    currently_failed: number;
    failed: number;
  }
>;
