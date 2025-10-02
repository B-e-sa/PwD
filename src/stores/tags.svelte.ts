import { writable } from "svelte/store";
import type { Tag } from "../types/Tag";

const tags = writable<Tag[]>([
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
]);

export default tags;
