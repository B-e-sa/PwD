import { writable } from "svelte/store";
import type { Tag } from "../types/Tag";
import type { Command } from "../types/Command";

const tags: Tag[] = [
  {
    uuid: "tag1",
    color: "#33ff57",
    name: "Tag1",
  },
  {
    uuid: "tag2",
    color: "#ff5733",
    name: "Tag2",
  },
  {
    uuid: "tag3",
    color: "#3357ff",
    name: "Tag3",
  },
];

const commands = writable<Command[]>([
  {
    command: "show gpon onu by",
    flags: ["desc", "mac", "sn"],
    description:
      "Encontra uma ONU com base em sua serial, descrição ou MAC (caso epon)",
    tags,
  },
  {
    command: "show arp interface",
    flags: ["vlan"],
    tags,
  },
  {
    command: "show mac gpon",
    flags: ["onu"],
    tags,
  },
]);

export default commands;
