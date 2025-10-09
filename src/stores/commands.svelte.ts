import { writable } from "svelte/store";
import type { Command } from "../types/Command";

const commands = writable<Command[]>([
  {
    uuid: "command1",
    command: `diagnose
            ont wan-access http 0/1/2 3 enable
            quit
            save `,
    description:
      "Habilita o acesso via HTTP (porta 80) a ONU\nExemplo: ont wan-access http 0/1/2 3 enable",
    flags: ["mac", "sn", "desc"],
    tags: [],
    createdAt: new Date(),
  },
]);

export default commands;
