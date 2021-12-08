import { auth, authStore } from '$lib/authStore';
import type { LoadInput, LoadOutput } from '@sveltejs/kit/types/page';

let guardedPages = [
    '/dashboard',
    '/resturantRes',
];

let manPages = [
    '/mDashboard',
]

let unAuthPages = [
    '/login',
    '/register'
]

enum AuthState {
    none,
    user,
    manager
};

let user: authStore;
auth.subscribe(aUser => user = aUser);

export async function authGuard(page): Promise<LoadOutput> {

    if (page.path == '/') return {};

    const loggedIn = (user != null);
    // check if logged in
    const state = checkAuthState();
    console.log(state);

    if (!checkGuard(page.path, state)) {
        return {
            status: 302,
            redirect: '/'
        }
    }
    return {}
}

function checkAuthState(): AuthState {
    if (user == null) {
        return AuthState.none;
    }
    if (user.manager) {
        return AuthState.manager;
    }
    return AuthState.user;
}

function checkGuard(page: string, state: AuthState): boolean {
    if (guardedPages.includes(page) && state == AuthState.user) {
        return true;
    }
    if (manPages.includes(page) && state == AuthState.manager) {
        return true;
    }
    if (unAuthPages.includes(page) && state == AuthState.none) {
        return true;
    }
    return false;
}

export default {
    authGuard
}
