export const FilterEnum = {
  Tags: "Tags",
  Command: "Command",
  Flags: "Flags",
} as const;
export type Filter = keyof typeof FilterEnum;

export type SearchProps = { search: string; filter: Filter };