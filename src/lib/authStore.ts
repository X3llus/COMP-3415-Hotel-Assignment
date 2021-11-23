import { writable } from 'svelte/store';

export const token = writable<string>('');
export const guest = writable<any>();