import { auth } from '../lib/authStore';
import type { LoadOutput } from '@sveltejs/kit/types/page';

// List of pages at each auth level
let guardedPages = [
    '/dashboard',
    '/resturantRes',
];

let manPages = [
    '/manager/dashboard',
]

let unAuthPages = [
    '/signin',
    '/register',
    '/manager/signin',
]

enum AuthState {
    none,
    user,
    manager
};

let user;
auth.subscribe(aUser => user = aUser);

export async function authGuard(page): Promise<LoadOutput> {

    // Don't want to redirect when home
    if (page.path == '/') return {};

    const loggedIn = (user != null);
    const state = checkAuthState();

    // Redirect unauthed users back home
    // keep em out of where they shouldn't be
    if (!checkGuard(page.path, state)) {
        return {
            status: 302,
            redirect: '/'
        }
    }
    return {}
}

// 
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
