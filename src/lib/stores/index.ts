import { writable } from "svelte/store";

export const user = writable(null);
export const language = writable("Spanish");
export const selectedCategory = writable("");
export const selectedMode = writable("");