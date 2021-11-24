import * as cookie from 'cookie';

export async function post(req) {
    const headers = {
        'Set-Cookie': [
            cookie.serialize(
                'userToken',
                null,
                {
                    httpOnly: true,
                    maxAge: 1,
                    sameSite: 'strict',
                    path: '/'
                }
            ),
        ]
    }
    return {
        status: 200,
        headers,
    };
}