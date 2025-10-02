import { writable } from "svelte/store";

const colors = writable<string[]>([
  "#33ff57",
  "#ff5733",
  "#3357ff",
  "#f333ff",
  "#33ffdb",
  "#7c33ff",
]);

export default colors;
