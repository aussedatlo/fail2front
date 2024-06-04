export type Fail = {
  jail: string;
  ip: string;
  timeoffail: number;
  match: string;
};

export type Fails = Record<string, Fail[]>;
