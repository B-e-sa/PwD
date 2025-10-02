import type { Tag } from "./Tag";

export type Command = {
  command: string;
  description?: string;
  flags?: string[];
  tags?: Tag[];
};
