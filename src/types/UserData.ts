import type { Command } from "./Command";
import type { Tag } from "./Tag";

export type UserData = {
  commands: Command[];
  tags: Tag[];
  colors: string[];
};
