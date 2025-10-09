export type Command = {
  uuid: string;
  command: string;
  description?: string;
  flags?: string[];
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
};
