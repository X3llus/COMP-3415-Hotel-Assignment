import * as cookie from 'cookie';

export async function handle({ request, resolve }) {
    const cookies = cookie.parse(request.headers.cookie || '');

    // code here happends before the endpoint or page is called
    request.locals.userToken = cookies.userToken;

    const response = await resolve(request);

    return response;
}

export async function getSession(request) {
    return {
        userToken: request.locals.userToken
    }
}