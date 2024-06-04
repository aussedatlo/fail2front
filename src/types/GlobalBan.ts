export type GlobalBan = {
  jail: string;
  ip: string;
  timeofban: number;
  data: {
    matches: string[];
    failures: number;
  };
};

export type GlobalBans = Record<string, GlobalBan[]>;
