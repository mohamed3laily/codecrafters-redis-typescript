export type BaseEntry = {
  expiresAt?: number; // Unix timestamp in ms
};

export type StringEntry = BaseEntry & {
  type: "string";
  value: string;
};

export type ListEntry = BaseEntry & {
  type: "list";
  value: string[];
};

export type Entry = StringEntry | ListEntry;
