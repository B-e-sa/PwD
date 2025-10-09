export enum OrdersEnum {
  Created = "criado",
  Updated = "atualizado",
}

export enum AttributesEnum {
  Tags = "tags",
  Command = "comando",
  Flags = "flags",
}

export type Search = {
  search: string;
  filter: AttributesEnum;
  order: OrdersEnum;
};
