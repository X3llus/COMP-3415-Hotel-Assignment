import { UserModel, User } from '../../../models/User';
import * as cookie from 'cookie';

export async function post(req) {
    const {
        email,
        password,
    } = req.body;
    const userDoc: User = {
        email, password,
    };
    const user = new UserModel(userDoc);
    const loggedin: User = await user.login(req.body.email, req.body.password);
    
    const headers = {
        'Set-Cookie': [
            cookie.serialize(
                'userToken',
                loggedin.token,
                {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 7,
                    sameSite: 'strict',
                    path: '/'
                }
            ),
        ]
    }
    return {
        status: 200,
        headers,
        body: {
            loggedin
        }
    };
}