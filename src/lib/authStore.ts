import { writable } from 'svelte/store';

function createAuth() {
    const {subscribe, set, update} = writable(false);

    return {
        subscribe,
        setTo: (x: boolean) => set(x)
    };
}

export const auth = createAuth();