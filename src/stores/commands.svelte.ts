import { writable } from "svelte/store";
import type { Command } from "../types/Command";

const commands = writable<Command[]>([]);

export default commands;
