import { writable } from 'svelte/store';

export interface authStore {
    token: string;
    email: string;
    guest: {
        fName: string;
        lName: string;
        title: string;
        phoneNum: string;
        address: string;
    };
}

function createAuth() {
    const {subscribe, set, update} = writable<authStore>();

    return {
        subscribe,
        setTo: (x: authStore) => set(x),
        signOut: () => set(null),
    };
}



export const auth = createAuth();