import { writable } from "svelte/store";

export const user = writable(null);
export const selectedCategory = writable("");
export const selectedMode = writable("");
export const selectedLanguage = writable("spanish");
export const wordPoints = writable();