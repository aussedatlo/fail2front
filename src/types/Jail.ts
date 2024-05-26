export type JailDetail = {
  loc: [string, number];
  msg: string;
  type: string;
};

export type Jail = {
  details: JailDetail[];
};
