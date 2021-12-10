import { writable } from 'svelte/store';

export interface authStore {
    token: string;
    email: string;
    manager: boolean;
    guest: {
        fName: string;
        lName: string;
        title: string;
        phoneNum: string;
        address: string;
    };
}

function createAuth() {
    const { subscribe, set } = writable<authStore>();

    return {
        subscribe,
        setTo: (x: authStore) => set(x),
        signOut: () => set(null),
    };
}

export const auth = createAuth();