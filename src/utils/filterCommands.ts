import type { Command } from "../types/Command";
import type { Tag } from "../types/Tag";
import { AttributesEnum, OrdersEnum } from "../types/Filters";

export function filterCommands(
  commands: Command[],
  tags: Tag[],
  search: {
    search: string;
    filter: AttributesEnum;
    order: OrdersEnum;
  }
): Command[] {
  const filters = search.search.split(",").map((s) => s.toLowerCase().trim());

  const filtered = commands.filter((c) => {
    switch (search.filter) {
      case AttributesEnum.Command:
        return filters.some((f) => c.command.toLowerCase().includes(f));

      case AttributesEnum.Tags: {
        const tagIds = tags
          .filter((t) => filters.some((f) => t.name.toLowerCase().includes(f)))
          .map((t) => t.uuid);
        return c.tags?.some((id) => tagIds.includes(id));
      }

      case AttributesEnum.Flags:
        return c.flags?.some((flag) =>
          filters.some((f) => flag.toLowerCase().includes(f))
        );

      default:
        return false;
    }
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (search.order) {
      case OrdersEnum.Created:
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case OrdersEnum.Updated:
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      default:
        return 0;
    }
  });

  return sorted;
}
