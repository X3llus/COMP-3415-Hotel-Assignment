export async function post(req) {
    const headers = {
        'Set-Cookie': 'userToken=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
    return {
        status: 200,
        headers,
    };
}