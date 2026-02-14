import { writable } from "svelte/store";

export const user = writable(null);
export const selectedCategory = writable("");
export const selectedMode = writable("");
export const selectedLanguage = writable("spanish");
export const words = writable<{ spanish: string; english: string; partOfSpeech: string; points: number }[]>([]);
export const filteredWords = writable<{ spanish: string; english: string; partOfSpeech: string; points: number }[]>([]);
export const wordPoints = writable<{ word: string; language: string; points: number }[]>([]);
export const filterMinPoints = writable(0);
export const filterMaxPoints = writable(100);